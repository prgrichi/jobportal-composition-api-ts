// src/types/user.ts
import type { Timestamp } from 'firebase/firestore';

export type User = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  location: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
};
