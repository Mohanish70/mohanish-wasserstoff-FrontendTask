
import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('../components/Sidebar'), { ssr: false });
const TextEditor = dynamic(() => import('../components/TextEditor'), { ssr: false });
const NoteMaker = dynamic(() => import('../components/NoteMaker'), { ssr: false });
const ListMaker = dynamic(() => import('../components/ListMaker'), { ssr: false });
const ReadmePreview = dynamic(() => import('../components/ReadmePreview'), { ssr: false });
const FileTree = dynamic(() => import('../components/FileTree'), { ssr: false });

export interface File {
  name: string;
  type: string;
  content?: string;
  notes?: { id: string; content: string }[];
}

export interface Folder {
  name: string;
  files: File[];
}

const initialFiles: Folder[] = [
  {
    name: 'Folder1',
    files: [
      { name: 'file1.ed', type: 'ed', content: 'This is a text file' },
      { name: 'file2.note', type: 'note', notes: [{ id: '1', content: 'Note 1' }, { id: '2', content: 'Note 2' }] },
    ],
  },
];

const Home: React.FC = () => {
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const [folders, setFolders] = useState<Folder[]>(initialFiles);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceFolderIndex = parseInt(result.source.droppableId);
    const destFolderIndex = parseInt(result.destination.droppableId);

    const sourceFiles = [...folders[sourceFolderIndex].files];
    const [movedFile] = sourceFiles.splice(result.source.index, 1);

    const destFiles = [...folders[destFolderIndex].files];
    destFiles.splice(result.destination.index, 0, movedFile);

    const newFolders = [...folders];
    newFolders[sourceFolderIndex].files = sourceFiles;
    newFolders[destFolderIndex].files = destFiles;

    setFolders(newFolders);
  };

  const renderActiveFile = () => {
    if (!activeFile) return <div className="p-4">Select a file</div>;
    switch (activeFile.type) {
      case 'ed':
        return <TextEditor file={activeFile} />;
      case 'note':
        return <NoteMaker file={activeFile} />;
      case 'lt':
        return <ListMaker file={activeFile} />;
      case 'readme':
        return <ReadmePreview file={activeFile} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar file={folders} setActiveFile={setActiveFile} />
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex-1 p-4 bg-yellow-500">
          {folders.map((folder, folderIndex) => (
            <Droppable key={folder.name} droppableId={`${folderIndex}`}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className="mb-4">
                  <h3 className="text-lg font-bold mb-2">{folder.name}</h3>
                  {folder.files.map((file, fileIndex) => (
                    <Draggable key={file.name} draggableId={file.name} index={fileIndex}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => setActiveFile(file)}
                          className="p-2 border-b cursor-pointer bg-white rounded mb-2 shadow-sm hover:shadow-lg"
                        >
                          {file.name}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          {renderActiveFile()}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
