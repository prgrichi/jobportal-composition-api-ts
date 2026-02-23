// src/types/favorite.ts
import type { Timestamp, FieldValue } from 'firebase/firestore';

export interface FavoriteJob {
  id: string;
  title: string;
  company: string;
  description: string;
  location: string;
  savedAt: Timestamp | FieldValue;
}
