import React from 'react';
import { StorageItem } from '../types/storage';
import { StorageService } from '../utils/storage';

interface StorageListProps {
  items: StorageItem[];
  onItemDeleted: () => void;
}

export function StorageList({ items, onItemDeleted }: StorageListProps) {
  const handleDelete = (id: string) => {
    StorageService.deleteItem(id);
    onItemDeleted();
  };

  if (items.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No items stored yet. Add some items to get started!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
              <p className="mt-1 text-gray-600">{item.content}</p>
              <p className="mt-2 text-sm text-gray-500">
                Last updated: {new Date(item.updatedAt).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => handleDelete(item.id)}
              className="text-red-600 hover:text-red-800 focus:outline-none"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}