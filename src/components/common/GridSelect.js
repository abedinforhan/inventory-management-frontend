import { ErrorMessage } from '@hookform/error-message';
import React from 'react';
import { Controller } from 'react-hook-form';
import Select from 'react-select';

function GridSelect({
  label, name, control, rules, options, errors, isDisabled = false, defaultValue
}) {
  const colorStyles = {
    control: (styles, state) => ({
      ...styles,
      height: '40px',
      padding: '0px 10px',
      margin: '0px 2px',
      border: '0px',
      color: 'black',
      backgroundColor: '#fff',
      boxShadow: 'none',
      fontWeight: '600'

    })
  };

  return (
    <div className="grid grid-cols-4  my-4">
      <label htmlFor={name} className="label">
        <span className="font-medium">
          {label}
          {rules?.required ? <span className="text-red-500 "> *</span> : ''}
        </span>
        <span className="font-bold">:</span>
      </label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field }) => (
          <Select
            isDisabled={isDisabled}
            id={name}
            styles={colorStyles}
            isClearable
            value={defaultValue}
            options={options}
            onChange={(props) => {
              field.onChange(props.value);
            }}
          />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ messages }) => messages
          && Object.entries(messages).map(([type, message]) => (
            <p key={type} className="text-black-400">
              {message}
            </p>
          ))}
      />
    </div>
  );
}

export default GridSelect;
