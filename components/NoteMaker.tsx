// components/NoteMaker.tsx
import React, { useState } from 'react';
import { File } from '../pages';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface NoteMakerProps {
  file: File;
}

interface Note {
  id: string;
  content: string;
  category: string;
}

const NoteMaker: React.FC<NoteMakerProps> = ({ file }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNoteContent, setNewNoteContent] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');
  const categories = ['To Do', 'In Progress', 'Done'];

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceIndex = result.source.index;
    const destIndex = result.destination.index;
    const destCategory = result.destination.droppableId;

    const updatedNotes = [...notes];
    const [movedNote] = updatedNotes.splice(sourceIndex, 1);
    movedNote.category = destCategory;
    updatedNotes.splice(destIndex, 0, movedNote);

    setNotes(updatedNotes);
  };

  const addNote = (category: string) => {
    const newNote = { id: `${notes.length + 1}`, content: noteContent, category };
    setNotes([...notes, newNote]);
    setNoteContent('');
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => addNote(category)}
            className="ml-2 p-2 bg-green-500 text-white rounded"
          >
            Add to {category}
          </button>
        ))}
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="flex">
          {categories.map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-1/3 p-4 bg-gray-200 m-2 rounded"
                >
                  <h3 className="text-lg font-bold mb-2">{category}</h3>
                  {notes
                    .filter((note) => note.category === category)
                    .map((note, index) => (
                      <Draggable key={note.id} draggableId={note.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 mb-2 bg-white rounded shadow"
                          >
                            {note.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default NoteMaker;
