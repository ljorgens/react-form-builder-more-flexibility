import React from 'react';
import myxss from './myxss';

const ComponentLabel = (props) => {
  const hasRequiredLabel = (props.data.hasOwnProperty('required') && props.data.required === true && !props.read_only);
  const labelText = myxss.process(props.data.label);

  if (!labelText || !labelText.trim()) {
    return null;
  }

  const hasPopUp = !!props.data.hasPopUp;

  return (
    <label
      // id so the paired input can name itself via aria-labelledby (H91/F68):
      // the label's onClick opens the rules popup for hasPopUp items, so
      // htmlFor would wrongly focus the field — name by reference instead.
      id={props.data.field_name ? `${props.data.field_name}__label` : undefined}
      onClick={hasPopUp ? props.passUpClick : undefined} // Pass the function reference instead of invoking it
      className={props.className || 'form-label'}
      style={{ marginTop: '0.5rem' }}
    >
      <span dangerouslySetInnerHTML={{ __html: labelText }} />
      {hasRequiredLabel && !props.hide_required_alert && <span className="label-required badge badge-danger">Required</span>}
    </label>
  );
};

export default ComponentLabel;
