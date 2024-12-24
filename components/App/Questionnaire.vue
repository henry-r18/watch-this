<script setup lang="ts">
const currentView = useCurrentView();
const userInput = useUserInput();

const prefersRecentItems = ["Recent", "Classic"];
const keywordItems = [
  "Funny",
  "Cerebral",
  "Scary",
  "Inspiring",
  "Romantic",
  "Weird",
  "Thrilling",
];
</script>

<template>
  <UContainer
    class="h-full max-w-max flex flex-col items-center justify-center space-y-4"
    as="main"
  >
    <UButton
      class="self-start"
      leading-icon="i-lucide-arrow-left"
      color="secondary"
      variant="outline"
      @click="currentView = 'start'"
    />

    <UFormField
      class="space-y-2 w-full"
      label="What's your favorite movie and why?"
      name="favoriteMovieInput"
    >
      <UTextarea
        class="w-full"
        v-model="userInput.favoriteMovie"
        color="secondary"
      />
    </UFormField>

    <UFormField
      class="space-y-2 w-full"
      label="Who's your favorite actor?"
      name="favoriteActorInput"
    >
      <UTextarea
        class="w-full"
        v-model="userInput.favoriteActor"
        color="secondary"
      />
    </UFormField>

    <UFormField
      class="space-y-2"
      label="Do you prefer something recent or a classic?"
      name="prefersRecentInput"
    >
      <URadioGroup
        v-model="userInput.prefersRecent"
        :items="prefersRecentItems"
        color="secondary"
        orientation="horizontal"
      ></URadioGroup>
    </UFormField>

    <UFormField
      class="space-y-2 w-full"
      label="Which of the following match your mood?"
      name="keywordInput"
    >
      <USelect
        class="w-full min-h-8"
        :items="keywordItems"
        v-model="userInput.keywords"
        color="secondary"
        multiple
      ></USelect>
    </UFormField>

    <UButton
      class="w-full"
      label="Recommend something!"
      @click="currentView = 'recommendations'"
      :ui="{ label: 'w-full text-center' }"
    />
  </UContainer>
</template>

<style scoped></style>
