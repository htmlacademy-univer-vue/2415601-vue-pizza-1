<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <SectionTitle size="big">История заказов</SectionTitle>
      </div>

      <section
        v-for="order in profileStore.orders"
        :key="order.id"
        class="sheet order"
      >
        <div class="order__wrapper">
          <div class="order__number">
            <b>Заказ #{{ order.id }}</b>
          </div>

          <div class="order__sum">
            <span
              >Сумма заказа:
              {{ getTotalOrderPrice(order.orderPizzas, order.orderMisc) }}
              ₽</span
            >
          </div>

          <div class="order__button">
            <button
              type="button"
              class="button button--border"
              @click="profileStore.deleteOrder(order.id)"
            >
              Удалить
            </button>
          </div>
          <div class="order__button">
            <button
              type="button"
              class="button"
              @click="
                profileStore.addOrder({
                  userId: authStore.user.id,
                  pizzas: getFilteredPizzasOfOrder(order),
                  misc: getFilteredMiscsOfOrder(order),
                  address: {
                    street: order.orderAddress.street,
                    building: order.orderAddress.building,
                    flat: order.orderAddress.flat,
                    comment: order.orderAddress.comment,
                  },
                  phone: order.phone,
                })
              "
            >
              Повторить
            </button>
          </div>
        </div>

        <transition-group name="fade" tag="ul" class="order__list">
          <li
            v-for="pizza in order.orderPizzas"
            :key="pizza.id"
            class="order__item"
          >
            <div class="product">
              <img
                src="../assets/img/product.svg"
                class="product__img"
                width="56"
                height="56"
                :alt="pizza.name"
              />
              <div class="product__text">
                <h2>{{ pizza.name }}</h2>
                <ul>
                  <li>
                    {{ getSizeNameById(pizza.sizeId) }},
                    {{ getDoughNameById(pizza.doughId) }}
                  </li>
                  <li>Соус: {{ getSauceNameById(pizza.sauceId) }}</li>
                  <li>
                    {{ getIngredientString(pizza.ingredients) }}
                  </li>
                </ul>
              </div>
            </div>

            <p class="order__price">
              {{
                priceString(
                  pizza.quantity,
                  getPizzaPrice(
                    pizza.sauceId,
                    pizza.sizeId,
                    pizza.doughId,
                    pizza.ingredients
                  )
                )
              }}
            </p>
          </li>
        </transition-group>

        <ul class="order__additional">
          <li v-for="misc in order.orderMisc" :key="misc.id">
            <img
              :src="getMiscImgById(misc.miscId)"
              width="20"
              height="30"
              :alt="misc.miscId"
            />
            <p>
              <span>{{ getMiscNameById(misc.miscId) }}</span>
              <b>{{ getMiscPriceById(misc.miscId) }} ₽ X {{ misc.quantity }}</b>
            </p>
          </li>
        </ul>

        <p class="order__address">
          Адрес доставки: {{ getAddressString(order.orderAddress) }}
        </p>
      </section>
    </div>
  </main>
</template>

<script setup>
import { SectionTitle } from "../common/components";
import { useProfileStore, useDataStore, useAuthStore } from "../stores";
import {
  getImageUrl,
  getFilteredPizzasOfOrder,
  getFilteredMiscsOfOrder,
} from "@/common/helpers";
const profileStore = useProfileStore();
const dataStore = useDataStore();
const authStore = useAuthStore();

const priceString = (price, quantity) => {
  return `${quantity} x ${price} ₽`;
};

const getAddressString = (address) => {
  return `ул. ${address?.street}, дом ${address?.building}, кв. ${address?.flat}`;
};

const getPizzaPrice = (sauceId, sizeId, doughId, ingredients) => {
  const saucePrice = dataStore.sauce.find(
    (sauce) => sauce.id === sauceId
  ).price;
  const sizeMultiplier = dataStore.sizes.find(
    (size) => size.id === sizeId
  ).multiplier;
  const doughPrice = dataStore.dough.find(
    (dough) => dough.id === doughId
  ).price;

  let ingredientsPrice = 0;
  ingredients.map((ing) => {
    dataStore.ingredients.map((ingg) => {
      if (ingg.id === ing.ingredientId)
        ingredientsPrice = ingredientsPrice + ing.quantity * ingg.price;
    });
  });

  return (ingredientsPrice + saucePrice + doughPrice) * sizeMultiplier;
};

const getIngredientString = (ingredients) => {
  let ingredientsString = "";
  ingredients.map((item) => {
    dataStore.ingredients.map((dataItem) => {
      if (dataItem.id === item.ingredientId)
        ingredientsString = ingredientsString + dataItem.name + ", ";
    });
  });
  return ingredientsString;
};

const getSizeNameById = (id) => {
  return dataStore.sizes.find((size) => size.id === id).name;
};

const getSauceNameById = (id) => {
  return dataStore.sauce.find((sauce) => sauce.id === id).name;
};

const getDoughNameById = (id) => {
  return dataStore.dough.find((dough) => dough.id === id).name;
};

const getMiscNameById = (id) => {
  return dataStore.misc.find((dough) => dough.id === id).name;
};

const getMiscPriceById = (id) => {
  return dataStore.misc.find((dough) => dough.id === id).price;
};

const getMiscImgById = (id) => {
  const image = dataStore.misc.find((dough) => dough.id === id).image;
  return getImageUrl(image);
};

const getTotalOrderPrice = (pizzas, miscs) => {
  let pizzasPrice = 0;
  let miscsPrice = 0;
  pizzas.map(
    (pizza) =>
      (pizzasPrice =
        pizzasPrice +
        getPizzaPrice(
          pizza.sauceId,
          pizza.sizeId,
          pizza.doughId,
          pizza.ingredients
        ) *
          pizza.quantity)
  );
  if (miscs)
    miscs.map(
      (misc) =>
        (miscsPrice =
          miscsPrice + misc.quantity * getMiscPriceById(misc.miscId))
    );
  return pizzasPrice + miscsPrice;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.order {
  margin-bottom: 32px;
  padding-top: 0;
}

.order__wrapper {
  display: flex;
  align-items: center;

  padding: 6px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);

  b {
    @include b-s14-h16;
  }

  span {
    @include b-s14-h16;
  }

  button {
    padding: 8px 26px;
  }
}

.order__number {
  margin-right: auto;
}

.order__sum {
  margin-right: 16px;
}

.order__button {
  margin-left: 16px;
}

.order__list {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-top: 24px;
  padding-right: 10px;
  padding-left: 10px;
}

.order__item {
  display: flex;

  width: 310px;
  margin-right: 33px;
  margin-bottom: 32px;
}

.order__price {
  @include b-s16-h19;

  margin: 0;

  white-space: nowrap;
}

.order__additional {
  @include clear-list;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  margin-bottom: 5px;
  padding-left: 80px;

  li {
    @include b-s11-h16;

    width: 130px;
    margin-right: 24px;
    margin-bottom: 10px;
  }

  p {
    margin: 0;
  }

  img {
    float: left;

    margin-right: 7px;
  }

  b {
    display: block;
  }
}

.order__address {
  @include l-s11-h13;

  margin: 0;
  padding: 16px 10px;

  border-top: 1px solid rgba($green-500, 0.1);
}

.fade-enter-active {
  animation: fadeIn 0.5s;
}
/* Анимация исчезновения */
.fade-leave-active {
  animation: fadeOut 0.5s;
}
/* CSS-правила для анимации */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
