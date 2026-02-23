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
import type { DocumentReference } from 'firebase/firestore';
import { useAuthStore } from '@/stores/auth/auth';
import { useToastStore } from '@/stores/toast/toast';
import type { FavoriteJob } from '@/types/favoriteJob';
import type { Job } from '@/types/job';

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    favoriteJobs: [] as FavoriteJob[],
    loading: false,
  }),

  getters: {
    isJobFavorited: state => (jobId: string) => {
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
          ...(doc.data() as Omit<FavoriteJob, 'id'>),
        }));

        console.log(`✅ ${this.favoriteJobs.length} Favorites geladen`);
      } catch (error) {
        this.toast.error('Fehler beim Laden der Favoriten');
        console.error('❌ Fehler beim Laden:', error);
      } finally {
        this.loading = false;
      }
    },

    async toggleFavorite(job: Job) {
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

    async addFavorite(favoriteRef: DocumentReference, job: Job) {
      const favoriteData = {
        title: job.title,
        company: job.company,
        location: job.location,
        description: job.description,
        savedAt: serverTimestamp(),
      };

      await setDoc(favoriteRef, favoriteData);
      this.favoriteJobs.push({ id: job.id, ...favoriteData });

      console.log(this.favoriteJobs);

      this.toast.success('Job gespeichert!');
      console.log('✅ Favorite hinzugefügt:', job.id);
    },

    async removeFavorite(favoriteRef: DocumentReference, jobId: string) {
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
