// src/types/favorite.ts
import type { Timestamp } from 'firebase/firestore';

export type Favorite = {
  jobId: string;
  title: string;
  company: string;
  description: string;
  location: string;
  savedAt: Timestamp;
};
