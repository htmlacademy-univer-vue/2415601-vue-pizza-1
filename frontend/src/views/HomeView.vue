<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <SectionTitle size="big">Конструктор пиццы</SectionTitle>
        <DoughComp
          v-model="pizzaStore.dough"
          :normalized-doughs="dataStore.dough"
        />

        <SizeComp
          v-model="pizzaStore.size"
          :normalized-sizes="dataStore.sizes"
        />

        <div class="content__ingredients">
          <SheetCard class="ingredients">
            <template #title>Выберите ингредиенты</template>
            <SauceComp
              v-model="pizzaStore.sauce"
              :normalized-sauces="dataStore.sauce"
            />
            <IngredientsComp
              :normalized-ingredients="dataStore.ingredients"
              :selected-ingredients="pizzaStore.ingredients"
              @upgradeIngredientAmount="pizzaStore.upgradeIngredientAmount"
            />
          </SheetCard>
        </div>
        <PizzaComp
          v-model="pizzaStore.name"
          :sauce="pizzaStore.sauce"
          :dough="pizzaStore.dough"
          :ingredients="pizzaStore.ingredients"
          :price="pizzaStore.totalPizzaPrice"
          :disabled-button="buttonDisabled"
          @addIngredient="pizzaStore.addIngredient"
          @addPizza="addPizza"
        />
      </div>
    </form>
  </main>
</template>

<script setup>
import { computed } from "vue";

import {
  // общие компоненты
  SheetCard,
  SectionTitle,
} from "../common/components";

import {
  DoughComp,
  SizeComp,
  SauceComp,
  IngredientsComp,
  PizzaComp,
} from "../modules/constructor"; // компоненты конструктора пиццы

import { useDataStore, usePizzaStore, useCartStore } from "../stores";
import { useRoute } from "vue-router";
const cartStore = useCartStore();
const dataStore = useDataStore();
const pizzaStore = usePizzaStore();
const route = useRoute();
const { id } = route.params;

if (id)
  pizzaStore.setPizzaState(cartStore.pizzas.find((pizza) => pizza.id === +id));
else
  pizzaStore.setPizzaState({
    id: Math.random(),
    name: "",
    dough: dataStore.dough[0],
    size: dataStore.sizes[0],
    sauce: dataStore.sauce[0],
    ingredients: [],
  });

const addPizza = () => {
  if (id) {
    cartStore.editPizza(pizzaStore.getPizzaInfo);
  } else {
    cartStore.addPizza(pizzaStore.getPizzaInfo);
  }
};

const buttonDisabled = computed(() => {
  return pizzaStore.name === "" || pizzaStore.ingredients.length === 0;
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>
