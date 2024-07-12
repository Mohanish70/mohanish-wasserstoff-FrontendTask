// components/ReadmePreview.tsx
import React, { useState } from 'react';
import { File } from '../pages';

interface ReadmePreviewProps {
  file: File;
}

const ReadmePreview: React.FC<ReadmePreviewProps> = ({ file }) => {
  const [content, setContent] = useState(file.content || '');

  return (
    <div className="p-4 bg-gray-100 rounded">
      <textarea
        className="w-full h-32 p-2 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="p-4 border border-gray-300 rounded-lg" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default ReadmePreview;
