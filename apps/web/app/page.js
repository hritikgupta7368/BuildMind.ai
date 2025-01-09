// app/page.jsx
'use client';

import { DndContext } from '@dnd-kit/core';
import { ReactFlowProvider } from '@xyflow/react';

import { ComponentsSidebar } from './components/ComponentsSidebar';
import { CustomizationPanel } from './components/customization/CustomizationPanel';


import { useCallback, useRef, useState } from 'react';
import  { ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  applyEdgeChanges,
  applyNodeChanges,
} from '@xyflow/react';
import { useStore } from './store/useStore';
import { CanvasComponent } from './components/canvas/CanvasComponent';
import '@xyflow/react/dist/style.css';



const Canvas = () => {
  // Reference to the canvas wrapper for position calculations
  const canvasRef = useRef(null);
  
  // Get necessary state and actions from our store
  const components = useStore((state) => state.components);
  const addComponent = useStore((state) => state.addComponent);
  const updateComponent = useStore((state) => state.updateComponent);
  const setSelectedComponent = useStore((state) => state.setSelectedComponent);

  // Convert our components to ReactFlow nodes
  const nodes = components.map(component => ({
    id: component.id,
    type: 'customNode',
    position: component.position,
    data: component.data,
  }));

  // Handle node changes (position, selection, etc.)
  const onNodesChange = useCallback((changes) => {
    changes.forEach(change => {
      if (change.type === 'position' && change.position) {
        updateComponent(change.id, { position: change.position });
      }
    });
  }, [updateComponent]);

  // Handle dropping new components onto the canvas
  const onDrop = useCallback((event) => {
    event.preventDefault();

    // Get component data from the drag event
    const componentType = event.dataTransfer.getData('application/componentType');
    if (!componentType || !canvasRef.current) return;

    // Calculate drop position relative to the canvas
    const canvasBounds = canvasRef.current.getBoundingClientRect();
    
    const position = {
      x: event.clientX - canvasBounds.left,
      y: event.clientY - canvasBounds.top,
    };

    // Add the new component to our store
    addComponent({
      type: componentType,
      position,
      data: {
        type: componentType,
        styles: {
          width: 200,
          height: 200,
          backgroundColor: '#ffffff',
          borderRadius: 0,
          zIndex: components.length, // Place on top of existing components
        },
      },
    });
  }, [addComponent, components.length]);

  // Handle drag over for drop indication
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle selecting components
  const onSelectionChange = useCallback(({ nodes }) => {
    if (nodes.length === 1) {
      const selectedComponent = components.find(c => c.id === nodes[0].id);
      setSelectedComponent(selectedComponent || null);
    } else {
      setSelectedComponent(null);
    }
  }, [components, setSelectedComponent]);

  return (
    <div 
      ref={canvasRef}
      className="w-full h-full"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <ReactFlow
        nodes={nodes}
        nodeTypes={{
          customNode: CanvasComponent,
        }}
        onNodesChange={onNodesChange}
        onSelectionChange={onSelectionChange}
        // selectNodesOnDrag={false}
        className="bg-gray-800"
        // defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        fitView
      >
        <Background color="#374151" gap={16} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default function BuilderPage() {
  // We wrap everything in providers needed for drag-and-drop and flow functionality
  return (
    <DndContext>
      <ReactFlowProvider>
        <div className="flex h-screen bg-gray-900">
          {/* Left sidebar for component selection */}
          <ComponentsSidebar />
          
          {/* Main canvas area */}
          <div className="flex-1 relative">
           <Canvas />
          </div>
          
          {/* Right sidebar for customization */}
          <CustomizationPanel />
        </div>
      </ReactFlowProvider>
    </DndContext>
  );
}