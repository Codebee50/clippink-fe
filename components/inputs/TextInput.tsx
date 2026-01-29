"use client";

import React, { useState } from "react";
import InputLabel from "./InputLabel";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import IconTextInputLabel from "./IconTextInputLabel";
import { FormikProps } from "formik";



type TextInputProps<T> = {
  type?: string;
  id?: string;
  name: keyof T & string;
  label?: string;
  placeholder?: string;
  className?: string;
  conClassName?: string;
  required?: boolean;
  labelSider?: React.ReactNode;
  formik?: FormikProps<T>;
  icon?: React.ReactNode;
  rightHint?: React.ReactNode;
  underHint?: React.ReactNode;
};


const TextInput = <T,>({
  type = "text",
  id = "forminput",
  name,
  label = "FormInput",
  placeholder = "",
  className = "",
  conClassName = "",
  required = false,
  labelSider = null,
  formik = undefined,
  icon = null,
  rightHint = null,
  underHint = null,
}: TextInputProps<T>) => {
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } = formik || {};

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`mt-3 flex flex-col w-full ${conClassName} gap-1`}>
      <div className="w-full flex flex-row items-center justify-between">
        {icon ? (
          <IconTextInputLabel Icon={icon} label={label} />
        ) : (
          <InputLabel label={label || name} />
        )}

        {labelSider && labelSider}
      </div>
      <div className="w-full flex flex-col gap-1">
        <div className="relative w-full flex flex-col">
          <input
            type={showPassword && type === "password" ? "text" : type}
            name={name}
            id={id}
            className={`bg-greys3/20 w-full px-3 py-3 max-sm:text-[16px] text-sm border border-greys1/20 rounded-sm sm:mt-1  outline-senary/30 ${errors?.[name] && touched?.[name] ? "input-error" : ""
              } ${className}`}
            placeholder={placeholder}
            required={required}
            value={values?.[name] as string}
            onChange={handleChange}
            onBlur={handleBlur}
            onWheel={(e) => e.currentTarget.blur()}
          />

          {type === "password" && (
            <button
              className="absolute inset-y-0 right-3 cursor-pointer text-greys2 z-20"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </button>
          )}

          {rightHint && (
            <div className="absolute inset-y-0 right-0 mr-3 flex items-center justify-center">
              {rightHint}
            </div>
          )}
        </div>
        {underHint && underHint}
        {errors?.[name] && touched?.[name] && (
          <p className="text-red-500 text-xs">{errors?.[name] as string || "Error"}</p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
