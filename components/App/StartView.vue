<script setup lang="ts">
const currentView = useCurrentView();
</script>

<template>
  <UContainer
    class="h-full max-w-max flex flex-col items-center justify-center space-y-4"
    as="main"
  >
    <div class="flex flex-col items-center space-y-1">
      <img src="~/assets/img/icon.svg" class="size-32" />
      <h1 class="text-3xl font-display text-neutral-200">Watch This!</h1>
    </div>
    <AppStartViewQuestions />

    <UButton
      class="w-full"
      label="Start"
      @click="currentView = 'questionnaire'"
      :ui="{ label: 'w-full text-center' }"
    />
  </UContainer>
</template>

<style scoped></style>
