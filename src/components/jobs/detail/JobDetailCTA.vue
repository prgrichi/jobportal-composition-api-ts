<template>
  <!-- Job Detail CTA Section -->
  <div class="mt-6 rounded-3xl bg-background p-6 ring-1 ring-ring">
    <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm: justify-between">

      <!-- CTA Text -->
      <div>
        <p class="text-sm font-semibold text-foreground">
          Interessiert?
        </p>
        <p class="mt-1 text-sm text-muted-foreground">
          Bewerbe dich direkt oder speichere den Job für später.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-wrap gap-2">
        <!-- Save Button -->
        <button type="button" class="btn btn-secondary" @click="$emit('save')">
          Speichern
        </button>

        <!-- Apply Button -->
        <button type="button" class="btn btn-primary" @click="$emit('apply')">
          Bewerben
        </button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'JobDetailCTA',

  emits: ['save', 'apply']
}
</script>