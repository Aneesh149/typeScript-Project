import React, { useRef, useState, ReactNode } from "react";
import ReactDOM from "react-dom";

interface TooltipCoords {
  left: number;
  top: number;
}

interface CommonTooltipProps {
  tooltip?: string;
  children: ReactNode;
  tooltipClass?: string;
}

const CommonTooltip: React.FC<CommonTooltipProps> = ({
  tooltip,
  children,
  tooltipClass = "bg-gray-900 dark:bg-gray-700 text-white",
}) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const [tooltipCoords, setTooltipCoords] = useState<TooltipCoords>({ left: 0, top: 0 });
  const [visible, setVisible] = useState<boolean>(false);

  const handleMouseEnter = () => {
    if (!parentRef.current) return;
    const rect = parentRef.current.getBoundingClientRect();
    const left = rect.left + rect.width / 2;
    const top = rect.top - 24;
    setTooltipCoords({ left, top });
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };

  const tooltipElement =
    visible && tooltip ? (
      <span
        className={`${tooltipClass} text-xs text-white shadow-sm font-semibold z-[999] transition p-1 px-2 rounded absolute`}
        style={{
          left: tooltipCoords.left,
          top: tooltipCoords.top,
          transform: "translateX(-50%)",
          whiteSpace: "nowrap",
        }}
      >
        {tooltip}
      </span>
    ) : null;

  return (
    <div
      ref={parentRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative inline-block cursor-pointer"
    >
      {children}
      {ReactDOM.createPortal(tooltipElement, document.body)}
    </div>
  );
};

export default CommonTooltip;
