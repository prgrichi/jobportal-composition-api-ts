import { defineStore } from 'pinia';
import { collection, query, orderBy, where, startAfter, limit, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

export const useJobStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
    singleJob: null,

    isLoading: false,
    isLoadingMore: false,
    error: null,

    searchText: '',
    selectedLocation: '',

    lastVisible: null,
    hasMore: true,
    pageSize: 6,
  }),

  getters: {
    availableLocations(state) {
      const locations = state.jobs
        .map(job => job.location)
        .filter(location => location);

      // Set entfernt automatisch Duplikate
      return [...new Set(locations)].sort();
    },
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

      // Location-Filter
      if (state.selectedLocation) {
        result = result.filter(job => job.location === state.selectedLocation);
      }

      return result;
    },
  },

  actions: {
    async fetchJobs(options = {}) {
      this.isLoading = true;
      this.error = null;

      this.jobs = [];           // Alte Jobs löschen
      this.lastVisible = null;  // Bookmark zurücksetzen
      this.hasMore = true;      // Könnte mehr geben

      try {
        const jobsRef = collection(db, 'jobs');
        const queryParams = [jobsRef];


        if (options.orderBy) {
          queryParams.push(orderBy(options.orderBy.field, options.orderBy.direction));
        }
        if (options.limit) {
          queryParams.push(limit(options.limit));
        }

        // Limit setzen
        const itemLimit = options.limit || this.pageSize;
        queryParams.push(limit(itemLimit));

        const q = queryParams.length > 1 ? query(...queryParams) : jobsRef;
        const querySnapshot = await getDocs(q);

        this.jobs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }))

        // Letztes Dokument speichern für Pagination
        this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

        // Prüfen ob es mehr gibt
        this.hasMore = querySnapshot.docs.length === itemLimit;

      } catch (err) {
        console.error('Fehler beim Laden der Jobs:', err);
        this.error = 'Jobs konnten nicht geladen werden.';
      } finally {
        this.isLoading = false;
      }
    },

    async loadMoreJobs(options = {}) {
      console.log('🔄 Load More gestartet');
      console.log('📍 lastVisible:', this.lastVisible?.id);
      console.log('📊 Aktuelle Jobs:', this.jobs.length);
      if (!this.hasMore || this.isLoadingMore) return;

      this.isLoadingMore = true;
      this.error = null;

      try {
        const jobsRef = collection(db, 'jobs');
        const queryParams = [jobsRef];

        if (options.orderBy) {
          queryParams.push(orderBy(options.orderBy.field, options.orderBy.direction));
        }

        // Starte nach dem letzten Dokument
        if (this.lastVisible) {
          queryParams.push(startAfter(this.lastVisible));
        }

        queryParams.push(limit(this.pageSize));

        const q = query(...queryParams);
        const querySnapshot = await getDocs(q);

        // ✅ Jobs anhängen (nicht ersetzen!)
        const newJobs = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        this.jobs = [...this.jobs, ...newJobs];

        // Letztes Dokument aktualisieren
        if (querySnapshot.docs.length > 0) {
          this.lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        }

        // Prüfen ob es noch mehr gibt
        this.hasMore = querySnapshot.docs.length === this.pageSize;
        console.log('✅ Neue Jobs:', newJobs.length);
        console.log('📊 Gesamt jetzt:', this.jobs.length);
        console.log('🔜 hasMore:', this.hasMore);
      } catch (err) {
        console.error('Fehler beim Laden weiterer Jobs:', err);
        this.error = 'Weitere Jobs konnten nicht geladen werden.';
      } finally {
        this.isLoadingMore = false;
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

    resetFilters() {
      this.searchText = '';
      this.selectedLocation = '';
    }
  }

});