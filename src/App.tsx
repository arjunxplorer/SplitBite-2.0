import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DashboardHeader } from './components/DashboardHeader';
import { BalanceCards } from './components/BalanceCards';
import { TransactionList } from './components/TransactionList';
import { ExpenseForm } from './components/ExpenseForm';
import { StorageService } from './utils/storage';
import { StorageItem, Balance } from './types/storage';
import { ThemeProvider } from './contexts/ThemeContext';

export default function App() {
  const [items, setItems] = useState<StorageItem[]>([]);
  const [balance, setBalance] = useState<Balance>({ totalToGive: 0, totalToTake: 0, netBalance: 0 });
  const [error, setError] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const loadData = () => {
    try {
      const storedItems = StorageService.getItems();
      const currentBalance = StorageService.calculateBalance();
      setItems(storedItems);
      setBalance(currentBalance);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-xl">
              {error}
            </div>
          )}

          <DashboardHeader onAddTransaction={() => setIsFormOpen(true)} />
          <BalanceCards balance={balance} />
          <TransactionList 
            items={items} 
            onItemDeleted={(id) => {
              StorageService.deleteItem(id);
              loadData();
            }} 
          />
        </main>

        <ExpenseForm 
          isOpen={isFormOpen}
          onClose={() => setIsFormOpen(false)}
          onItemAdded={loadData}
        />
      </div>
    </ThemeProvider>
  );
}