
import React, { useState } from 'react';
import { File } from '../pages';

interface TextEditorProps {
  file: File;
}

const TextEditor: React.FC<TextEditorProps> = ({ file }) => {
  const [content, setContent] = useState(file.content || '');

  return (
    <textarea
      className="w-full h-full p-4 border border-gray-300 rounded-lg"
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />
  );
};

export default TextEditor;
