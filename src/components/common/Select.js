import React from 'react';

function Select({
  title, required, registerTitle, register, errors, options
}) {
  return (
    <div className="mb-3 bg-white">
      <p className="text-gray-400 mb-1">
        {title}
        {
          required
            ? <span className="text-red-300"> *</span>
            : ''
        }
      </p>
      <p className="">
        <select
          className="bg-white mb-1
          w-full
          select
          select-bordered
          rounded
          focus:border-none
          p-2
          "
          {...register(registerTitle, { required })}
        >
          {
            options?.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          }

        </select>
      </p>
    </div>

  );
}

export default Select;
