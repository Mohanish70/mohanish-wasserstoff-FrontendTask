import React, { useContext } from 'react';
import { AppContext } from '../components/AppContext';
import NoteMaker from '../components/NoteMaker';
import { File } from '@/pages';

const FileEditors: React.FC = () => {
  const { state } = useContext(AppContext);

  function renderEditor(file: File) {
    switch (file.type) {
      case 'ed':
        return <div>Text Editor for {file.name}</div>;
      case 'note':
        return <NoteMaker file={file} />;
      case 'lt':
        return <div>List Maker for {file.name}</div>;
      case 'readme':
        return <div>ReadMe Preview for {file.name}</div>;
      default:
        return <div>Unsupported file type</div>;
    }
  }

  return (
    <div>
      {state.folders.map((folder) =>
        folder.files.map((file) => (
          <div key={file.name}>
            {renderEditor(file)}
          </div>
        ))
      )}
    </div>
  );
};

export default FileEditors;
