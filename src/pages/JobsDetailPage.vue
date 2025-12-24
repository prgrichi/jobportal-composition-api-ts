<template>

  <div v-if="jobStore.isLoading">Lädt... </div>
  <div v-else-if="jobStore.error">{{ job.error }}</div>
  <div v-else-if="job">

    <div class="min-h-screen bg-gray-50">
      <header class="border-b border-gray-200 bg-white">
        <div class="mx-auto max-w-app px-4 py-5">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div class="flex items-center gap-3">
              <RouterLink :to="backRoute"
                class="inline-flex items-center gap-2 rounded-xl px-3 md:px-0 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                <span aria-hidden="true">←</span>
                Jobs
              </RouterLink>

              <span class="text-xs text-gray-400">/</span>

              <span class="text-sm font-medium text-gray-900">
                {{ job.id }}
              </span>
            </div>

            <div class="flex flex-wrap gap-2">
              <button type="button" class="btn btn-secondary">
                Speichern
              </button>
              <button type="button" class="btn btn-primary">
                Bewerben
              </button>
            </div>
          </div>
        </div>
      </header>

      <section class="mx-auto max-w-app px-4 py-8">
        <div class="grid gap-6 lg:grid-cols-12">
          <div class="lg:col-span-7">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
              {{ job.title }}
            </h1>

            <p class="mt-2 text-sm text-gray-600">
              {{ job.company }} · {{ job.location }}
              <!-- {{ remoteLabel }} -->
            </p>

            <p class="mt-4 text-base text-gray-700">
              {{ job.shortDescription }}
            </p>

            <div class="mt-5 flex flex-wrap gap-2">
              <span v-for="tag in job.tags" :key="tag"
                class="rounded-full bg-white px-3 py-1 text-xs text-gray-700 ring-1 ring-gray-200">
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Spec sheet (right) -->
          <div class="lg:col-span-5">
            <div class="rounded-3xl bg-white p-5 ring-1 ring-gray-200">
              <div class="flex items-start justify-between gap-4">
                <div>
                  <p class="mt-1 text-lg font-semibold text-gray-900">
                    {{ job.salaryRange }}
                  </p>
                </div>

                <span class="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                  {{ job.level }}
                </span>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-3">
                <div class="rounded-2xl bg-gray-50 p-3">
                  <p class="text-xs text-gray-500">Anstellung</p>
                  <p class="mt-1 text-sm font-semibold text-gray-900">
                    {{ job.employmentType }}
                  </p>
                </div>

                <div class="rounded-2xl bg-gray-50 p-3">
                  <p class="text-xs text-gray-500">Arbeitsmodell</p>
                  <p class="mt-1 text-sm font-semibold text-gray-900">
                    {{ remoteLabel }}
                  </p>
                </div>

                <div class="rounded-2xl bg-gray-50 p-3">
                  <p class="text-xs text-gray-500">Ort</p>
                  <p class="mt-1 text-sm font-semibold text-gray-900">
                    {{ job.location }}
                  </p>
                </div>

                <div class="rounded-2xl bg-gray-50 p-3">
                  <p class="text-xs text-gray-500">Erstellt</p>
                  <p class="mt-1 text-sm font-semibold text-gray-900">
                    {{ createdAtDE }}
                  </p>
                </div>
              </div>

              <div class="mt-4 flex gap-2">

                <button type="button" class="btn btn-primary w-full">
                  Bewerben
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Content blocks (3 panels) -->
        <div class="mt-8 grid gap-4 lg:grid-cols-3">
          <!-- Beschreibung -->
          <section class="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
            <h2 class="text-sm font-semibold text-gray-900">Beschreibung</h2>
            <p class="mt-3 text-sm leading-6 text-gray-700">
              {{ job.description }}
            </p>
          </section>

          <!-- Aufgaben -->
          <section class="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
            <h2 class="text-sm font-semibold text-gray-900">Aufgaben</h2>
            <ul class="mt-3 space-y-2 text-sm text-gray-700">
              <li v-for="item in job.responsibilities" :key="item" class="flex gap-3">
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600"></span>
                <span class="leading-6">{{ item }}</span>
              </li>
            </ul>
          </section>

          <!-- Profil -->
          <section class="rounded-3xl bg-white p-6 ring-1 ring-gray-200">
            <h2 class="text-sm font-semibold text-gray-900">Profil</h2>
            <ul class="mt-3 space-y-2 text-sm text-gray-700">
              <li v-for="item in job.requirements" :key="item" class="flex gap-3">
                <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-600"></span>
                <span class="leading-6">{{ item }}</span>
              </li>
            </ul>
          </section>
        </div>

        <!-- Bottom CTA strip -->
        <div class="mt-6 rounded-3xl bg-white p-6 ring-1 ring-gray-200">
          <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p class="text-sm font-semibold text-gray-900">Interessiert?</p>
              <p class="mt-1 text-sm text-gray-600">
                Bewerbe dich direkt oder speichere den Job für später.
              </p>
            </div>

            <div class="flex flex-wrap gap-2">
              <button type="button" class="btn btn-secondary">
                Speichern
              </button>
              <button type="button" class="btn btn-primary">
                Jetzt bewerben
              </button>
            </div>
          </div>
        </div>

      </section>
    </div>

  </div>

</template>

<script>
import { useJobStore } from '@/stores/jobs/jobs';

export default {
  name: "JobDetailPage",
  props: {
    id: {
      type: String,
      required: true
    }
  },
  computed: {
    jobStore() {
      return useJobStore();
    },
    job() {
      return this.jobStore.singleJob;
    },
    createdAtDE() {
      const date = this.job.createdAt ? this.job.createdAt.toDate() : new Date();
      return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' });
    },
    remoteLabel() {
      return this.job.remote ? "Remote möglich" : "Vor Ort";
    },
    backRoute() {
      if (this.$route.meta.previousRoute === '/') {
        return { name: 'home' };
      }
      if (this.$route.meta.previousRoute === '/jobs') {
        return { name: 'jobs' };
      }

      return { name: 'home' };
    }
  },

  async created() {
    const jobId = this.id;
    await this.jobStore.fetchJobById(jobId);
  },

};
</script>

<style scoped></style>