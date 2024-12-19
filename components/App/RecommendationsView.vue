<script lang="ts" setup>
import { ref } from "vue";

const currentIndex = ref(0);
const movies = ref([]);

const prevCard = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};
const nextCard = () => {
  if (currentIndex.value < movies.value.length - 1) currentIndex.value++;
};

const getRecommendations = async () => {
  movies.value = await $fetch("/api/recommend", {
    method: "post",
  });
};

const getPosterURL = (posterPath: string) => {
  return `https://image.tmdb.org/t/p/w300${posterPath}`;
};
</script>

<template>
  <div class="carousel">
    <div class="carousel-container">
      <div
        class="card"
        v-for="(movie, index) in movies"
        :key="movie.id"
        :class="{ active: index === currentIndex }"
      >
        <img
          :src="getPosterURL(movie.posterPath)"
          alt="Poster Image"
          class="poster"
        />
        <h2 class="text-lg">
          {{ movie.title }} ({{ new Date(movie.releaseDate).getFullYear() }})
        </h2>
        <p class="font-light text-sm">{{ movie.genre.join(", ") }}</p>
        <p class="text-sm italic">{{ movie.overview }}</p>
      </div>
    </div>

    <div class="carousel-controls">
      <button @click="prevCard" :disabled="currentIndex === 0">Previous</button>
      <button @click="nextCard" :disabled="currentIndex === movies.length - 1">
        Next
      </button>
      <button @click="getRecommendations">Get Recommendations</button>
    </div>
  </div>
</template>

<style scoped>
.carousel {
  @apply w-72 m-auto overflow-hidden;
}

.carousel-container {
  @apply relative flex motion-safe:transition;
  transform: translateX(calc(-100% * v-bind("currentIndex")));
}

.card {
  @apply min-w-full space-y-1 text-white p-4 bg-popchoice-blue-lite rounded-lg shadow-lg motion-safe:transition motion-safe:scale-90 motion-safe:transition-opacity opacity-0;
}

.card.active {
  @apply motion-safe:transition-opacity opacity-100 motion-safe:scale-100;
}

.carousel-controls {
  @apply mt-4 flex justify-center space-x-8;
}

button {
  @apply w-24 p-4 rounded-lg bg-popchoice-green;
}

button:disabled {
  @apply opacity-25;
}

.poster {
  @apply w-full h-auto;
}
</style>
