(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./src/dynamic-option-list.jsx":
/*!*************************************!*\
  !*** ./src/dynamic-option-list.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DynamicOptionList; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _UUID__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./UUID */ "./src/UUID.js");
/* harmony import */ var _UUID__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_UUID__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./language-provider/IntlMessages */ "./src/language-provider/IntlMessages.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
/**
  * <DynamicOptionList />
  */




var DynamicOptionList = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(DynamicOptionList, _React$Component);
  var _super = _createSuper(DynamicOptionList);
  function DynamicOptionList(props) {
    var _this;
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, DynamicOptionList);
    _this = _super.call(this, props);
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(DynamicOptionList, [{
    key: "_setValue",
    value: function _setValue(text) {
      return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
    }
  }, {
    key: "editOption",
    value: function editOption(option_index, e) {
      var this_element = this.state.element;
      var val = this_element.options[option_index].value !== this._setValue(this_element.options[option_index].text) ? this_element.options[option_index].value : this._setValue(e.target.value);
      this_element.options[option_index].text = e.target.value;
      this_element.options[option_index].value = val;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "editValue",
    value: function editValue(option_index, e) {
      var this_element = this.state.element;
      var val = e.target.value === '' ? this._setValue(this_element.options[option_index].text) : e.target.value;
      this_element.options[option_index].value = val;
      this.setState({
        element: this_element,
        dirty: true
      });
    }

    // eslint-disable-next-line no-unused-vars
  }, {
    key: "editOptionCorrect",
    value: function editOptionCorrect(option_index, e) {
      var this_element = this.state.element;
      if (this_element.options[option_index].hasOwnProperty('correct')) {
        delete this_element.options[option_index].correct;
      } else {
        this_element.options[option_index].correct = true;
      }
      this.setState({
        element: this_element
      });
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "updateOption",
    value: function updateOption() {
      var this_element = this.state.element;
      // to prevent ajax calls with no change
      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({
          dirty: false
        });
      }
    }
  }, {
    key: "addOption",
    value: function addOption(index) {
      var this_element = this.state.element;
      this_element.options.splice(index + 1, 0, {
        value: '',
        text: '',
        key: _UUID__WEBPACK_IMPORTED_MODULE_6___default.a.uuid()
      });
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "removeOption",
    value: function removeOption(index) {
      var this_element = this.state.element;
      this_element.options.splice(index, 1);
      this.props.updateElement.call(this.props.preview, this_element);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      if (this.state.dirty) {
        this.state.element.dirty = true;
      }
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "dynamic-option-list"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("ul", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("li", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "col-sm-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_7__["default"], {
        id: "options"
      }))), this.props.canHaveOptionValue && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "col-sm-2"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_7__["default"], {
        id: "value"
      }))), this.props.canHaveOptionValue && this.props.canHaveOptionCorrect && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "col-sm-4"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("b", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_7__["default"], {
        id: "correct"
      }))))), this.props.element.options.map(function (option, index) {
        var this_key = "edit_".concat(option.key);
        var val = option.value !== _this2._setValue(option.text) ? option.value : '';
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("li", {
          className: "clearfix",
          key: this_key
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "row"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "col-sm-6"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
          tabIndex: index + 1,
          className: "form-control",
          style: {
            width: '100%'
          },
          type: "text",
          name: "text_".concat(index),
          placeholder: "Option text",
          value: option.text,
          onBlur: _this2.updateOption.bind(_this2),
          onChange: _this2.editOption.bind(_this2, index)
        })), _this2.props.canHaveOptionValue && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "col-sm-2"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
          className: "form-control",
          type: "text",
          name: "value_".concat(index),
          value: val,
          onChange: _this2.editValue.bind(_this2, index)
        })), _this2.props.canHaveOptionValue && _this2.props.canHaveOptionCorrect && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "col-sm-1"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
          className: "form-control",
          type: "checkbox",
          value: "1",
          onChange: _this2.editOptionCorrect.bind(_this2, index),
          checked: option.hasOwnProperty('correct')
        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "col-sm-3"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
          className: "dynamic-options-actions-buttons"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("button", {
          onClick: _this2.addOption.bind(_this2, index),
          className: "btn btn-success"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
          className: "fas fa-plus-circle"
        })), index > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("button", {
          onClick: _this2.removeOption.bind(_this2, index),
          className: "btn btn-danger"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
          className: "fas fa-minus-circle"
        }))))));
      })));
    }
  }]);
  return DynamicOptionList;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);


