//src/form-elements-edit.jsx
import React from 'react';
import TextAreaAutosize from 'react-textarea-autosize';
import {
    ContentState,
    EditorState,
    convertFromHTML,
    convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import { Editor } from 'react-draft-wysiwyg';

import DynamicOptionList from './dynamic-option-list';
import { get } from './stores/requests';
import ID from './UUID';
import IntlMessages from './language-provider/IntlMessages';

// ---------- Default RTE (DraftJS) adapter: HTML in/out ----------
const DefaultRTE = ({ value = '', onChange, placeholder, disabled, className }) => {
    const [state, setState] = React.useState(() => {
        const parsed = convertFromHTML(value || '');
        if (!parsed.contentBlocks || !parsed.contentBlocks.length) return EditorState.createEmpty();
        const contentState = ContentState.createFromBlockArray(parsed);
        return EditorState.createWithContent(contentState);
    });

    React.useEffect(() => {
        const parsed = convertFromHTML(value || '');
        if (!parsed.contentBlocks || !parsed.contentBlocks.length) {
            setState(EditorState.createEmpty());
            return;
        }
        const contentState = ContentState.createFromBlockArray(parsed);
        setState(EditorState.createWithContent(contentState));
    }, [value]);

    const toHtml = (editorState) =>
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
            .replace(/<p>/g, '')
            .replace(/<\/p>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/(?:\r\n|\r|\n)/g, ' ');

    const handleChange = (st) => {
        setState(st);
        onChange?.(toHtml(st));
    };

    const toolbar = {
        options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
        inline: { inDropdown: false, options: ['bold', 'italic', 'underline', 'superscript', 'subscript'] },
    };

    return (
        <Editor
            toolbar={toolbar}
            editorState={state}
            onEditorStateChange={handleChange}
            stripPastedStyles
            readOnly={!!disabled}
            editorClassName={className}
            placeholder={placeholder}
        />
    );
};

export default class FormElementsEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // start with a deep-ish clone so we don't mutate props.element
            draft: JSON.parse(JSON.stringify(props.element || {})),
            dirty: false,
            errors: {}
        };
    }

    validate = (draft = this.state.draft) => {
        const errors = {};
        if (draft.show_custom_name && !String(draft.custom_name || '').trim()) {
            errors.custom_name = 'Custom name is required.';
        }
        return errors;
    };

    componentDidUpdate(prevProps) {
        // If the user selected a DIFFERENT element, reset the draft
        if (prevProps.element?.id !== this.props.element?.id) {
            this.setState({
                draft: JSON.parse(JSON.stringify(this.props.element || {})),
                dirty: false,
                errors: this.validate(this.props.element || {}),
            });
        }
    }

    // ---------- helpers ----------
    setDraftProp = (name, value) => {
        this.setState(({ draft }) => {
            const nextDraft = { ...draft, [name]: value };
            return {
                draft: nextDraft,
                dirty: true,
                errors: this.validate(nextDraft),
            };
        });
    };

    setDraftNested = (updater) => {
        this.setState(({ draft }) => ({ draft: updater(draft), dirty: true }));
    };

    // ---------- events originally mutating store; now local only ----------
    editElementProp = (elemProperty, targProperty, e) => {
        const value = e?.target ? e.target[targProperty] : e; // allow direct values
        this.setDraftProp(elemProperty, value);
    };

    addOptions = () => {
        const optionsApiUrl = document.getElementById('optionsApiUrl')?.value;
        if (!optionsApiUrl) return;
        get(optionsApiUrl).then((data) => {
            const withIds = (data || []).map((x) => ({ ...x, key: ID.uuid() }));
            this.setDraftProp('options', withIds);
        });
    };

    // ---------- commit / discard ----------
    save = () => {
        const errors = this.validate();
        if (Object.keys(errors).length > 0) {
            this.setState({ errors });
            return; // prevent commit
        }
        if (!this.state.dirty) {
            // nothing changed; just close
            this.props.manualEditModeOff && this.props.manualEditModeOff();
            return;
        }
        // Commit to the builder/store (original behavior)
        this.props.updateElement.call(this.props.preview, this.state.draft);
        this.setState({ dirty: false }, () => {
            this.props.manualEditModeOff && this.props.manualEditModeOff();
        });
    };

    cancel = () => {
        // Discard local changes & close
        this.setState({
            draft: JSON.parse(JSON.stringify(this.props.element || {})),
            dirty: false,
        });
        this.props.manualEditModeOff && this.props.manualEditModeOff();
    };

    render() {
        const { draft, dirty, errors } = this.state;
        const hasErrors = Object.keys(errors || {}).length > 0;
        const el = draft || {};

        // pluggable RTE: prefer caller-provided, else default
        const { renderRichTextEditor } = this.props;
        let RTE;
        if (React.isValidElement(renderRichTextEditor)) {
            // Caller passed <Editor /> element instance
            RTE = (p) => React.cloneElement(renderRichTextEditor, p);
        } else if (typeof renderRichTextEditor === 'function') {
            // Caller passed a component type (preferred)
            RTE = renderRichTextEditor;                // ✅ use it directly — no wrapper
        } else {
            RTE = DefaultRTE;                          // fallback
        }

        // booleans
        const this_checked = !!el.required;
        const this_default_checked = !!el.defaultChecked;
        const this_has_popup = !!el.hasPopUp;
        const this_read_only = !!el.readOnly;
        const this_default_today = !!el.defaultToday;
        const this_show_time_select = !!el.showTimeSelect;
        const this_show_time_select_only = !!el.showTimeSelectOnly;
        const this_show_time_input = !!el.showTimeInput;
        const this_checked_inline = !!el.inline;
        const this_checked_bold = !!el.bold;
        const this_checked_italic = !!el.italic;
        const this_checked_center = !!el.center;
        const this_checked_page_break = !!el.pageBreakBefore;
        const this_checked_alternate_form = !!el.alternateForm;

        const {
            canHavePageBreakBefore, canHaveAlternateForm, canHaveDisplayHorizontal,
            canHaveOptionCorrect, canHaveOptionValue,
        } = el;

        const canHaveImageSize = (el.element === 'Image' || el.element === 'Camera');

        const files = (this.props.files && this.props.files.length) ? [...this.props.files] : [];
        if (files.length < 1 || (files.length > 0 && files[0].id !== '')) {
            files.unshift({ id: '', file_name: '' });
        }

        return (
            <div className={this.props.className || 'edit-element-fields'}>
                <div className="clearfix">
                    <h4 className="float-left">{el.text}</h4>
                    <div className="d-flex justify-content-end mt-3 gap-2">
                        <button type="button" className="btn btn-secondary" onClick={this.cancel}>
                            <IntlMessages id="cancel" defaultMessage="Cancel" />
                        </button>
                        <button style={{ marginLeft: 10 }} type="button" className="btn btn-primary" onClick={this.save} disabled={!dirty || hasErrors}>
                            <IntlMessages id="save" defaultMessage="Save" />
                        </button>
                    </div>
                </div>

                {/* --- fields now bound to draft via value/checked --- */}
                {el.show_custom_name && (
                    <div className="form-group">
                        <label className="control-label" htmlFor="custom_name">
                            <IntlMessages id="custom-name-label" />
                            {el.show_custom_name && <span style={{ color: '#d9534f' }}> *</span>}
                        </label>
                        <input
                            type="text"
                            className={`form-control${errors.custom_name ? ' is-invalid' : ''}`}
                            aria-invalid={!!errors.custom_name}
                            id="custom_name"
                            value={el.custom_name || ''}
                            onChange={(e) => this.editElementProp('custom_name', 'value', e)}
                            onBlur={() => this.setState(({ draft }) => ({ errors: this.validate(draft) }))}
                        />
                        {errors.custom_name && (
                            <div className="invalid-feedback" style={{ display: 'block' }}>
                                {errors.custom_name}
                            </div>
                        )}
                    </div>
                )}

                {el.hasOwnProperty('content') && (
                    <div className="form-group">
                        <label className="control-label"><IntlMessages id="text-to-display" />:</label>
                        <RTE
                            value={el.content || ''}
                            onChange={(html) => this.setDraftProp('content', html)}
                            placeholder=""
                            disabled={false}
                            className="form-control"
                        />
                    </div>
                )}

                {el.hasOwnProperty('file_path') && (
                    <div className="form-group">
                        <label className="control-label" htmlFor="fileSelect"><IntlMessages id="choose-file" />:</label>
                        <select
                            id="fileSelect"
                            className="form-control"
                            value={el.file_path || ''}
                            onChange={(e) => this.editElementProp('file_path', 'value', e)}
                        >
                            {files.map((file) => {
                                const this_key = `file_${file.id}`;
                                return <option value={file.id} key={this_key}>{file.file_name}</option>;
                            })}
                        </select>
                    </div>
                )}

                {el.hasOwnProperty('href') && (
                    <div className="form-group">
                        <TextAreaAutosize
                            type="text"
                            className="form-control"
                            value={el.href || ''}
                            onChange={(e) => this.editElementProp('href', 'value', e)}
                        />
                    </div>
                )}

                {el.hasOwnProperty('label') && (
                    <div className="form-group">
                        {!el.hide_display_label && (
                            <>
                                <label><IntlMessages id="display-label" /></label>
                                <RTE
                                    value={el.label || ''}
                                    onChange={(html) => this.setDraftProp('label', html)}
                                    disabled={false}
                                    className="form-control"
                                />
                            </>
                        )}
                        <br />
                        {!el.hide_required && (
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="is-required"
                                    className="custom-control-input"
                                    type="checkbox"
                                    checked={this_checked}
                                    onChange={(e) => this.editElementProp('required', 'checked', e)}
                                />
                                <label className="custom-control-label" htmlFor="is-required">
                                    <IntlMessages id="required" />
                                </label>
                            </div>
                        )}
                        {el.hasOwnProperty('readOnly') && (
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="is-read-only"
                                    className="custom-control-input"
                                    type="checkbox"
                                    checked={this_read_only}
                                    onChange={(e) => this.editElementProp('readOnly', 'checked', e)}
                                />
                                <label className="custom-control-label" htmlFor="is-read-only">
                                    <IntlMessages id="read-only" />
                                </label>
                            </div>
                        )}
                        {el.hasOwnProperty('defaultToday') && (
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="is-default-to-today"
                                    className="custom-control-input"
                                    type="checkbox"
                                    checked={this_default_today}
                                    onChange={(e) => this.editElementProp('defaultToday', 'checked', e)}
                                />
                                <label className="custom-control-label" htmlFor="is-default-to-today">
                                    <IntlMessages id="default-to-today" />?
                                </label>
                            </div>
                        )}
                        {(el.element === 'Checkboxes' || el.element === 'Checkbox') && (
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="default-checked"
                                    className="custom-control-input"
                                    type="checkbox"
                                    checked={this_default_checked}
                                    onChange={(e) => this.editElementProp('defaultChecked', 'checked', e)}
                                />
                                <label className="custom-control-label" htmlFor="default-checked">
                                    <IntlMessages id="default-checked" />
                                </label>
                            </div>
                        )}
                        {el.element === 'Checkbox' && (
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="input-has-popup"
                                    className="custom-control-input"
                                    type="checkbox"
                                    checked={this_has_popup}
                                    onChange={(e) => this.editElementProp('hasPopUp', 'checked', e)}
                                />
                                <label className="custom-control-label" htmlFor="input-has-popup">
                                    <IntlMessages id="checkbox-has-popup" />
                                </label>
                            </div>
                        )}
                        {(el.element === 'RadioButtons' || el.element === 'Checkboxes') && canHaveDisplayHorizontal && (
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="display-horizontal"
                                    className="custom-control-input"
                                    type="checkbox"
                                    checked={this_checked_inline}
                                    onChange={(e) => this.editElementProp('inline', 'checked', e)}
                                />
                                <label className="custom-control-label" htmlFor="display-horizontal">
                                    <IntlMessages id="display-horizontal" />
                                </label>
                            </div>
                        )}
                    </div>
                )}

                {el.element === 'Checkbox' && (
                    <div className="form-group">
                        <label className="control-label"><IntlMessages id="checkbox-label-text" />:</label>
                        <RTE
                            value={el.boxLabel || ''}
                            onChange={(html) => this.setDraftProp('boxLabel', html)}
                            disabled={false}
                            className="form-control"
                        />
                    </div>
                )}

                {this_has_popup && (
                    <div className="form-group">
                        <label className="control-label">Pop Up:</label>
                        <RTE
                            value={el.popUpBody || ''}
                            onChange={(html) => this.setDraftProp('popUpBody', html)}
                            disabled={false}
                            className="form-control"
                        />
                    </div>
                )}

                {el.hasOwnProperty('src') && (
                    <div className="form-group">
                        <label className="control-label" htmlFor="srcInput"><IntlMessages id="link-to" />:</label>
                        <input
                            id="srcInput"
                            type="text"
                            className="form-control"
                            value={el.src || ''}
                            onChange={(e) => this.editElementProp('src', 'value', e)}
                        />
                    </div>
                )}

                {canHaveImageSize && (
                    <div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="do-center"
                                    className="custom-control-input"
                                    type="checkbox"
                                    checked={this_checked_center}
                                    onChange={(e) => this.editElementProp('center', 'checked', e)}
                                />
                                <label className="custom-control-label" htmlFor="do-center">
                                    <IntlMessages id="center" />?
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm-3">
                                <label className="control-label" htmlFor="elementWidth"><IntlMessages id="width" />:</label>
                                <input
                                    id="elementWidth"
                                    type="text"
                                    className="form-control"
                                    value={el.width || ''}
                                    onChange={(e) => this.editElementProp('width', 'value', e)}
                                />
                            </div>
                            <div className="col-sm-3">
                                <label className="control-label" htmlFor="elementHeight"><IntlMessages id="height" />:</label>
                                <input
                                    id="elementHeight"
                                    type="text"
                                    className="form-control"
                                    value={el.height || ''}
                                    onChange={(e) => this.editElementProp('height', 'value', e)}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {el.element === 'FileUpload' && (
                    <div>
                        <div className='form-group'>
                            <label className='control-label' htmlFor='fileType'>
                                <IntlMessages id='choose-file-type' />:
                            </label>
                            <select
                                id='fileType'
                                className="form-control"
                                value={el.fileType || ''}
                                onChange={(e) => this.editElementProp('fileType', 'value', e)}
                            >
                                {[
                                    { type: 'image, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, video/mp4,video/x-m4v,video/*', typeName: 'All File Type' },
                                    { type: 'image', typeName: 'Image' },
                                    { type: 'application/pdf', typeName: 'PDF' },
                                    { type: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document', typeName: 'Word' },
                                    { type: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', typeName: 'Excel' },
                                    { type: 'application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation', typeName: 'Powerpoint' },
                                    { type: 'video/mp4,video/x-m4v,video/*', typeName: 'Videos' },
                                ].map((file, index) => (
                                    <option value={file.type} key={index}>
                                        {file.typeName}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                )}

                {el.hasOwnProperty('step') && (
                    <div className="form-group">
                        <div className="form-group-range">
                            <label className="control-label" htmlFor="rangeStep"><IntlMessages id="step" /></label>
                            <input
                                id="rangeStep"
                                type="number"
                                className="form-control"
                                value={el.step ?? ''}
                                onChange={(e) => this.editElementProp('step', 'value', e)}
                            />
                        </div>
                    </div>
                )}

                {el.hasOwnProperty('min_value') && (
                    <div className="form-group">
                        <div className="form-group-range">
                            <label className="control-label" htmlFor="rangeMin"><IntlMessages id="min" /></label>
                            <input
                                id="rangeMin"
                                type="number"
                                className="form-control"
                                value={el.min_value ?? ''}
                                onChange={(e) => this.editElementProp('min_value', 'value', e)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={el.min_label || ''}
                                onChange={(e) => this.editElementProp('min_label', 'value', e)}
                            />
                        </div>
                    </div>
                )}

                {el.hasOwnProperty('max_value') && (
                    <div className="form-group">
                        <div className="form-group-range">
                            <label className="control-label" htmlFor="rangeMax"><IntlMessages id="max" /></label>
                            <input
                                id="rangeMax"
                                type="number"
                                className="form-control"
                                value={el.max_value ?? ''}
                                onChange={(e) => this.editElementProp('max_value', 'value', e)}
                            />
                            <input
                                type="text"
                                className="form-control"
                                value={el.max_label || ''}
                                onChange={(e) => this.editElementProp('max_label', 'value', e)}
                            />
                        </div>
                    </div>
                )}

                {el.hasOwnProperty('default_value') && (
                    <div className="form-group">
                        <div className="form-group-range">
                            <label className="control-label" htmlFor="defaultSelected"><IntlMessages id="default-selected" /></label>
                            <input
                                id="defaultSelected"
                                type="number"
                                className="form-control"
                                value={el.default_value ?? ''}
                                onChange={(e) => this.editElementProp('default_value', 'value', e)}
                            />
                        </div>
                    </div>
                )}

                {el.static && (
                    <div className="form-group">
                        <label className="control-label"><IntlMessages id="text-style" /></label>
                        <div className="custom-control custom-checkbox">
                            <input
                                id="do-bold"
                                className="custom-control-input"
                                type="checkbox"
                                checked={this_checked_bold}
                                onChange={(e) => this.editElementProp('bold', 'checked', e)}
                            />
                            <label className="custom-control-label" htmlFor="do-bold">
                                <IntlMessages id="bold" />
                            </label>
                        </div>
                        <div className="custom-control custom-checkbox">
                            <input
                                id="do-italic"
                                className="custom-control-input"
                                type="checkbox"
                                checked={this_checked_italic}
                                onChange={(e) => this.editElementProp('italic', 'checked', e)}
                            />
                            <label className="custom-control-label" htmlFor="do-italic">
                                <IntlMessages id="italic" />
                            </label>
                        </div>
                    </div>
                )}

                {el.showPlaceholder && (
                    <div className="form-group">
                        <label className="control-label" htmlFor="placeholder"><IntlMessages id="place-holder-text-label" /></label>
                        <input
                            type="text"
                            className="form-control"
                            id="placeholder"
                            value={el.placeholder || ''}
                            onChange={(e) => this.editElementProp('placeholder', 'value', e)}
                        />
                    </div>
                )}

                {el.showDescription && (
                    <div className="form-group">
                        <label className="control-label" htmlFor="questionDescription"><IntlMessages id="description" /></label>
                        <TextAreaAutosize
                            type="text"
                            className="form-control"
                            id="questionDescription"
                            value={el.description || ''}
                            onChange={(e) => this.editElementProp('description', 'value', e)}
                        />
                    </div>
                )}

                {el.element === 'TextInput' && (
                    <div className="form-group">
                        <label className="control-label">Validation Message:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={el.validationMessage || ''}
                            onChange={(e) => this.editElementProp('validationMessage', 'value', e)}
                        />
                    </div>
                )}

                {el.element === 'TextInput' && (
                    <div className="form-group">
                        <label className="control-label">Validation Pattern (Regex):</label>
                        <input
                            type="text"
                            className="form-control"
                            value={el.validationPattern || ''}
                            onChange={(e) => this.editElementProp('validationPattern', 'value', e)}
                        />
                    </div>
                )}

                {this.props.showCorrectColumn && el.canHaveAnswer && !el.hasOwnProperty('options') && (
                    <div className="form-group">
                        <label className="control-label" htmlFor="correctAnswer"><IntlMessages id="correct-answer" /></label>
                        <input
                            id="correctAnswer"
                            type="text"
                            className="form-control"
                            value={el.correct || ''}
                            onChange={(e) => this.editElementProp('correct', 'value', e)}
                        />
                    </div>
                )}

                {el.canPopulateFromApi && el.hasOwnProperty('options') && (
                    <div className="form-group">
                        <label className="control-label" htmlFor="optionsApiUrl"><IntlMessages id="populate-options-from-api" /></label>
                        <div className="row">
                            <div className="col-sm-6">
                                <input className="form-control" style={{ width: '100%' }} type="text" id="optionsApiUrl" placeholder="http://localhost:8080/api/optionsdata" />
                            </div>
                            <div className="col-sm-6">
                                <button onClick={this.addOptions} className="btn btn-success"><IntlMessages id="populate" /></button>
                            </div>
                        </div>
                    </div>
                )}

                {el.hasOwnProperty('options') && (
                    <DynamicOptionList
                        showCorrectColumn={this.props.showCorrectColumn}
                        canHaveOptionCorrect={canHaveOptionCorrect}
                        canHaveOptionValue={canHaveOptionValue}
                        data={this.props.preview.state.data}
                        // IMPORTANT: feed the DRAFT here so edits stay local
                        element={el}
                        preview={this.props.preview}
                        // Wrap updateElement so options edits update the draft only
                        updateElement={(updated) => {
                            if (updated && updated.options) {
                                this.setDraftProp('options', updated.options);
                            } else {
                                this.setState(({ draft }) => ({ draft: { ...draft, options: [...(draft.options || [])] }, dirty: true }));
                            }
                        }}
                        key={(el.options && el.options.length) || 0}
                    />
                )}
            </div>
        );
    }
}

FormElementsEdit.defaultProps = { className: 'edit-element-fields' };
