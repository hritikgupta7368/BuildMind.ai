//@ts-nocheck
import { useState } from 'react';

export default function Canvas() {
  const [components, setComponents] = useState<Array<{ id: string; type: string }>>([]);

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const componentId = event.dataTransfer.getData('componentId');
    
    setComponents([
      ...components,
      {
        id: `${componentId}-${Date.now()}`,
        type: componentId
      }
    ]);
  };

  return (
    <div 
      onDragOver={onDragOver}
      onDrop={onDrop}
      className="flex-1 bg-white p-8"
    >
      <div className="min-h-[calc(100vh-8rem)] rounded-lg border-2 border-dashed border-gray-300 p-4">
        {components.map((component) => (
          <div key={component.id} className="mb-4 p-2 border rounded">
            {component.type} Component
          </div>
        ))}
        {components.length === 0 && (
          <div className="flex h-full items-center justify-center text-gray-400">
            Drag and drop components here
          </div>
        )}
      </div>
    </div>
  );
}