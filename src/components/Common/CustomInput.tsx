import React, { useState, ReactNode } from "react";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineVisibility } from "react-icons/md";
import { RiEyeCloseLine } from "react-icons/ri";
import CommonTooltip from "./CommonTooltip";
import { tooltip } from "../../constant/TooltipContent";

interface CustomInputProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label?: string;
  inputType: string;
  control: Control<TFieldValues>;
  required?: boolean;
  error?: string;
  placeholder?: string;
  labelClassName?: string;
  classname?: string;
  isEditable?: boolean;
  showInfoButton?: boolean;
  max?: string | number;
  min?: string | number;
  icon?: ReactNode;
  rowLimit?: number;
}

const CustomInput = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label = "",
  inputType = "",
  control,
  required = false,
  error,
  placeholder = "",
  labelClassName = "block text-custom-black",
  classname = "",
  isEditable = false,
  showInfoButton = true,
  max = "",
  min = "",
  icon = "",
  rowLimit = 3    
}: CustomInputProps<TFieldValues, TName>) => {
  const [showPassword, setShowPassword] = useState(false);
  const tooltip_content = name && tooltip[name];

  return inputType === "text-area" ? (
    <>
      <label
        htmlFor={name as string}
        className={`font-medium flex items-center gap-2 text-sm text-slate-600 ${labelClassName}`}
      >
        <span>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
        {showInfoButton && (
          <CommonTooltip tooltip={tooltip_content}>
            <BsInfoCircle />
          </CommonTooltip>
        )}
      </label>
      <div className="relative">
        <span className="absolute top-5 right-3 z-50 text-slate-500">
          {icon}
        </span>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <textarea
              name={name as string}
              required={required}
              rows={rowLimit}
              placeholder={placeholder}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ''}
              readOnly={isEditable}
              className={`border px-3 py-2 mt-2 pr-6 outline-none w-full rounded-md resize-none text-justify focus:border-custom-blue ${isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                } ${classname}`}
            />
          )}
        />
        {error && <p className="text text-red-500">{error}</p>}
      </div>
    </>
  ) : (
    <>
      <label
        htmlFor={name as string}
        className={`flex items-center gap-2 font-medium text-sm text-slate-600 ${labelClassName}`}
      >
        <span>
          {label}
          {required && <span className="text-red-500"> *</span>}
        </span>
        {showInfoButton && (
          <CommonTooltip tooltip={tooltip_content}>
            <BsInfoCircle />
          </CommonTooltip>
        )}
      </label>
      <div className="relative">
        {inputType === "password" ? (
          showPassword ? (
            <MdOutlineVisibility
              size={22}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-[#96A9B7] cursor-pointer right-2 top-4"
            />
          ) : (
            <RiEyeCloseLine
              size={22}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute text-[#96A9B7] cursor-pointer right-2 top-4"
            />
          )
        ) : (
          <span
            className={`absolute top-5 right-1 z-50 text-slate-500`}
          >
            {icon}
          </span>
        )}

        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              tabIndex={0}
              name={name as string}
              required={required}
              placeholder={placeholder}
              type={showPassword ? "text" : (inputType === "tel" ? "text" : inputType)}
              onChange={onChange}
              onBlur={onBlur}
              value={value || ''}
              readOnly={isEditable}
              max={max}
              min={min}
              className={`border px-3 py-2 mt-2 pr-5 text-sm outline-none w-full rounded-md focus:border-custom-blue ${isEditable ? "bg-gray-100 cursor-not-allowed" : ""
                } ${classname}`}
            />
          )}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </>
  );
};

export default CustomInput;
