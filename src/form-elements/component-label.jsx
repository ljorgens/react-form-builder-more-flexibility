import React from 'react';
import myxss from './myxss';

const ComponentLabel = (props) => {
  const hasRequiredLabel = (props.data.hasOwnProperty('required') && props.data.required === true && !props.read_only);
  const labelText = myxss.process(props.data.label);
  if (!labelText || !labelText.trim()) {
    return null;
  }
  return (
    <label className={props.className || 'form-label'} style={{marginTop: '0.5rem'}}>
      <span dangerouslySetInnerHTML={{ __html: labelText }}/>
      {hasRequiredLabel && !props.hide_required_alert && <span className="label-required badge badge-danger">Required</span>}
    </label>
  );
};

export default ComponentLabel;
