<template>
  <app-layout>
    <router-view v-slot="{ Component, route }">
      <transition name="slide" mode="out-in">
        <div :key="route.name">
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
  </app-layout>
</template>

<script setup>
import { AppLayout } from "@/layouts";
import { useDataStore, useAuthStore } from "./stores";

const dataStore = useDataStore();
const authStore = useAuthStore();

dataStore.fetchdata();

authStore.whoAmI();
</script>

<style lang="scss">
@import "@/assets/scss/app.scss";
.slide-enter-active {
  transition: all 0.4s;
}
.slide-enter {
  opacity: 0;
  margin-left: 90px;
}
.slide-leave-active {
  transition: all 0.4s;
  opacity: 0;
  margin-left: -100px;
}
</style>
