import { defineStore } from 'pinia';
import { collection, query, orderBy, where, limit, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const useJobStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    singleJob: null,

    isLoading: false,
    error: null,
    // Filter States - hier kannst du sukzessive erweitern
    searchText: '',
  }),

  getters: {
    filteredJobs(state) {
      let result = state.jobs;

      // Text-Filter
      if (state.searchText) {
        const search = state.searchText.toLowerCase();
        result = result.filter(job => {
          const title = job.title?.toLowerCase() || ''
          const company = job.company?.toLowerCase() || ''
          return title.includes(search) ||
            company.includes(search);
        })
      }

      return result;
    },
  },

  actions: {
    async fetchJobs(options = {}) {
      this.isLoading = true;
      this.error = null;

      try {
        const jobsRef = collection(db, 'jobs');
        const queryParams = [jobsRef];

        if (options.orderBy) {
          queryParams.push(orderBy(options.orderBy.field, options.orderBy.direction));
        }
        if (options.limit) {
          queryParams.push(limit(options.limit));
        }

        const q = queryParams.length > 1 ? query(...queryParams) : jobsRef;
        const querySnapshot = await getDocs(q);

        this.jobs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))
      } catch (err) {
        console.error('Fehler beim Laden der Jobs:', err);
        this.error = 'Jobs konnten nicht geladen werden.';
      } finally {
        this.isLoading = false;
      }
    },

    async fetchJobById(jobId) {
      this.isLoading = true;
      this.error = null;
      console.log('🔍 Suche Job mit ID:', jobId);

      try {
        const jobsRef = collection(db, 'jobs');
        const q = query(jobsRef, where('id', '==', jobId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const jobDoc = querySnapshot.docs[0];
          const jobData = {
            id: jobDoc.id,
            ...jobDoc.data()
          };
          console.log('✅ Job gefunden:', jobData);
          this.singleJob = jobData;
        } else {
          console.log('❌ Kein Job mit id-Feld:', jobId);
          this.error = 'Job nicht gefunden';
          return null;
        }
      } catch (err) {
        console.error('💥 Fehler:', err);
        this.error = 'Fehler beim Laden';
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    // Alle Filter zurücksetzen
    resetFilters() {
      this.searchText = '';
    }
  }

});