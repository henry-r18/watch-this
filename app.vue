<script setup lang="ts">
import { ref } from "vue";

const currentView = ref("start");
const userInput = useUserInput();
</script>

<template>
  <UApp class="h-full flex flex-col bg-popchoice-blue">
    <AppHeader />
    <p class="text-white">{{ userInput }}</p>
    <AppStartView
      class="grow"
      v-if="currentView === 'start'"
      @startButtonClicked="currentView = 'questionnaire'"
    />
    <AppMovieQuestionnaire
      v-if="currentView === 'questionnaire'"
      @recommendButtonClicked="currentView = 'recommendations'"
    />
    <AppRecommendationsView v-if="currentView === 'recommendations'" />
    <AppFooter />
  </UApp>
</template>
