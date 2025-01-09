// components/ComponentsSidebar.jsx
import { memo } from 'react';

const AVAILABLE_COMPONENTS = [
  {
    type: 'container',
    label: 'Container',
    defaultStyles: {
      width: 200,
      height: 200,
      backgroundColor: '#ffffff',
      borderRadius: 0,
    },
  }
];

export const ComponentsSidebar = memo(() => {
  const onDragStart = (event, componentType) => {
    event.dataTransfer.setData('application/componentType', componentType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 bg-gray-900 p-4">
      <h2 className="text-lg font-semibold text-white mb-4">Components</h2>
      <div className="space-y-2">
        {AVAILABLE_COMPONENTS.map((component) => (
          <div
            key={component.type}
            draggable
            onDragStart={(e) => onDragStart(e, component.type)}
            className="bg-gray-800 p-3 rounded cursor-move hover:bg-gray-700 
                       text-gray-300 transition-colors"
          >
            {component.label}
          </div>
        ))}
      </div>
    </div>
  );
});