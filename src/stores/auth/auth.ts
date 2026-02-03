import { defineStore } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/config/firebase';

import type { User } from '@/types/user';
import type { User as FirebaseUser } from 'firebase/auth';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as FirebaseUser | null,
    authReady: false,
  }),

  getters: {
    isAuthenticated: state => !!state.user,
    userName: state => {
      if (!state.user) return 'Gast';
      return state.user.email?.split('@')[0] || 'Gast';
    },
  },

  actions: {
    init() {
      if (this.authReady) return Promise.resolve();

      return new Promise<FirebaseUser | null>(resolve => {
        onAuthStateChanged(auth, async user => {
          this.user = user;
          if (user) {
            console.log('🔐 User eingeloggt:', user.uid);
            await this.createUserDocument(user);
          }
          this.authReady = true;
          resolve(user);
        });
      });
    },

    async createUserDocument(user: FirebaseUser) {
      const userRef = doc(db, 'users', user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        const newUser: User = {
          uid: user.uid,
          email: user.email || '',
          firstName: '',
          lastName: '',
          jobTitle: '',
          location: '',
          createdAt: serverTimestamp() as any,
          updatedAt: serverTimestamp() as any,
        };

        await setDoc(userRef, newUser);
        console.log('✅ User-Dokument erstellt für:', user.uid);
      } else {
        console.log('ℹ️ User-Dokument existiert bereits');
      }
    },
  },
});
