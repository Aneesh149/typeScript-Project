import React from 'react';

interface CustomViewProps {
  label: string;
  value: string | number | undefined;
  className?: string;
  labelClassName?: string;
  valueClassName?: string;
}

const CustomView: React.FC<CustomViewProps> = ({
  label,
  value,
  className = '',
  labelClassName = '',
  valueClassName = ''
}) => {
  return (
    <div className={`view-field ${className}`}>
      <div className={`view-label text-sm font-medium text-slate-500 mb-1 ${labelClassName}`}>
        {label}
      </div>
      <div className={`view-value border-b pb-2 text-md font-semibold ${valueClassName}`}>
        {value || '-'}
      </div>
    </div>
  );
};

export default CustomView; 