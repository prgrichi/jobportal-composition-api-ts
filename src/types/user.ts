// src/types/user.ts
import type { Timestamp, FieldValue } from 'firebase/firestore';

export type User = {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  location: string;
  createdAt: Timestamp | FieldValue;
  updatedAt: Timestamp | FieldValue;
};
