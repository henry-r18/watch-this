<script setup lang="ts">
import { ref } from "vue";
const currentView = ref("start");

const recommendations = ref([
  {
    id: 0,
    title: "The Shawshank Redemption",
    release_year: "1994",
    genre: "Drama",
    plot_summary:
      "Two prisoners, Andrew and Red, form an unlikely friendship while serving time at Shawshank State Penitentiary.",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
  },
  {
    id: 1,
    title: "The Godfather",
    release_year: "1972",
    genre: "Crime",
    plot_summary:
      "Don Vito Corleone, the head of a powerful crime family, must protect his family's business from a rival gang.",
    poster: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
  },
  {
    id: 2,
    title: "The Dark Knight",
    release_year: "2008",
    genre: "Superhero",
    plot_summary:
      "When the death of his parents leaves him a rich man, Bruce Wayne uses his fortune to gain superpowers and fight against evil.",
    poster:
      "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg",
  },
]); // this is testing data
</script>

<template>
  <div class="h-full flex flex-col bg-popchoice-blue">
    <AppHeader />
    <AppStartView
      class="grow"
      v-if="currentView === 'start'"
      @startButtonClicked="currentView = 'questionnaire'"
    />
    <AppMovieQuestionnaire
      v-if="currentView === 'questionnaire'"
      @recommendButtonClicked="currentView = 'recommendations'"
    />
    <AppRecommendationsView
      v-if="currentView === 'recommendations'"
      :movies="recommendations"
    />
    <AppFooter />
  </div>
</template>
