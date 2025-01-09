// components/CustomizationPanel/CustomizationPanel.jsx
import { useCallback, useMemo } from 'react';
import { useStore } from '../../store/useStore';
import { PropertySection } from './PropertySection';
import { ResizeHandles } from './ResizeHandles';

export const CustomizationPanel = () => {
  // Get necessary state and actions from the store
  const selectedComponent = useStore((state) => state.selectedComponent);
  const updateComponent = useStore((state) => state.updateComponent);

  // Handler for property changes that updates the store
  const handlePropertyChange = useCallback((property, value) => {
    if (!selectedComponent) return;
    
    updateComponent(selectedComponent.id, {
      ...selectedComponent.data,
      [property]: value
    });
  }, [selectedComponent, updateComponent]);

  // Get the appropriate property sections based on component type
  const propertyConfigs = useMemo(() => {
    if (!selectedComponent) return [];

    // Base properties that all components share
    const baseProperties = {
      title: 'Layout',
      properties: [
        {
          label: 'Position X',
          type: 'number',
          value: selectedComponent.position.x,
          onChange: (value) => handlePropertyChange('position', { 
            ...selectedComponent.position, 
            x: value 
          })
        },
        {
          label: 'Position Y',
          type: 'number',
          value: selectedComponent.position.y,
          onChange: (value) => handlePropertyChange('position', { 
            ...selectedComponent.position, 
            y: value 
          })
        },
        {
          label: 'Z-Index',
          type: 'number',
          value: selectedComponent.data.styles?.zIndex ?? 0,
          onChange: (value) => handlePropertyChange('styles', { 
            ...selectedComponent.data.styles,
            zIndex: value 
          })
        }
      ]
    };

    // Component-specific properties
    const componentProperties = {
      container: [
        {
          title: 'Dimensions',
          properties: [
            {
              label: 'Width',
              type: 'number',
              value: selectedComponent.data.styles?.width ?? 200,
              onChange: (value) => handlePropertyChange('styles', {
                ...selectedComponent.data.styles,
                width: value
              })
            },
            {
              label: 'Height',
              type: 'number',
              value: selectedComponent.data.styles?.height ?? 200,
              onChange: (value) => handlePropertyChange('styles', {
                ...selectedComponent.data.styles,
                height: value
              })
            }
          ]
        },
        {
          title: 'Appearance',
          properties: [
            {
              label: 'Background Color',
              type: 'color',
              value: selectedComponent.data.styles?.backgroundColor ?? '#ffffff',
              onChange: (value) => handlePropertyChange('styles', {
                ...selectedComponent.data.styles,
                backgroundColor: value
              })
            },
            {
              label: 'Border Radius',
              type: 'number',
              value: selectedComponent.data.styles?.borderRadius ?? 0,
              onChange: (value) => handlePropertyChange('styles', {
                ...selectedComponent.data.styles,
                borderRadius: value
              })
            },
            {
              label: 'Border Width',
              type: 'number',
              value: selectedComponent.data.styles?.borderWidth ?? 0,
              onChange: (value) => handlePropertyChange('styles', {
                ...selectedComponent.data.styles,
                borderWidth: value
              })
            },
            {
              label: 'Border Color',
              type: 'color',
              value: selectedComponent.data.styles?.borderColor ?? '#000000',
              onChange: (value) => handlePropertyChange('styles', {
                ...selectedComponent.data.styles,
                borderColor: value
              })
            }
          ]
        }
      ],
      button: [
        {
          title: 'Content',
          properties: [
            {
              label: 'Button Text',
              type: 'text',
              value: selectedComponent.data.props?.text ?? 'Button',
              onChange: (value) => handlePropertyChange('props', {
                ...selectedComponent.data.props,
                text: value
              })
            }
          ]
        },
        {
          title: 'Style',
          properties: [
            {
              label: 'Text Color',
              type: 'color',
              value: selectedComponent.data.styles?.color ?? '#000000',
              onChange: (value) => handlePropertyChange('styles', {
                ...selectedComponent.data.styles,
                color: value
              })
            },
            {
              label: 'Font Size',
              type: 'number',
              value: selectedComponent.data.styles?.fontSize ?? 16,
              onChange: (value) => handlePropertyChange('styles', {
                ...selectedComponent.data.styles,
                fontSize: value
              })
            }
          ]
        }
      ]
      // Add more component types as needed
    };

    return [baseProperties, ...(componentProperties[selectedComponent.data.type] || [])];
  }, [selectedComponent, handlePropertyChange]);

  if (!selectedComponent) {
    return (
      <div className="w-80 bg-gray-900 p-4 text-gray-400">
        Select a component to customize
      </div>
    );
  }

  return (
    <div className="w-80 bg-gray-900 text-white overflow-y-auto">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold">
          {selectedComponent.data.name || `${selectedComponent.data.type} Properties`}
        </h2>
      </div>
      
      <div className="p-4 space-y-6">
        {propertyConfigs.map((config, index) => (
          <PropertySection
            key={`${config.title}-${index}`}
            title={config.title}
            properties={config.properties}
          />
        ))}
      </div>
    </div>
  );
};