// components/CustomizationPanel/PropertySection.jsx
import { memo } from 'react';
import { PropertyInput } from './PropertyInput';

export const PropertySection = memo(({ title, properties }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <div className="space-y-4">
        {properties.map((prop, index) => (
          <PropertyInput
            key={`${prop.label}-${index}`}
            label={prop.label}
            type={prop.type}
            value={prop.value}
            onChange={prop.onChange}
            options={prop.options}
          />
        ))}
      </div>
    </div>
  );
});