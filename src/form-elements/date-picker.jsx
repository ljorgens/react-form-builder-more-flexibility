import React from 'react';
import { format, parse } from 'date-fns';
import ReactDatePicker from 'react-datepicker';
import ComponentHeader from './component-header';
import ComponentLabel from './component-label';

// This is the utility function that will attempt to parse a date string
// using several different formats until it finds one that works.
function parseDate(dateStr, formatMask) {
  const formats = [
    'yyyy-MM-dd', // format updated
    'MM/dd/yyyy',
    formatMask,
    // add any other formats you might need to support
  ];

  const date = formats.find((newFormat) => {
    const parsedDate = parse(dateStr, newFormat, new Date());
    return !Number.isNaN(parsedDate.getTime());
  });

  if (date) {
    return parse(dateStr, date, new Date());
  }
  return null;
}

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.inputField = React.createRef();

    const { formatMask } = DatePicker.updateFormat(props, null);
    const state = DatePicker.updateDateTime(props, { formatMask }, formatMask);

    // Ensure state.value and state.internalValue are not undefined
    state.value = state.value || '';
    state.internalValue = state.internalValue || '';

    this.state = state;
  }

  static updateDateTime(props, state, formatMask) {
    let value;
    let internalValue;
    const { defaultToday } = props.data;
    const iOSFormatMask = 'yyyy-MM-dd';
    if (defaultToday && (props.defaultValue === '' || props.defaultValue === undefined)) {
      const dateToFormat = new Date();
      value = dateToFormat.toString() === 'Invalid Date' ? '' : format(dateToFormat, iOSFormatMask);
      internalValue = dateToFormat.toString() === 'Invalid Date' ? '' : dateToFormat; // Ensure not undefined
    } else {
      value = props.defaultValue || ''; // Ensure not undefined
      if (value === '') {
        internalValue = '';
      } else {
        const parsedDate = parse(value, formatMask, new Date());
        internalValue = parsedDate.toString() === 'Invalid Date' ? '' : parsedDate; // Ensure not undefined
      }
    }
    return {
      value,
      internalValue,
      placeholder: formatMask.toLowerCase(),
      defaultToday,
      formatMask,
    };
  }

  handleChange = (dt) => {
    let placeholder;
    const { formatMask } = this.state;
    const iOSFormatMask = 'yyyy-MM-dd';
    if (dt && dt.target) {
      placeholder = (dt && dt.target && dt.target.value === '') ? formatMask.toLowerCase() : '';
      const dateValue = (dt.target.value) ? parseDate(dt.target.value, formatMask) : null;
      if (dateValue && Number.isNaN(dateValue)) {
        console.log('Invalid date:', dt.target.value);
      } else {
        const formattedDate = (dateValue) ? format(dateValue, iOSFormatMask) : '';
        this.setState({
          value: formattedDate,
          internalValue: dateValue,
          placeholder,
        });
      }
    } else if (dt && Number.isNaN(dt)) {
        console.log('Invalid date:', dt);
      } else {
        const formattedDate = (dt) ? format(dt, iOSFormatMask) : '';
        this.setState({
          value: formattedDate,
          internalValue: dt,
          placeholder,
        });
      }
  };

  static updateFormat(props, oldFormatMask) {
    const { showTimeSelect, showTimeSelectOnly, showTimeInput } = props.data;
    const dateFormat = showTimeSelect && showTimeSelectOnly ? '' : props.data.dateFormat;
    const timeFormat = (showTimeSelect || showTimeInput) ? props.data.timeFormat : '';
    const formatMask = (`${dateFormat} ${timeFormat}`).trim();
    const updated = formatMask !== oldFormatMask;

    return { updated, formatMask };
  }

  static getDerivedStateFromProps(props, state) {
    const { updated, formatMask } = DatePicker.updateFormat(props, state.formatMask);
    if ((props.data.defaultToday !== state.defaultToday) || updated) {
      return DatePicker.updateDateTime(props, state, formatMask);
    }
    return null;
  }

  render() {
    const { showTimeSelect, showTimeSelectOnly, showTimeInput } = this.props.data;
    const props = {};
    props.type = 'date';
    props.className = 'form-control';
    props.name = this.props.data.field_name;
    const readOnly = this.props.data.readOnly || this.props.read_only;
    const iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const placeholderText = this.state.formatMask.toLowerCase();

    if (this.props.mutable) {
      props.defaultValue = this.props.defaultValue;
      props.ref = this.inputField;
    }

    let baseClasses = 'SortableItem rfb-item';
    if (this.props.data.pageBreakBefore) { baseClasses += ' alwaysbreak'; }

    return (
      <div className={baseClasses} style={{ ...this.props.style }}>
        <ComponentHeader {...this.props} />
        <div className="form-group">
          <ComponentLabel {...this.props} />
          <div>
            { readOnly &&
              <input type="text"
                     name={props.name}
                     ref={props.ref}
                     readOnly={readOnly}
                     placeholder={this.state.placeholder}
                     value={this.state.value}
                     className="form-control" />
            }
            { iOS && !readOnly &&
              <input type="date"
                     name={props.name}
                     ref={props.ref}
                     onChange={this.handleChange}
                     value={this.state.value}
                     className = "form-control" />
            }
            { !iOS && !readOnly &&
              <ReactDatePicker
                name={props.name}
                ref={props.ref}
                onChange={this.handleChange}
                selected={this.state.internalValue}
                todayButton={'Today'}
                className = "form-control"
                isClearable={true}
                showTimeSelect={showTimeSelect}
                showTimeSelectOnly={showTimeSelectOnly}
                showTimeInput={showTimeInput}
                dateFormat={this.state.formatMask}
                portalId="root-portal"
                autoComplete="off"
                placeholderText={placeholderText} />
            }
          </div>
        </div>
      </div>
    );
  }
}

export default DatePicker;
