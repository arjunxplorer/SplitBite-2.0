import React from 'react';
import { ArrowUpRight, ArrowDownRight, Trash2 } from 'lucide-react';
import { StorageItem } from '../types/storage';

interface TransactionListProps {
  items: StorageItem[];
  onItemDeleted: (id: string) => void;
}

export function TransactionList({ items, onItemDeleted }: TransactionListProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center text-gray-500 dark:text-gray-400">
        No transactions yet. Add some transactions to get started!
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  item.type === 'take' ? 'bg-emerald-100 dark:bg-emerald-900' : 'bg-red-100 dark:bg-red-900'
                }`}>
                  {item.type === 'take' ? (
                    <ArrowUpRight className="text-emerald-600 dark:text-emerald-400" size={20} />
                  ) : (
                    <ArrowDownRight className="text-red-600 dark:text-red-400" size={20} />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.user}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`font-semibold ${
                  item.type === 'take' ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {item.type === 'take' ? '+' : '-'}${item.amount.toFixed(2)}
                </span>
                <button
                  onClick={() => onItemDeleted(item.id)}
                  className="p-2 text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
                  aria-label="Delete transaction"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}