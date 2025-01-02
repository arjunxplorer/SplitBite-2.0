import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Balance } from '../types/storage';

interface BalanceCardsProps {
  balance: Balance;
}

export function BalanceCards({ balance }: BalanceCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="mb-2">
          <h3 className="text-gray-500 text-sm">Current Balance</h3>
        </div>
        <p className="text-2xl font-semibold text-gray-900">
          ${balance.netBalance.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="mb-2">
          <h3 className="text-gray-500 text-sm">Total Income</h3>
        </div>
        <p className="text-2xl font-semibold text-emerald-600">
          ${balance.totalToTake.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="mb-2">
          <h3 className="text-gray-500 text-sm">Total Expenses</h3>
        </div>
        <p className="text-2xl font-semibold text-red-600">
          ${balance.totalToGive.toFixed(2)}
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100">
        <div className="mb-2">
          <h3 className="text-gray-500 text-sm">Net Balance</h3>
        </div>
        <p className={`text-2xl font-semibold ${balance.netBalance >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
          ${balance.netBalance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}