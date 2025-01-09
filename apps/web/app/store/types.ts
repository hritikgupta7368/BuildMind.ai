// store/types.ts
// First, let's define our types for better type safety and code completion

export interface Component {
    id: string;
    type: string;
    position: { x: number; y: number };
    data: {
      name: string;
      type: string;
      props: Record<string, any>;
      styles: Record<string, any>;
      children?: string[];
      parentId?: string;
      isContainer?: boolean;
      asyncConfig?: {
        dataSource?: string;
        method?: string;
        params?: Record<string, any>;
        response?: any;
        loading?: boolean;
        error?: any;
      };
      eventHandlers?: Record<string, Function>;
    };
  }
  
  export interface Edge {
    id: string;
    source: string;
    target: string;
    type?: string;
    data?: Record<string, any>;
  }
  
  export interface HistoryState {
    components: Component[];
    edges: Edge[];
  }
  
  export interface StoreState {
    components: Component[];
    edges: Edge[];
    selectedComponent: Component | null;
    history: {
      past: HistoryState[];
      present: HistoryState;
      future: HistoryState[];
    };
    clipboard: Component | null;
    undoable: boolean;
    redoable: boolean;
  }