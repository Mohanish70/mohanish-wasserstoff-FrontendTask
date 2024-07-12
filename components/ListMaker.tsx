// components/ListMaker.tsx
import React, { useState } from 'react';
import { File } from '../pages';

interface ListMakerProps {
  file: File;
}

const ListMaker: React.FC<ListMakerProps> = ({ file }) => {
  const [items, setItems] = useState<string[]>([]);
  const [item, setItem] = useState<string>('');

  const addItem = () => {
    setItems([...items, item]);
    setItem('');
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button onClick={addItem} className="ml-2 p-2 bg-yellow-500 text-white rounded">
          Add Item
        </button>
      </div>
      <ul className="mt-4">
        {items.map((item, index) => (
          <li key={index} className="p-2 border-b rounded bg-yellow-100 mb-2">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListMaker;
