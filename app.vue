<script setup lang="ts">
import { ref } from "vue";

const currentView = useCurrentView();
const userInput = useUserInput();
</script>

<template>
  <UApp>
    <UContainer class="h-full bg-midnight flex flex-col">
      <AppHeader />
      <AppStartView v-if="currentView === 'start'" />
      <AppQuestionnaire v-if="currentView === 'questionnaire'" />
      <AppRecommendations v-if="currentView === 'recommendations'" />
      <AppFooter />
    </UContainer>
  </UApp>
</template>
