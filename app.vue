<script setup lang="ts">
import { ref } from "vue";
const currentView = ref("start");
</script>

<template>
  <div class="h-full flex flex-col bg-popchoice-blue">
    <AppHeader />
    <AppStartView
      class="grow"
      v-if="currentView === 'start'"
      @startButtonClicked="currentView = 'questionnaire'"
    />
    <AppMovieQuestionnaire v-if="currentView === 'questionnaire'" />
    <AppFooter />
  </div>
</template>
