<template>
  <div>
    <div class="max-w-app mx-auto">
      <!-- Header -->
      <ProfileHeader :title="$t('profile.title')" :subtitle="$t('profile.subtitle')" />

      <!-- Loading State -->
      <div v-if="loading" class="text-center py-20">
        <p class="text-muted-foreground">{{ $t('general.loading') }}</p>
      </div>

      <!-- Profile Content -->
      <div v-else>
        <!-- View Mode -->
        <ProfileView
          v-if="!isEditing"
          :profile="profile"
          :display-name="displayName"
          :edit-button-text="$t('general.btn.edit')"
          @edit="startEdit"
        />

        <!-- Edit Mode -->
        <ProfileEdit
          v-else
          :profile="profile"
          :is-saving="isSaving"
          :title="$t('profile.editProfile')"
          :save-button-text="isSavingLabel"
          :cancel-button-text="$t('general.btn.cancel')"
          @save="save"
          @cancel="cancel"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useProfileStore } from '@/stores/user/profile';
import { useAuthStore } from '@/stores/auth/auth';
import { useToastStore } from '@/stores/toast/toast';
import { useI18n } from 'vue-i18n';
import ProfileHeader from './ProfileHeader.vue';
import ProfileView from './ProfileView.vue';
import ProfileEdit from './ProfileEdit.vue';

const isEditing = ref(false);
const isSaving = ref(false);

const { t } = useI18n();

const profileStore = useProfileStore();
const authStore = useAuthStore();
const toast = useToastStore();

const loading = computed(() => profileStore.loading);
const profile = computed(() => profileStore.profile || {});
const isSavingLabel = computed(() => {
  return isSaving.value ? t('general.btn.ui.saving') : t('general.btn.ui.save');
});
const displayName = computed(() => {
  const first = profile.value.firstName || '';
  const last = profile.value.lastName || '';
  const name = `${first} ${last}`.trim();
  return name || 'Unbekannt';
});

const startEdit = () => {
  isEditing.value = true;
};

const cancel = () => {
  isEditing.value = false;
  isSaving.value = false;
};

const save = async editData => {
  isSaving.value = true;

  const result = await profileStore.updateProfile(authStore.user.uid, editData);

  isSaving.value = false;

  if (result.success) {
    isEditing.value = false;
    toast.success(t('toast.profileSuccess'));
  } else {
    toast.error(t('toast.profileError'));
  }
};

onMounted(() => {
  if (authStore.user) {
    profileStore.loadProfile(authStore.user.uid);
  }
});
</script>