/***/ }),

/***/ "./src/form-elements-edit.jsx":
/*!************************************!*\
  !*** ./src/form-elements-edit.jsx ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FormElementsEdit; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/inherits.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/getPrototypeOf.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_textarea_autosize__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-textarea-autosize */ "./node_modules/react-textarea-autosize/dist/react-textarea-autosize.esm.browser.js");
/* harmony import */ var draft_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! draft-js */ "./node_modules/draft-js/lib/Draft.js");
/* harmony import */ var draft_js__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(draft_js__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var draftjs_to_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! draftjs-to-html */ "./node_modules/draftjs-to-html/lib/draftjs-to-html.js");
/* harmony import */ var draftjs_to_html__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(draftjs_to_html__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_draft_wysiwyg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-draft-wysiwyg */ "./node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.js");
/* harmony import */ var react_draft_wysiwyg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_draft_wysiwyg__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _dynamic_option_list__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dynamic-option-list */ "./src/dynamic-option-list.jsx");
/* harmony import */ var _stores_requests__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./stores/requests */ "./src/stores/requests.js");
/* harmony import */ var _UUID__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./UUID */ "./src/UUID.js");
/* harmony import */ var _UUID__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_UUID__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./language-provider/IntlMessages */ "./src/language-provider/IntlMessages.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }









