// store/useStore.ts
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { produce } from 'immer';
import { nanoid } from 'nanoid';
import { Component, Edge, StoreState, HistoryState } from './types';

const MAX_HISTORY_LENGTH = 50;

const createHistoryEntry = (components: Component[], edges: Edge[]): HistoryState => ({
  components: JSON.parse(JSON.stringify(components)),
  edges: JSON.parse(JSON.stringify(edges))
});

const initialState: StoreState = {
  components: [],
  edges: [],
  selectedComponent: null,
  history: {
    past: [],
    present: { components: [], edges: [] },
    future: []
  },
  clipboard: null,
  undoable: false,
  redoable: false
};

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Core component operations
        addComponent: (component: Partial<Component>) => {
          set(
            produce((state) => {
              const newComponent = {
                id: nanoid(),
                type: component.type || 'default',
                position: component.position || { x: 0, y: 0 },
                data: {
                  name: component.data?.name || `Component-${nanoid(6)}`,
                  type: component.data?.type || 'default',
                  props: component.data?.props || {},
                  styles: component.data?.styles || {},
                  children: component.data?.children || [],
                  ...component.data
                }
              };

              state.components.push(newComponent);
              state.history.past.push(createHistoryEntry(state.components, state.edges));
              state.history.future = [];
              state.undoable = true;
              state.redoable = false;
            })
          );
        },

        updateComponent: (id: string, updates: Partial<Component['data']>) => {
          set(
            produce((state) => {
              const component = state.components.find(c => c.id === id);
              if (component) {
                
                component.data = { ...component.data, ...updates };
                if (state.selectedComponent?.id === id) {
                  state.selectedComponent = component;
                }
                state.history.past.push(createHistoryEntry(state.components, state.edges));
                state.history.future = [];
                state.undoable = true;
                state.redoable = false;
              }
            })
          );
        },

        // Async operations handler
        handleAsyncOperation: async (componentId: string, asyncConfig: Component['data']['asyncConfig']) => {
          const component = get().components.find(c => c.id === componentId);
          if (!component || !asyncConfig) return;

          set(
            produce((state) => {
              const component = state.components.find(c => c.id === componentId);
              if (component) {
                component.data.asyncConfig = {
                  ...asyncConfig,
                  loading: true,
                  error: null
                };
              }
            })
          );

          try {
            const response = await fetch(asyncConfig.dataSource!, {
              method: asyncConfig.method || 'GET',
              body: asyncConfig.method !== 'GET' ? JSON.stringify(asyncConfig.params) : undefined,
              headers: { 'Content-Type': 'application/json' }
            });

            const data = await response.json();

            set(
              produce((state) => {
                const component = state.components.find(c => c.id === componentId);
                if (component) {
                  component.data.asyncConfig = {
                    ...component.data.asyncConfig,
                    loading: false,
                    response: data
                  };
                }
              })
            );
          } catch (error) {
            set(
              produce((state) => {
                const component = state.components.find(c => c.id === componentId);
                if (component) {
                  component.data.asyncConfig = {
                    ...component.data.asyncConfig,
                    loading: false,
                    error
                  };
                }
              })
            );
          }
        },

        // History management
        undo: () => {
          set(
            produce((state) => {
              if (state.history.past.length === 0) return;

              const previous = state.history.past[state.history.past.length - 1];
              state.history.future.unshift(state.history.present);
              state.history.present = previous;
              state.history.past.pop();
              state.components = previous.components;
              state.edges = previous.edges;
              state.undoable = state.history.past.length > 0;
              state.redoable = true;
            })
          );
        },

        redo: () => {
          set(
            produce((state) => {
              if (state.history.future.length === 0) return;

              const next = state.history.future[0];
              state.history.past.push(state.history.present);
              state.history.present = next;
              state.history.future.shift();
              state.components = next.components;
              state.edges = next.edges;
              state.undoable = true;
              state.redoable = state.history.future.length > 0;
            })
          );
        },

        // Selection management
        setSelectedComponent: (component: Component | null) => {
          set(produce((state) => {
            state.selectedComponent = component;
          }));
        },

        // Additional utility functions
        duplicateComponent: (id: string) => {
          set(
            produce((state) => {
              const component = state.components.find(c => c.id === id);
              if (component) {
                const newComponent = {
                  ...JSON.parse(JSON.stringify(component)),
                  id: nanoid(),
                  position: {
                    x: component.position.x + 20,
                    y: component.position.y + 20
                  }
                };
                state.components.push(newComponent);
                state.history.past.push(createHistoryEntry(state.components, state.edges));
                state.history.future = [];
              }
            })
          );
        }
      }),
      {
        name: 'canvas-store',
        partialize: (state) => ({
          components: state.components,
          edges: state.edges
        })
      }
    )
  )
);