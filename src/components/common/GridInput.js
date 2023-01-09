/* eslint-disable jsx-a11y/label-has-associated-control */
import { ErrorMessage } from '@hookform/error-message';
import React from 'react';

function GridInput({
  readOnly = false, label, type: inputType, defaultValue, placeholder, register, name, rules, errors, dynamicClass = ''
}) {
  return (
    <div>
      <div className="grid grid-cols-4  my-4">
        <label htmlFor={name} className="label">
          <span className="font-medium">
            {label}
            {rules?.required ? <span className="text-red-500 "> *</span> : ''}
          </span>
          <span className="font-bold">:</span>
        </label>

        <div className="col-span-3 ml-4">
          <input
            id={label}
            type={inputType}
            placeholder={placeholder}
            readOnly={readOnly}
            defaultValue={defaultValue}
            className={`h-10 p-2 w-full border-0 bg-white  focus:outline-offset-0 ${dynamicClass}`}
            {...register(name, rules)}
          />
        </div>
      </div>
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) => messages
          && Object.entries(messages).map(([type, message]) => (
            <p key={type} className="text-green-400">
              {message}
            </p>
          ))}
      />
    </div>
  );
}

export default GridInput;
