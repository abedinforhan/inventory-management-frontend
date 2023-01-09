import React from 'react';

function Input({
  title, type, placeholder, register, registerTitle, errors, required, multiple
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
      <p>
        <input
          type={type}
          placeholder={placeholder}
          multiple={multiple}
          className=" bg-white border-2 rounded p-2 w-full  "
        />
        {errors[registerTitle] && <span>This field is required</span>}
      </p>
    </div>
  );
}

export default Input;
