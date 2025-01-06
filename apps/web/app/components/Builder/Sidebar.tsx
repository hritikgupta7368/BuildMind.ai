//@ts-nocheck
import { useState } from 'react';

const COMPONENTS = [
  { id: 'heading', label: 'Heading', icon: '🔤' },
  { id: 'text', label: 'Text', icon: '📝' },
  { id: 'button', label: 'Button', icon: '🔲' },
  { id: 'image', label: 'Image', icon: '🖼️' },
  { id: 'container', label: 'Container', icon: '📦' },
];

export default function Sidebar() {
  const onDragStart = (event: React.DragEvent, componentId: string) => {
    event.dataTransfer.setData('componentId', componentId);
  };

  return (
    <div className="w-64 bg-gray-100 p-4">
      <h2 className="mb-4 text-lg font-semibold">Components</h2>
      <div className="space-y-2">
        {COMPONENTS.map((component) => (
          <div
            key={component.id}
            draggable
            onDragStart={(e) => onDragStart(e, component.id)}
            className="flex cursor-move items-center gap-2 rounded-md bg-white p-3 shadow-sm hover:shadow"
          >
            <span>{component.icon}</span>
            <span>{component.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}