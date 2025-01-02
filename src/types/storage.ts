export interface StorageItem {
  id: string;
  user: string;
  amount: number;
  type: 'give' | 'take';
  createdAt: string;
}

export interface StorageError {
  message: string;
  code: 'QUOTA_EXCEEDED' | 'STORAGE_UNAVAILABLE' | 'VALIDATION_ERROR';
}

export interface Balance {
  totalToGive: number;
  totalToTake: number;
  netBalance: number;
}