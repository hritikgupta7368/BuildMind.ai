// components/CustomizationPanel/PropertyInput.jsx
import { memo } from 'react';

export const PropertyInput = memo(({ label, type, value, onChange, options = {} }) => {
  const inputClassName = "w-full bg-gray-800 rounded px-3 py-2 text-sm text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50";

  const renderInput = () => {
    switch (type) {
      case 'color':
        return (
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              <div 
                className="w-8 h-8 rounded border border-gray-700"
                style={{ backgroundColor: value }}
              />
            </div>
            <input
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              className={inputClassName}
            />
          </div>
        );

      case 'number':
        return (
          <div className="flex gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(Number(e.target.value))}
              className={inputClassName}
              min={options.min}
              max={options.max}
              step={options.step}
            />
            {options.unit && (
              <span className="flex items-center text-xs text-gray-400">
                {options.unit}
              </span>
            )}
          </div>
        );

      default:
        return (
          <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={inputClassName}
          />
        );
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs text-gray-400">{label}</label>
      {renderInput()}
    </div>
  );
});