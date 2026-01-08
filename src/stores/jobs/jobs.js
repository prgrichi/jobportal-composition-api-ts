// stores/jobs/jobs.js
import { defineStore } from 'pinia';
import { collection, query, orderBy, startAfter, limit, getDocs, doc, getDoc } from 'firebase/firestore';
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
    selectedLevel: '',
    lastVisible: null,
    hasMore: true,
    pageSize: 6,
  }),

  getters: {
    availableLocations(_state) {
      return this.getUniqueValues('location');
    },
    availableLevels(_state) {
      return this.getUniqueValues('level');
    },
    filteredJobs(state) {
      return state.jobs.filter(job => {
        if (state.searchText) {
          const search = state.searchText.toLowerCase();
          const title = job.title?.toLowerCase() || '';
          const company = job.company?.toLowerCase() || '';
          if (!title.includes(search) && !company.includes(search)) {
            return false;
          }
        }
        if (state.selectedLocation && job.location !== state.selectedLocation) {
          return false;
        }
        if (state.selectedLevel && job.level !== state.selectedLevel) {
          return false;
        }
        return true;
      });
    },
  },

  actions: {
    mapDocToJob(doc) {
      const data = doc.data();
      const { id: jobNumber, ...otherData } = data;

      return {
        id: doc.id,
        jobNumber,
        ...otherData
      };
    },

    getUniqueValues(field) {
      const values = this.jobs
        .map(job => job[field])
        .filter(Boolean);
      return [...new Set(values)].sort();
    },

    buildQuery(options = {}) {
      const jobsRef = collection(db, 'jobs');
      const queryParams = [jobsRef];

      if (options.orderBy) {
        queryParams.push(orderBy(options.orderBy.field, options.orderBy.direction));
      }

      if (options.startAfter) {
        queryParams.push(startAfter(options.startAfter));
      }

      const itemLimit = options.limit || this.pageSize;
      queryParams.push(limit(itemLimit));

      return query(...queryParams);
    },

    async fetchJobs(options = {}) {
      this.isLoading = true;
      this.error = null;
      this.jobs = [];
      this.lastVisible = null;
      this.hasMore = true;

      try {
        const q = this.buildQuery(options);
        const querySnapshot = await getDocs(q);

        this.jobs = querySnapshot.docs.map(doc => this.mapDocToJob(doc));

        const docs = querySnapshot.docs;
        this.lastVisible = docs.length > 0 ? docs[docs.length - 1] : null;
        this.hasMore = docs.length === (options.limit || this.pageSize);

        console.log(`✅ ${this.jobs.length} Jobs geladen`);
      } catch (err) {
        console.error('❌ Fehler beim Laden:', err);
        this.error = 'Jobs konnten nicht geladen werden.';
      } finally {
        this.isLoading = false;
      }
    },

    async loadMoreJobs(options = {}) {
      if (!this.hasMore || this.isLoadingMore || !this.lastVisible) {
        console.log('⚠️ Load More abgebrochen');
        return;
      }

      this.isLoadingMore = true;
      this.error = null;

      try {
        const q = this.buildQuery({
          ...options,
          startAfter: this.lastVisible
        });

        const querySnapshot = await getDocs(q);
        const newJobs = querySnapshot.docs.map(doc => this.mapDocToJob(doc));

        this.jobs.push(...newJobs);

        const docs = querySnapshot.docs;
        if (docs.length > 0) {
          this.lastVisible = docs[docs.length - 1];
        }

        this.hasMore = docs.length === this.pageSize;

        console.log(`✅ ${newJobs.length} neue Jobs.  Gesamt: ${this.jobs.length}`);
      } catch (err) {
        console.error('❌ Fehler beim Nachladen:', err);
        this.error = 'Weitere Jobs konnten nicht geladen werden. ';
      } finally {
        this.isLoadingMore = false;
      }
    },

    async fetchJobById(jobId) {
      this.isLoading = true;
      this.error = null;
      this.singleJob = null;

      console.log('🔍 Lade Job:', jobId);

      try {
        const jobDoc = await getDoc(doc(db, 'jobs', jobId));

        if (jobDoc.exists()) {
          this.singleJob = this.mapDocToJob(jobDoc);

          console.log('✅ Job geladen:', this.singleJob.title);
          return this.singleJob;
        } else {
          console.log('❌ Job nicht gefunden:', jobId);
          this.error = 'Job nicht gefunden';
          return null;
        }
      } catch (err) {
        console.error('❌ Fehler beim Laden:', err);
        this.error = 'Fehler beim Laden des Jobs';
        return null;
      } finally {
        this.isLoading = false;
      }
    },

    getJobFromCache(jobId) {
      return this.jobs.find(job => job.id === jobId) || null;
    },

    async fetchJobByIdWithCache(jobId) {
      const cachedJob = this.getJobFromCache(jobId);
      if (cachedJob) {
        console.log('💾 Job aus Cache:', jobId);
        this.singleJob = cachedJob;
        return cachedJob;
      }

      return await this.fetchJobById(jobId);
    },

    resetFilters() {
      this.searchText = '';
      this.selectedLocation = '';
      this.selectedLevel = '';
    },
  }
});