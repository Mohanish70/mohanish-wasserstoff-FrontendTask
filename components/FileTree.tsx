import React, { useState } from 'react';

interface FileTreeProps {
  onFileSelect: (path: string) => void;
}

const FileTree: React.FC<FileTreeProps> = ({ onFileSelect }) => {
  const [files] = useState({
    '/': {
      type: 'folder',
      children: {
        'notes': {
          type: 'folder',
          children: {
            'note1.note': { type: 'file' },
            'note2.note': { type: 'file' },
          },
        },
        'docs': {
          type: 'folder',
          children: {
            'readme.readme': { type: 'file' },
          },
        },
        'tasks': {
          type: 'folder',
          children: {
            'task1.lt': { type: 'file' },
            'task2.lt': { type: 'file' },
          },
        },
      },
    },
  });

  const renderTree = (node: any, path: string) => {
    if (node.type === 'folder') {
      return (
        <div key={path}>
          <div>{path}</div>
          <div className="pl-4">
            {Object.keys(node.children).map(key =>
              renderTree(node.children[key], `${path}/${key}`)
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div key={path} onClick={() => onFileSelect(path)}>
          {path}
        </div>
      );
    }
  };

  return <div>{renderTree(files['/'], '/')}</div>;
};

export default FileTree;
