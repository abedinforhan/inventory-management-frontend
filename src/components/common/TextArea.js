/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

function TextArea({
  title, placeholder, register, registerTitle, errors, required
}) {
  return (
    <div className="mb-3 bg-white form-control">
      <p className="text-gray-400 mb-1">
        {title}
        {
          required
            ? <span className="text-red-300"> *</span>
            : ''
        }
      </p>
      <textarea
        {...register(registerTitle, { required })}
        placeholder={placeholder}
        className="textarea border-1 border-black  bg-white "
      />
      {errors[registerTitle] && <span>This field is required</span>}
    </div>
  );
}

export default TextArea;
