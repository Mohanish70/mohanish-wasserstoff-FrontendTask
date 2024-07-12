// components/Sidebar.tsx
import React from 'react';
import { Folder, File } from '../pages';

interface SidebarProps {
  file: Folder[];
  setActiveFile: (file: File | null) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ file, setActiveFile }) => {
  return (
    <div className="w-1/4 h-full bg-red-900 text-grey p-4">
      <h2 className="text-lg font-bold mb-4">Files</h2>
      {file.map((folder) => (
        <div key={folder.name} className="mb-4">
          <h3 className="text-md font-semibold">{folder.name}</h3>
          <ul>
            {folder.files.map((file) => (
              <li
                key={file.name}
                className="cursor-pointer p-2 hover:bg-yellow-700 rounded"
                onClick={() => setActiveFile(file)}
              >
                {file.name}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
