// components/Canvas/CanvasComponent.jsx
import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { ResizeHandles } from '../customization/ResizeHandles';
import { useStore } from '../../store/useStore';

export const CanvasComponent = memo(({ id, data, selected }) => {
  const updateComponent = useStore((state) => state.updateComponent);

  // Generate component styles from the data
  const componentStyles = {
    width: data.styles?.width || 200,
    height: data.styles?.height || 200,
    backgroundColor: data.styles?.backgroundColor || '#ffffff',
    borderRadius: `${data.styles?.borderRadius || 0}px`,
    border: selected ? '2px solid #3b82f6' : '1px solid #e5e7eb',
    position: 'relative',
    ...data.styles,
  };

  // Render different content based on component type
  const renderContent = () => {
    switch (data.type) {
      case 'container':
        return (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            Container
          </div>
        );
      
      case 'button':
        return (
          <button
            className="px-4 py-2 rounded"
            style={{
              backgroundColor: data.styles?.backgroundColor,
              color: data.styles?.color,
              fontSize: `${data.styles?.fontSize}px`,
            }}
          >
            {data.props?.text || 'Button'}
          </button>
        );

      case 'input':
        return (
          <input
            type="text"
            placeholder={data.props?.placeholder || 'Input field'}
            className="w-full px-3 py-2 rounded border border-gray-300"
            style={{
              backgroundColor: data.styles?.backgroundColor,
              color: data.styles?.color,
              fontSize: `${data.styles?.fontSize}px`,
            }}
            // Prevent actual input while designing
            onMouseDown={(e) => e.preventDefault()}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div style={componentStyles}>
      {/* Handles for connecting components */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      
      {/* Component content */}
      {renderContent()}
      
      {/* Resize handles when selected */}
      {selected && data.styles?.isResizable !== false && (
        <ResizeHandles componentId={id} />
      )}
    </div>
  );
});