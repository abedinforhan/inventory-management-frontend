/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
import React from 'react';

function Button({
  title, type, isLoading, isDisabled
}) {
  return (
    <div className="mb-3">
      <button
        type={type}
        disabled={isDisabled}
        className="btn btn-sm "
      >
        {title}
      </button>
    </div>
  );
}

export default Button;
