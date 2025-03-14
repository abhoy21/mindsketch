import React from "react";

export default function DrawOptions({
  strokeColor,
  setStrokeColor,
  bgColor = "transparent",
  setBgColor,
  strokeWidth = 1,
  setStrokeWidth,
  strokeStyle = "solid",
  setStrokeStyle,

  fontSize = "medium",
  setFontSize,
}: {
  strokeColor: string;
  setStrokeColor: (s: string) => void;
  bgColor: string;
  setBgColor: (s: string) => void;
  strokeWidth: number;
  setStrokeWidth: (s: number) => void;
  strokeStyle: string;
  setStrokeStyle: (s: string) => void;

  fontSize: string;
  setFontSize: (s: string) => void;
}): React.JSX.Element {
  const colorOptions = [
    { color: "#ad46ff", bgClass: "bg-[#ad46ff]" },
    { color: "#ff8383", bgClass: "bg-[#ff8383]" },
    { color: "#56a2e8", bgClass: "bg-[#56a2e8]" },
    { color: "#3a994c", bgClass: "bg-[#3a994c]" },
    { color: "#ff6900", bgClass: "bg-[#ff6900]" },
    { color: "#ffffff", bgClass: "bg-white" },
  ];

  const bgColorOptions = [
    { color: "transparent", bgClass: "bg-transparent border border-gray-600" },
    { color: "#043b0c", bgClass: "bg-[#043b0c]" },
    { color: "#510424", bgClass: "bg-[#510424]" },
    { color: "#154163", bgClass: "bg-[#154163]" },
    { color: "#3f2f24", bgClass: "bg-[#3f2f24]" },
    { color: "#4b004f", bgClass: "bg-[#4b004f]" },
  ];

  const strokeWidthOptions = [
    { width: 1, displayClass: "h-[1px]" },
    { width: 4, displayClass: "h-[4px]" },
    { width: 8, displayClass: "h-[6px]" },
  ];

  const strokeStyleOptions = [
    { style: "solid", displayClass: "h-[2px] bg-white" },
    {
      style: "dashed",
      displayClass: "h-[2px] bg-white border-dashed border-t border-white",
    },
    {
      style: "dotted",
      displayClass: "h-[2px] bg-white border-dotted border-t border-white",
    },
  ];

  const fontSizeOptions = [
    { size: "small", label: "S" },
    { size: "medium", label: "M" },
    { size: "large", label: "L" },
    { size: "xlarge", label: "XL" },
  ];

  const handleColorSelect = (color: string) => {
    setStrokeColor(color);
  };

  const handleBgColorSelect = (color: string) => {
    setBgColor(color);
  };

  const handleStrokeWidthSelect = (width: number) => {
    setStrokeWidth(width);
  };

  const handleStrokeStyleSelect = (style: string) => {
    setStrokeStyle(style);
  };

  const handleFontSizeSelect = (size: string) => {
    setFontSize(size);
  };

  const isColorSelected = (color: string) => {
    return strokeColor === color;
  };

  const isBgColorSelected = (color: string) => {
    return bgColor === color;
  };

  const isStrokeWidthSelected = (width: number) => {
    return strokeWidth === width;
  };

  const isStrokeStyleSelected = (style: string) => {
    return strokeStyle === style;
  };

  const isFontSizeSelected = (size: string) => {
    return fontSize === size;
  };

  return (
    <div className="w-56 bg-[#232329] text-[#a7a7ac] p-4 flex flex-col gap-4 h-grow rounded-xl">
      <div className="space-y-3">
        <h3 className="text-sm font-medium">Stroke</h3>
        <div className="flex gap-2">
          {colorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 ${option.bgClass} rounded-md ${
                isColorSelected(option.color) ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => handleColorSelect(option.color)}
              aria-label={`Select ${option.color} color`}
            ></button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Background</h3>
        <div className="flex gap-2">
          {bgColorOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 ${option.bgClass} rounded-md ${
                isBgColorSelected(option.color)
                  ? "border-2 border-blue-500"
                  : ""
              }`}
              onClick={() => handleBgColorSelect(option.color)}
              aria-label={`Select ${option.color} background`}
            ></button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Stroke width</h3>
        <div className="flex gap-2">
          {strokeWidthOptions.map((option, index) => (
            <button
              key={index}
              className={`w-8 h-6 ${
                isStrokeWidthSelected(option.width)
                  ? "bg-indigo-800"
                  : "bg-gray-700"
              } rounded-md text-xs flex items-center justify-center`}
              onClick={() => handleStrokeWidthSelect(option.width)}
              aria-label={`Set stroke width to ${option.width}`}
            >
              <div
                className={`w-4 ${option.displayClass} bg-white rounded-sm`}
              ></div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Stroke style</h3>
        <div className="flex gap-2">
          {strokeStyleOptions.map((option, index) => (
            <button
              key={index}
              className={`w-8 h-6 ${
                isStrokeStyleSelected(option.style)
                  ? "bg-indigo-800"
                  : "bg-gray-700"
              } rounded-md text-xs flex items-center justify-center`}
              onClick={() => handleStrokeStyleSelect(option.style)}
              aria-label={`Set stroke style to ${option.style}`}
            >
              <div className={`w-4 ${option.displayClass}`}></div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-sm font-medium">Font size</h3>
        <div className="flex gap-2">
          {fontSizeOptions.map((option, index) => (
            <button
              key={index}
              className={`w-6 h-6 ${
                isFontSizeSelected(option.size)
                  ? "bg-indigo-800"
                  : "bg-gray-700"
              } rounded-md text-xs flex items-center justify-center`}
              onClick={() => handleFontSizeSelect(option.size)}
              aria-label={`Set font size to ${option.size}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
