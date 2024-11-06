<template>
  <div class="layout__sidebar sidebar">
    <router-link to="/" class="logo layout__logo">
      <img
        src="../assets/img/logo.svg"
        alt="V!U!E! Pizza logo"
        width="90"
        height="40"
      />
    </router-link>

    <router-link
      class="layout__link"
      :class="{ 'layout__link--active': $route.path === '/user/orders' }"
      to="/user/orders"
      >История заказов</router-link
    >

    <router-link
      class="layout__link"
      :class="{ 'layout__link--active': $route.path === '/user/profile' }"
      to="/user/profile"
      >Мои данные</router-link
    >
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/scss/app.scss";
.logo {
  display: block;

  img {
    display: block;

    width: 90px;
    height: 40px;
  }
}
</style>
