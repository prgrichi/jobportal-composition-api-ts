// src/types/job.ts
import type { Timestamp } from 'firebase/firestore';

export type Job = {
  company: string;
  createdAt: Timestamp;
  description: string;
  employmentType: string;
  id: string;
  level: string;
  location: string;
  remote: boolean;
  requirements: string[];
  responsibilities: string[];
  salaryRange: string;
  shortDescription: string;
  tags: string[];
  title: string;
};