var toolbar = {
  options: ['inline', 'list', 'textAlign', 'fontSize', 'link', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    options: ['bold', 'italic', 'underline', 'superscript', 'subscript']
  }
};
var FormElementsEdit = /*#__PURE__*/function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2___default()(FormElementsEdit, _React$Component);
  var _super = _createSuper(FormElementsEdit);
  function FormElementsEdit(props) {
    var _this;
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, FormElementsEdit);
    _this = _super.call(this, props);
    _this.state = {
      element: _this.props.element,
      data: _this.props.data,
      dirty: false
    };
    return _this;
  }
  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(FormElementsEdit, [{
    key: "toggleRequired",
    value: function toggleRequired() {
      // const this_element = this.state.element;
    }
  }, {
    key: "editElementProp",
    value: function editElementProp(elemProperty, targProperty, e) {
      var _this2 = this;
      // elemProperty could be content or label
      // targProperty could be value or checked
      var this_element = this.state.element;
      this_element[elemProperty] = e.target[targProperty];
      this.setState({
        element: this_element,
        dirty: true
      }, function () {
        if (targProperty === 'checked') {
          _this2.updateElement();
        }
      });
    }
  }, {
    key: "onEditorStateChange",
    value: function onEditorStateChange(index, property, editorContent) {
      // const html = draftToHtml(convertToRaw(editorContent.getCurrentContent())).replace(/<p>/g, '<div>').replace(/<\/p>/g, '</div>');
      var html = draftjs_to_html__WEBPACK_IMPORTED_MODULE_8___default()(Object(draft_js__WEBPACK_IMPORTED_MODULE_7__["convertToRaw"])(editorContent.getCurrentContent())).replace(/<p>/g, '').replace(/<\/p>/g, '').replace(/&nbsp;/g, ' ').replace(/(?:\r\n|\r|\n)/g, ' ');
      var this_element = this.state.element;
      this_element[property] = html;
      this.setState({
        element: this_element,
        dirty: true
      });
    }
  }, {
    key: "updateElement",
    value: function updateElement() {
      var this_element = this.state.element;
      // to prevent ajax calls with no change
      if (this.state.dirty) {
        this.props.updateElement.call(this.props.preview, this_element);
        this.setState({
          dirty: false
        });
      }
    }
  }, {
    key: "convertFromHTML",
    value: function convertFromHTML(content) {
      var newContent = Object(draft_js__WEBPACK_IMPORTED_MODULE_7__["convertFromHTML"])(content);
      if (!newContent.contentBlocks || !newContent.contentBlocks.length) {
        // to prevent crash when no contents in editor
        return draft_js__WEBPACK_IMPORTED_MODULE_7__["EditorState"].createEmpty();
      }
      var contentState = draft_js__WEBPACK_IMPORTED_MODULE_7__["ContentState"].createFromBlockArray(newContent);
      return draft_js__WEBPACK_IMPORTED_MODULE_7__["EditorState"].createWithContent(contentState);
    }
  }, {
    key: "addOptions",
    value: function addOptions() {
      var _this3 = this;
      var optionsApiUrl = document.getElementById('optionsApiUrl').value;
      if (optionsApiUrl) {
        Object(_stores_requests__WEBPACK_IMPORTED_MODULE_11__["get"])(optionsApiUrl).then(function (data) {
          _this3.props.element.options = [];
          var options = _this3.props.element.options;
          data.forEach(function (x) {
            // eslint-disable-next-line no-param-reassign
            x.key = _UUID__WEBPACK_IMPORTED_MODULE_12___default.a.uuid();
            options.push(x);
          });
          var this_element = _this3.state.element;
          _this3.setState({
            element: this_element,
            dirty: true
          });
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (this.state.dirty) {
        this.props.element.dirty = true;
      }
      var this_checked = this.props.element.hasOwnProperty('required') ? this.props.element.required : false;
      var this_default_checked = this.props.element.hasOwnProperty('defaultChecked') ? this.props.element.defaultChecked : false;
      var this_read_only = this.props.element.hasOwnProperty('readOnly') ? this.props.element.readOnly : false;
      var this_default_today = this.props.element.hasOwnProperty('defaultToday') ? this.props.element.defaultToday : false;
      var this_show_time_select = this.props.element.hasOwnProperty('showTimeSelect') ? this.props.element.showTimeSelect : false;
      var this_show_time_select_only = this.props.element.hasOwnProperty('showTimeSelectOnly') ? this.props.element.showTimeSelectOnly : false;
      var this_show_time_input = this.props.element.hasOwnProperty('showTimeInput') ? this.props.element.showTimeInput : false;
      var this_checked_inline = this.props.element.hasOwnProperty('inline') ? this.props.element.inline : false;
      var this_checked_bold = this.props.element.hasOwnProperty('bold') ? this.props.element.bold : false;
      var this_checked_italic = this.props.element.hasOwnProperty('italic') ? this.props.element.italic : false;
      var this_checked_center = this.props.element.hasOwnProperty('center') ? this.props.element.center : false;
      var this_checked_page_break = this.props.element.hasOwnProperty('pageBreakBefore') ? this.props.element.pageBreakBefore : false;
      var this_checked_alternate_form = this.props.element.hasOwnProperty('alternateForm') ? this.props.element.alternateForm : false;
      var _this$props$element = this.props.element,
        canHavePageBreakBefore = _this$props$element.canHavePageBreakBefore,
        canHaveAlternateForm = _this$props$element.canHaveAlternateForm,
        canHaveDisplayHorizontal = _this$props$element.canHaveDisplayHorizontal,
        canHaveOptionCorrect = _this$props$element.canHaveOptionCorrect,
        canHaveOptionValue = _this$props$element.canHaveOptionValue;
      var canHaveImageSize = this.state.element.element === 'Image' || this.state.element.element === 'Camera';
      var this_files = this.props.files.length ? this.props.files : [];
      if (this_files.length < 1 || this_files.length > 0 && this_files[0].id !== '') {
        this_files.unshift({
          id: '',
          file_name: ''
        });
      }
      var editorState;
      if (this.props.element.hasOwnProperty('content')) {
        editorState = this.convertFromHTML(this.props.element.content);
      }
      if (this.props.element.hasOwnProperty('label')) {
        editorState = this.convertFromHTML(this.props.element.label);
      }
      if (this.props.element.hasOwnProperty('boxLabel')) {
        editorState = this.convertFromHTML(this.props.element.boxLabel);
      }
      console.log(this.props.element);
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "clearfix"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("h4", {
        className: "float-left"
      }, this.props.element.text), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("i", {
        className: "float-right fas fa-times dismiss-edit",
        onClick: this.props.manualEditModeOff
      })), this.props.element.hasOwnProperty('content') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "text-to-display"
      }), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_draft_wysiwyg__WEBPACK_IMPORTED_MODULE_9__["Editor"], {
        toolbar: toolbar,
        defaultEditorState: editorState,
        onBlur: this.updateElement.bind(this),
        onEditorStateChange: this.onEditorStateChange.bind(this, 0, 'content'),
        stripPastedStyles: true
      })), this.props.element.hasOwnProperty('file_path') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "fileSelect"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "choose-file"
      }), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("select", {
        id: "fileSelect",
        className: "form-control",
        defaultValue: this.props.element.file_path,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'file_path', 'value')
      }, this_files.map(function (file) {
        var this_key = "file_".concat(file.id);
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("option", {
          value: file.id,
          key: this_key
        }, file.file_name);
      }))), this.props.element.hasOwnProperty('href') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_6__["default"], {
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.href,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'href', 'value')
      })), this.props.element.hasOwnProperty('label') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "display-label"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_draft_wysiwyg__WEBPACK_IMPORTED_MODULE_9__["Editor"], {
        toolbar: toolbar,
        defaultEditorState: editorState,
        onBlur: this.updateElement.bind(this),
        onEditorStateChange: this.onEditorStateChange.bind(this, 0, 'label'),
        stripPastedStyles: true
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "is-required",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked,
        value: true,
        onChange: this.editElementProp.bind(this, 'required', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "is-required"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "required"
      }))), this.props.element.hasOwnProperty('readOnly') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "is-read-only",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_read_only,
        value: true,
        onChange: this.editElementProp.bind(this, 'readOnly', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "is-read-only"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "read-only"
      }))), this.props.element.hasOwnProperty('defaultToday') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "is-default-to-today",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_default_today,
        value: true,
        onChange: this.editElementProp.bind(this, 'defaultToday', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "is-default-to-today"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "default-to-today"
      }), "?")), this.props.element.hasOwnProperty('showTimeSelect') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "show-time-select",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_show_time_select,
        value: true,
        onChange: this.editElementProp.bind(this, 'showTimeSelect', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "show-time-select"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "show-time-select"
      }), "?")), this_show_time_select && this.props.element.hasOwnProperty('showTimeSelectOnly') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "show-time-select-only",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_show_time_select_only,
        value: true,
        onChange: this.editElementProp.bind(this, 'showTimeSelectOnly', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "show-time-select-only"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "show-time-select-only"
      }), "?")), this.props.element.hasOwnProperty('showTimeInput') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "show-time-input",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_show_time_input,
        value: true,
        onChange: this.editElementProp.bind(this, 'showTimeInput', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "show-time-input"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "show-time-input"
      }), "?")), ['Checkboxes', 'Checkbox'].indexOf(this.state.element.element) !== -1 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "display-horizontal",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_default_checked,
        value: true,
        onChange: this.editElementProp.bind(this, 'defaultChecked', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "display-horizontal"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "default-checked"
      }))), (this.state.element.element === 'RadioButtons' || this.state.element.element === 'Checkboxes') && canHaveDisplayHorizontal && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "display-horizontal",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked_inline,
        value: true,
        onChange: this.editElementProp.bind(this, 'inline', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "display-horizontal"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "display-horizontal"
      })))), this.state.element.element === 'Checkbox' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "checkbox-label-text"
      }), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_draft_wysiwyg__WEBPACK_IMPORTED_MODULE_9__["Editor"], {
        toolbar: toolbar,
        defaultEditorState: editorState,
        onBlur: this.updateElement.bind(this),
        onEditorStateChange: this.onEditorStateChange.bind(this, 0, 'boxLabel'),
        stripPastedStyles: true
      })), this.props.element.hasOwnProperty('src') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "srcInput"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "link-to"
      }), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "srcInput",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.src,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'src', 'value')
      }))), canHaveImageSize && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "do-center",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked_center,
        value: true,
        onChange: this.editElementProp.bind(this, 'center', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "do-center"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "center"
      }), "?"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "col-sm-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "elementWidth"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "width"
      }), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "elementWidth",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.width,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'width', 'value')
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "col-sm-3"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "elementHeight"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "height"
      }), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "elementHeight",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.height,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'height', 'value')
      })))), this.state.element.element === 'FileUpload' && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "fileType"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "choose-file-type"
      }), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("select", {
        id: "fileType",
        className: "form-control",
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'fileType', 'value')
      }, [{
        type: 'image, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, video/mp4,video/x-m4v,video/*',
        typeName: 'All File Type'
      }, {
        type: 'image',
        typeName: 'Image'
      }, {
        type: 'application/pdf',
        typeName: 'PDF'
      }, {
        type: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        typeName: 'Word'
      }, {
        type: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        typeName: 'Excel'
      }, {
        type: 'application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation',
        typeName: 'Powerpoint'
      }, {
        type: 'video/mp4,video/x-m4v,video/*',
        typeName: 'Videos'
      }].map(function (file, index) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("option", {
          value: file.type,
          key: index
        }, file.typeName);
      })))), this.state.element.element === 'Signature' && this.props.element.readOnly ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "variableKey"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "variable-key"
      }), ":"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "variableKey",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.variableKey,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'variableKey', 'value')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("p", {
        className: "help-block"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "variable-key-desc"
      }), ".")) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null), canHavePageBreakBefore && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "print-options"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "page-break-before-element",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked_page_break,
        value: true,
        onChange: this.editElementProp.bind(this, 'pageBreakBefore', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "page-break-before-element"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "page-break-before-elements"
      }), "?"))), canHaveAlternateForm && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "alternate-signature-page"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "display-on-alternate",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked_alternate_form,
        value: true,
        onChange: this.editElementProp.bind(this, 'alternateForm', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "display-on-alternate"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "display-on-alternate-signature-page"
      }), "?"))), this.props.element.hasOwnProperty('step') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group-range"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "rangeStep"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "step"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "rangeStep",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.step,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'step', 'value')
      }))), this.props.element.hasOwnProperty('min_value') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group-range"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "rangeMin"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "min"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "rangeMin",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.min_value,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'min_value', 'value')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.min_label,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'min_label', 'value')
      }))), this.props.element.hasOwnProperty('max_value') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group-range"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "rangeMax"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "max"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "rangeMax",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.max_value,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'max_value', 'value')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.max_label,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'max_label', 'value')
      }))), this.props.element.hasOwnProperty('default_value') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group-range"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "defaultSelected"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "default-selected"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "defaultSelected",
        type: "number",
        className: "form-control",
        defaultValue: this.props.element.default_value,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'default_value', 'value')
      }))), this.props.element.hasOwnProperty('static') && this.props.element["static"] && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "text-style"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "do-bold",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked_bold,
        value: true,
        onChange: this.editElementProp.bind(this, 'bold', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "do-bold"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "bold"
      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "custom-control custom-checkbox"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "do-italic",
        className: "custom-control-input",
        type: "checkbox",
        checked: this_checked_italic,
        value: true,
        onChange: this.editElementProp.bind(this, 'italic', 'checked')
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "custom-control-label",
        htmlFor: "do-italic"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "italic"
      })))), this.props.element.showPlaceholder && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "placeholder"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "place-holder-text-label"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        id: "placeholder",
        defaultValue: this.props.element.placeholder,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'placeholder', 'value')
      })), this.props.element.show_custom_name && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "custom_name"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "custom-name-label"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        type: "text",
        className: "form-control",
        id: "custom_name",
        defaultValue: this.props.element.custom_name,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'custom_name', 'value')
      })), this.props.element.showDescription && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "questionDescription"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "description"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_textarea_autosize__WEBPACK_IMPORTED_MODULE_6__["default"], {
        type: "text",
        className: "form-control",
        id: "questionDescription",
        defaultValue: this.props.element.description,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'description', 'value')
      })), this.props.showCorrectColumn && this.props.element.canHaveAnswer && !this.props.element.hasOwnProperty('options') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "correctAnswer"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "correct-answer"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "correctAnswer",
        type: "text",
        className: "form-control",
        defaultValue: this.props.element.correct,
        onBlur: this.updateElement.bind(this),
        onChange: this.editElementProp.bind(this, 'correct', 'value')
      })), this.props.element.canPopulateFromApi && this.props.element.hasOwnProperty('options') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "form-group"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("label", {
        className: "control-label",
        htmlFor: "optionsApiUrl"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "populate-options-from-api"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "row"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "col-sm-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        className: "form-control",
        style: {
          width: '100%'
        },
        type: "text",
        id: "optionsApiUrl",
        placeholder: "http://localhost:8080/api/optionsdata"
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "col-sm-6"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("button", {
        onClick: this.addOptions.bind(this),
        className: "btn btn-success"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_language_provider_IntlMessages__WEBPACK_IMPORTED_MODULE_13__["default"], {
        id: "populate"
      }))))), this.props.element.hasOwnProperty('options') && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_dynamic_option_list__WEBPACK_IMPORTED_MODULE_10__["default"], {
        showCorrectColumn: this.props.showCorrectColumn,
        canHaveOptionCorrect: canHaveOptionCorrect,
        canHaveOptionValue: canHaveOptionValue,
        data: this.props.preview.state.data,
        updateElement: this.props.updateElement,
        preview: this.props.preview,
        element: this.props.element,
        key: this.props.element.options.length
      }));
    }
  }]);
  return FormElementsEdit;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

FormElementsEdit.defaultProps = {
  className: 'edit-element-fields'
};

/***/ })

}]);
//# sourceMappingURL=0.app.js.map