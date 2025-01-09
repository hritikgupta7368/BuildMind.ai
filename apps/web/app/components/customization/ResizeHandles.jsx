// components/CustomizationPanel/ResizeHandles.jsx
import { useCallback } from 'react';
import { useStore } from '../../store/useStore';

const HANDLE_POSITIONS = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];

export const ResizeHandles = ({ componentId }) => {
  const updateComponent = useStore((state) => state.updateComponent);

  const handleResize = useCallback((e, position) => {
    const startX = e.clientX;
    const startY = e.clientY;
    const component = useStore.getState().components.find(c => c.id === componentId);
    
    if (!component) return;

    const startWidth = component.data.styles?.width || 200;
    const startHeight = component.data.styles?.height || 200;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;

      if (position.includes('right')) {
        newWidth = startWidth + dx;
      }
      if (position.includes('bottom')) {
        newHeight = startHeight + dy;
      }

      updateComponent(componentId, {
        styles: {
          ...component.data.styles,
          width: Math.max(50, newWidth),
          height: Math.max(50, newHeight)
        }
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [componentId, updateComponent]);

  return (
    <>
      {HANDLE_POSITIONS.map((position) => (
        <div
          key={position}
          className="absolute w-3 h-3 bg-blue-500 rounded-full cursor-nwse-resize"
          style={{
            top: position.includes('top') ? -4 : 'auto',
            bottom: position.includes('bottom') ? -4 : 'auto',
            left: position.includes('left') ? -4 : 'auto',
            right: position.includes('right') ? -4 : 'auto',
          }}
          onMouseDown={(e) => handleResize(e, position)}
        />
      ))}
    </>
  );
};