import React from 'react';
import { Balance } from '../types/storage';

interface BalanceHeaderProps {
  balance: Balance;
}

export function BalanceHeader({ balance }: BalanceHeaderProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">Balance Summary</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="text-sm text-gray-600">To Give</p>
          <p className="text-xl font-medium text-red-500">
            ${balance.totalToGive.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">To Take</p>
          <p className="text-xl font-medium text-green-500">
            ${balance.totalToTake.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Net Balance</p>
          <p className={`text-xl font-medium ${balance.netBalance >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            ${balance.netBalance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}