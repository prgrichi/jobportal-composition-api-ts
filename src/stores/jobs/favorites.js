import { defineStore } from 'pinia';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useAuthStore } from '@/stores/auth/auth';
import { useToastStore } from '@/stores/toast/toast';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteJobs: [],
    loading: false,
  }),

  getters: {
    isJobFavorited: state => jobId => {
      return state.favoriteJobs.some(job => job.id === jobId);
    },
    favoriteCount: state => state.favoriteJobs.length,
    authStore: () => useAuthStore(),
    toast: () => useToastStore(),
  },

  actions: {
    getUserId() {
      const userId = this.authStore.user?.uid;
      if (!userId) console.warn('⚠️ Kein User');
      return userId;
    },

    async loadFavorites() {
      const userId = this.getUserId();
      if (!userId) {
        console.log('⚠️ Kein User eingeloggt');
        this.favoriteJobs = [];
        return;
      }

      this.loading = true;

      try {
        const favoritesRef = collection(db, 'users', userId, 'favorites');
        const snapshot = await getDocs(favoritesRef);

        this.favoriteJobs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log(`✅ ${this.favoriteJobs.length} Favorites geladen`);
      } catch (error) {
        this.toast.error('Fehler beim Laden der Favoriten');
        console.error('❌ Fehler beim Laden:', error);
      } finally {
        this.loading = false;
      }
    },

    async toggleFavorite(job) {
      const userId = this.getUserId();

      if (!userId) {
        console.log('⚠️ Kein User eingeloggt');
        return;
      }

      this.loading = true;
      try {
        const favoriteRef = doc(db, 'users', userId, 'favorites', job.id.toString());
        const snapshot = await getDoc(favoriteRef);

        if (snapshot.exists()) {
          await this.removeFavorite(favoriteRef, job.id);
        } else {
          await this.addFavorite(favoriteRef, job);
        }
      } catch (error) {
        this.toast.error('Fehler beim Speichern');
        console.error('❌ Fehler beim Toggle:', error);
      } finally {
        this.loading = false;
      }
    },

    async addFavorite(favoriteRef, job) {
      const favoriteData = {
        jobId: job.id,
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        savedAt: serverTimestamp(),
      };

      await setDoc(favoriteRef, favoriteData);
      this.favoriteJobs.push({ id: job.id, ...favoriteData });

      this.toast.success('Job gespeichert!');
      console.log('✅ Favorite hinzugefügt:', job.id);
    },

    async removeFavorite(favoriteRef, jobId) {
      await deleteDoc(favoriteRef);
      this.favoriteJobs = this.favoriteJobs.filter(j => j.id !== jobId);

      this.toast.success('Job entfernt!');
      console.log('❌ Favorite entfernt:', jobId);
    },

    clearFavorites() {
      this.favoriteJobs = [];
    },
  },
});
