<template>
  <!-- <transition name="fade" mode="out-in"> -->
  <div class="popup">
    <router-link
      :to="
        authStore.user !== null ? { name: 'OrdersView' } : { name: 'HomeView' }
      "
      class="close"
    >
      <span class="visually-hidden">Закрыть попап</span>
    </router-link>
    <div class="popup__title">
      <h2 class="title">Спасибо за заказ</h2>
    </div>
    <p>Мы начали готовить Ваш заказ, скоро привезём его вам ;)</p>
    <div class="popup__button">
      <router-link
        :to="
          authStore.user !== null
            ? { name: 'OrdersView' }
            : { name: 'HomeView' }
        "
        class="button"
        >Отлично, я жду!</router-link
      >
    </div>
  </div>
  <!-- </transition> -->
</template>

<script setup>
import { useAuthStore } from "../stores";
const authStore = useAuthStore();
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.popup {
  @include pf_center-all;

  z-index: 10;

  display: block;

  box-sizing: border-box;
  width: 420px;
  padding: 64px 95px;

  background-color: $white;
  box-shadow: $shadow-light;

  &::before,
  &::after {
    position: absolute;

    width: 48px;
    height: 48px;

    content: "";

    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  &::before {
    top: 15px;
    left: 15px;

    background-image: url("@/assets/img/filling/ananas.svg");
  }

  &::after {
    right: 15px;
    bottom: 15px;

    background-image: url("@/assets/img/filling/tomatoes.svg");
  }

  p {
    margin-top: 24px;
    margin-bottom: 24px;

    text-align: center;
  }
}

.popup__title {
  text-align: center;

  font-size: 1.3em;
}

.popup__button {
  a {
    padding: 16px 32px;
  }
}

// .fade-enter-active {
//   animation: fadeIn 0.5s;
// }
// /* Анимация исчезновения */
// .fade-leave-active {
//   animation: fadeOut 0.5s;
// }
// /* CSS-правила для анимации */
// @keyframes fadeIn {
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// }
// @keyframes fadeOut {
//   from {
//     opacity: 1;
//   }
//   to {
//     opacity: 0;
//   }
// }
</style>
