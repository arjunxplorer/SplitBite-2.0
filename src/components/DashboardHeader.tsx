import React from 'react';
import { Plus } from 'lucide-react';

interface DashboardHeaderProps {
  onAddTransaction: () => void;
}

export function DashboardHeader({ onAddTransaction }: DashboardHeaderProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      <div className="flex items-center space-x-4">
        <span className="text-gray-500">{currentDate}</span>
        <button
          onClick={onAddTransaction}
          className="inline-flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
        >
          <Plus size={20} className="mr-2" />
          Add transaction
        </button>
      </div>
    </div>
  );
}