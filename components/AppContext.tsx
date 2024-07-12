import React, { createContext, useReducer, ReactNode } from 'react';

// Define interfaces for the app state
interface AppState {
  folders: Folder[];
}

interface Folder {
  id: string;
  name: string;
  files: File[];
}

interface File {
  id: string;
  name: string;
  type: 'ed' | 'note' | 'lt' | 'readme';
  content: string;
  notes?: Note[];
}

interface Note {
  id: string;
  content: string;
  status: 'todo' | 'in-progress' | 'done';
}

// Initial state
const initialState: AppState = {
  folders: [],
};

// Create context
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Reducer function
const reducer = (state: AppState, action: any): AppState => {
  switch (action.type) {
    case 'ADD_FOLDER':
      return {
        ...state,
        folders: [...state.folders, action.payload],
      };
    case 'ADD_FILE':
      return {
        ...state,
        folders: state.folders.map(folder =>
          folder.id === action.payload.folderId
            ? { ...folder, files: [...folder.files, action.payload.file] }
            : folder
        ),
      };
    case 'UPDATE_NOTES':
      return {
        ...state,
        folders: state.folders.map(folder => ({
          ...folder,
          files: folder.files.map(file =>
            file.id === action.payload.fileId
              ? { ...file, notes: action.payload.notes }
              : file
          ),
        })),
      };
    default:
      return state;
  }
};

// Context provider
const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
