<script lang="ts" setup>
import { type Recommendations } from "~/server/api/recommend.post";

const currentView = useCurrentView();
const userInput = useUserInput();
const recommendations: Ref<Recommendations> = useRecommendations();

const getPosterURL = (posterPath: string) => {
  return `https://image.tmdb.org/t/p/w300${posterPath}`;
};

const loopAnimation = () => {
  const element = document.querySelector(".animate__tada");
  element?.classList.remove("animate__tada");

  const addAnimationClass = () => element?.classList.add("animate__tada");
  setTimeout(addAnimationClass, 1000);
};

const onBeforeEnter = (el: Element) => el.classList.add("animate__animated");

const onEnter = (el: Element, done: any) => {
  el.classList.add("animate__fadeIn");
  el.addEventListener("animationend", done);
};

const onLeave = (el: Element, done: any) => {
  el.classList.add("animate__fadeOut");
  el.addEventListener("animationend", done);
};

onMounted(async () => {
  if (!recommendations.value.length) {
    recommendations.value = await $fetch("/api/recommend", {
      method: "post",
      body: userInput.value,
    });
  }
});
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
      @click="currentView = 'questionnaire'"
    />

    <h2 class="text-lg font-display text-neutral-200">
      {{
        recommendations.length
          ? "You might like..."
          : "Coming up with some recommendations..."
      }}
    </h2>

    <Transition @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <div
        id="placeholder"
        class="space-y-8 flex flex-col"
        v-if="!recommendations.length"
      >
        <img
          class="self-center animate__animated animate__tada"
          src="~/assets/img/icon.svg"
          @animationend="loopAnimation"
        />
        <div class="grid gap-4">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[200px]" />
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>

      <UCarousel
        class="w-full max-w-xs mx-auto"
        v-slot="{ item }"
        :items="recommendations"
        arrows
        v-else-if="recommendations.length"
      >
        <UCard
          :ui="{
            root: 'ring-0 mx-auto bg-transparent w-70 border-none rounded-none',
            header: 'p-0 border-none',
          }"
        >
          <template #header>
            <NuxtImg
              class="w-full border-2 border-secondary-200 rounded-lg shadow-lg shadow-secondary-500"
              :src="getPosterURL(item.posterPath)"
              placeholder="/icon.svg"
            />
          </template>

          <div class="text-neutral-200">
            <h2 class="text-lg">
              {{ item.title }} ({{ new Date(item.releaseDate).getFullYear() }})
            </h2>
            <p class="font-light text-sm">{{ item.genres }}</p>
            <p class="text-sm italic">{{ item.overview }}</p>
          </div>
        </UCard>
      </UCarousel>
    </Transition>
  </UContainer>
</template>

<style></style>
