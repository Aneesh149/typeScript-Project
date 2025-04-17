import React, { useState, ReactNode } from "react";
import { Controller, Control, FieldValues, FieldPath } from "react-hook-form";
import { BsInfoCircle } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import CommonTooltip from "./CommonTooltip";
import { tooltip } from "../../constant/TooltipContent";
import "./Common.css";

export interface OptionType {
  value: string;
  label: string;
  icon?: ReactNode;
}

interface CustomSelectProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
> {
  name: TName;
  label?: string;
  control: Control<TFieldValues>;
  required?: boolean;
  error?: string;
  placeholder?: string;
  labelClassName?: string;
  classname?: string;
  isEditable?: boolean;
  disabled?: boolean;
  showInfoButton?: boolean;
  options: OptionType[];
  icon?: ReactNode;
  isMulti?: boolean;
  isSearchable?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  optionClassName?: string;
  showOptionIcon?: boolean;
}

const CustomSelect = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  name,
  label = "",
  control,
  required = false,
  error,
  placeholder = "Select an option",
  labelClassName = "",
  classname = "",
  isEditable = false,
  disabled = false,
  showInfoButton = true,
  options = [],
  icon,
  isMulti = false,
  isSearchable = false,
  onChange: customOnChange,
  onBlur: customOnBlur,
  optionClassName = "",
  showOptionIcon = false
}: CustomSelectProps<TFieldValues, TName>) => {
  const [isOpen, setIsOpen] = useState(false);
  const tooltip_content = typeof name === 'string' && name in tooltip ? tooltip[name as keyof typeof tooltip] : undefined;

  const handleSelectClick = () => {
    if (!isEditable) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <label
        htmlFor={name as string}
        className={`custom-label ${labelClassName}`}
      >
        <span>
          {label}
          {required && <span className="custom-label-red"> *</span>}
        </span>
        {showInfoButton && tooltip_content && (
          <CommonTooltip tooltip={tooltip_content}>
            <BsInfoCircle />
          </CommonTooltip>
        )}
      </label>
      <div className="custom-input-container">
        <span className="custom-input-icon">
          {icon || (isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />)}
        </span>
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <>
              <select
                name={name as string}
                required={required}
                onChange={(e) => {
                  onChange(e);
                  if (customOnChange) customOnChange(e);
                }}
                onBlur={(e) => {
                  onBlur();
                  if (customOnBlur) customOnBlur(e);
                  setIsOpen(false);
                }}
                value={value || ""}
                disabled={isEditable || disabled}
                onClick={handleSelectClick}
                className={`custom-select ${isEditable || disabled ? "custom-input-disabled" : ""
                  } ${isOpen ? "custom-select-open" : ""} ${classname}`}
              >
                <option value="" disabled>
                  {placeholder}
                </option>
                {options.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                    className={optionClassName}
                  >
                    {showOptionIcon && option.icon} {option.label}
                  </option>
                ))}
              </select>

              {/* Custom styled dropdown - can be enabled for advanced styling if needed */}
              {/* {isOpen && !isEditable && (
                <div className="custom-select-dropdown">
                  {options.map((option) => (
                    <div
                      key={option.value}
                      className={`custom-select-option ${
                        value === option.value ? "custom-select-option-selected" : ""
                      } ${optionClassName}`}
                      onClick={() => {
                        onChange(option.value);
                        if (customOnChange) customOnChange({ target: { value: option.value } });
                        setIsOpen(false);
                      }}
                    >
                      {showOptionIcon && option.icon && (
                        <span className="custom-select-option-icon">{option.icon}</span>
                      )}
                      {option.label}
                    </div>
                  ))}
                </div>
              )} */}
            </>
          )}
        />
        {error && <p className="custom-error-message">{error}</p>}
      </div>
    </>
  );
};

export default CustomSelect; 