<template>
    <ul class="cart-list sheet">
      <li v-for="pizza in pizzas" :key="pizza.id" class="cart-list__item">
        <div class="product cart-list__product">
          <img
            src="@/assets/img/product.svg"
            class="product__img"
            width="56"
            height="56"
            :alt="pizza.name"
          />
          <div class="product__text">
            <h2>{{ pizza.name }}</h2>
            <ul>
              <li>{{ pizza.size.name }}, {{ pizza.dough.name }}</li>
              <li>Соус: {{ pizza.sauce.name }}</li>
              <li>Начинка: {{ pizza.ingredientsString }}</li>
            </ul>
          </div>
        </div>
        <AppCounter
          class="cart-list__counter"
          :count="pizza.quantity"
          :orange="true"
          :max="10"
          @decrement="decrement(pizza.id, pizza.quantity - 1)"
          @increment="increment(pizza, pizza.quantity + 1)"
        />
        <div class="cart-list__price">
          <b>{{ pizza.price * pizza.quantity }}</b>
        </div>
        <div class="cart-list__button">
          <router-link :to="`/${pizza.id}`" class="cart-list__edit"
            >Изменить</router-link
          >
        </div>
      </li>
    </ul>
  </template>
  <script setup>
  import { AppCounter } from "@/common/components";
  defineProps({
    pizzas: {
      type: Array,
      required: true,
    },
  });
  const emits = defineEmits(["addPizza, deletePizza"]);
  const decrement = (id) => {
    emits("deletePizza", id);
  };
  const increment = (pizza) => {
    emits("addPizza", pizza);
  };
  </script>
  <style lang="scss" scoped>
  @import "@/assets/scss/app.scss";
  .cart-list {
    @include clear-list;
    padding: 15px 0;
  }
  .cart-list__item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
    padding-right: 15px;
    padding-bottom: 15px;
    padding-left: 15px;
    border-bottom: 1px solid rgba($green-500, 0.1);
    &:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }
  }
  .cart-list__product {
    flex-grow: 1;
    margin-right: auto;
  }
  .cart-list__counter {
    width: 54px;
    margin-right: auto;
    margin-left: 20px;
  }
  .cart-list__price {
    min-width: 100px;
    margin-right: 36px;
    margin-left: 10px;
    text-align: right;
    b {
      @include b-s16-h19;
    }
  }
  .cart-list__edit {
    @include l-s11-h13;
    cursor: pointer;
    transition: 0.3s;
    border: none;
    outline: none;
    background-color: transparent;
    &:hover {
      color: $green-500;
    }
    &:active {
      color: $green-600;
    }
    &:focus {
      color: $green-400;
    }
  }
  </style>
  