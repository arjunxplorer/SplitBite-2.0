import { StorageItem, StorageError, Balance } from '../types/storage';

const STORAGE_KEY = 'expense_data';

export class StorageService {
  private static isAvailable(): boolean {
    try {
      localStorage.setItem('test', 'test');
      localStorage.removeItem('test');
      return true;
    } catch {
      return false;
    }
  }

  static getItems(): StorageItem[] {
    if (!this.isAvailable()) {
      throw this.createError('STORAGE_UNAVAILABLE', 'Local storage is not available');
    }

    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  static addItem(user: string, amount: number, type: 'give' | 'take'): StorageItem {
    if (!user || !amount) {
      throw this.createError('VALIDATION_ERROR', 'User and amount are required');
    }

    try {
      const items = this.getItems();
      const newItem: StorageItem = {
        id: crypto.randomUUID(),
        user,
        amount,
        type,
        createdAt: new Date().toISOString(),
      };

      items.push(newItem);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return newItem;
    } catch (error) {
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        throw this.createError('QUOTA_EXCEEDED', 'Storage quota exceeded');
      }
      throw error;
    }
  }

  static deleteItem(id: string): void {
    const items = this.getItems();
    const filteredItems = items.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredItems));
  }

  static calculateBalance(): Balance {
    const items = this.getItems();
    return items.reduce((acc, item) => {
      if (item.type === 'give') {
        acc.totalToGive += item.amount;
      } else {
        acc.totalToTake += item.amount;
      }
      acc.netBalance = acc.totalToTake - acc.totalToGive;
      return acc;
    }, { totalToGive: 0, totalToTake: 0, netBalance: 0 });
  }

  private static createError(code: StorageError['code'], message: string): StorageError {
    return { code, message };
  }
}