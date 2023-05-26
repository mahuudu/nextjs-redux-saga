import React from "react";
import { useController } from "react-hook-form";

interface Props {
  label: string;
  name: string;
  defaultValue?: string;
  rules?: Record<string, unknown>;
}

const Input = ({ label, name, defaultValue, rules }: Props) => {
  const {
    field: { ref, value, ...inputProps },
    fieldState: { invalid, error },
  } = useController({
    name,
    rules,
    defaultValue,
  });

  return (
    <div className="mb-4">
      <label className="block mb-1">{label}</label>
      <input
        className="appearance-none border border-gray-200 bg-gray-100 rounded-md py-2 px-3 hover:border-gray-400 focus:outline-none focus:border-gray-400 w-full"
        {...inputProps}
        ref={ref}
        defaultValue={value}
      />
      {invalid && <span>{error?.message}</span>}
    </div>
  );
};

export default Input;
