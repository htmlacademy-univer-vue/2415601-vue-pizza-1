<template>
  <form
    action="test.html"
    method="post"
    class="layout-form"
    @submit.prevent="createOrder"
  >
    <main class="content cart">
      <div class="container">
        <div class="cart__title">
          <SectionTitle size="big">Корзина</SectionTitle>
        </div>

        <div v-if="!cartStore.getPizzas.length" class="sheet cart__empty">
          <p>В корзине нет ни одного товара</p>
        </div>
        <PizzaList
          v-else
          :pizzas="cartStore.getPizzas"
          @addPizza="cartStore.addPizza"
          @deletePizza="cartStore.deletePizza"
        />

        <MiscList
          :miscs="miscs"
          @addMisc="cartStore.addMisc"
          @deleteMisc="cartStore.deleteMisc"
        />

        <AddressForm
          :options="selectList"
          :address-option="addressOption"
          :address="address"
          @setAddressOption="setAddressOption"
          @setAddressInfo="setAddressInfo"
        />
      </div>
    </main>
    <section class="footer">
      <div class="footer__more">
        <router-link class="button button--border button--arrow" to="/">
          Хочу еще одну
        </router-link>
      </div>
      <p class="footer__text">
        Перейти к конструктору<br />чтоб собрать ещё одну пиццу
      </p>
      <div class="footer__price">
        <b>Итого: {{ cartStore.totalCartPrice }} ₽</b>
      </div>

      <div class="footer__submit">
        <button
          type="submit"
          class="button"
          :disabled="
            !cartStore.pizzas.length ||
            (addressOption > 0 &&
              (address.street === '' || address.building === ''))
          "
        >
          Оформить заказ
        </button>
      </div>
    </section>
  </form>
</template>

<script setup>
import { reactive, computed, ref } from "vue";
import { SectionTitle } from "../common/components";
import PizzaList from "../modules/cart/PizzaList.vue";
import MiscList from "../modules/cart/MiscList.vue";
import AddressForm from "../modules/cart/AddressForm.vue";
import {
  useCartStore,
  useProfileStore,
  useAuthStore,
  useDataStore,
} from "../stores";
import { useRouter } from "vue-router";

const router = useRouter();

const profileStore = useProfileStore();
const dataStore = useDataStore();
const cartStore = useCartStore();
const authStore = useAuthStore();

const miscs = computed(() => {
  return dataStore.misc;
});

const addressOption = ref(0);

const address = reactive({
  street: "",
  building: "",
  flat: "",
  phone: "",
});

const setAddressOption = (value) => {
  addressOption.value = value;

  if (value > 2) {
    // const name = selectList[value];
    const list = profileStore.addresses.map((address) => address.name);
    const llist = ["Заберу сам", "Новый адрес", ...list];
    //return ["Заберу сам", "Новый адрес", ...list];
    const name = llist[value];

    const addresss = profileStore.addresses.find(
      (address) => address.name === name
    );
    address.building = addresss.building;
    address.flat = addresss.flat;
    address.street = addresss.street;
  } else if (value === 0) {
    address.building = "";
    address.flat = "";
    address.street = "";
  }
};

const setAddressInfo = (category, value) => {
  address[category] = value;
};

const createOrder = () => {
  // let orderAddress = "";

  if (addressOption.value == 0) {
    address.building = "Заберу сам";
    address.flat = "Заберу сам";
    address.street = "Заберу сам";
  } else if (addressOption.value == 1) {
    profileStore.addAddress({
      name: `Адрес №${profileStore.addresses.length + 1}`,
      userId: authStore.user.id,
      street: address.street,
      building: address.building,
      flat: address.flat,
      comment: "",
    });
  }

  const order = {
    userId: authStore.user?.id ?? null,
    pizzas: cartStore.getFilteredPizzas,
    misc: cartStore.getFilteredMiscs,
    address: {
      street: address.street,
      building: address.building,
      flat: address.flat,
      comment: "",
    },
    phone: address.phone,
    //price: cartStore.totalCartPrice,
  };

  profileStore.addOrder(order);

  addressOption.value = 1;
  cartStore.clean();
  router.push("/success");
};

const selectList = computed(() => {
  const list = profileStore.addresses.map((address) => address.name);
  return ["Заберу сам", "Новый адрес", ...list];
});
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.layout-form {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}
.content {
  padding-top: 20px;
}

.container {
  width: 770px;
  margin: 0 auto;
}

.cart__title {
  margin-bottom: 15px;
}

.cart__additional {
  margin-top: 15px;
  margin-bottom: 25px;
}

.cart__empty {
  padding: 20px 30px;
}

.footer {
  display: flex;
  align-items: center;

  margin-top: auto;
  padding: 25px 2.12%;

  background-color: rgba($green-500, 0.1);
}

.footer__more {
  width: 220px;
  margin-right: 16px;

  a {
    padding-top: 16px;
    padding-bottom: 16px;
  }
}

.footer__text {
  @include l-s11-h13;

  color: rgba($black, 0.5);
}

.footer__price {
  @include b-s24-h28;

  margin-right: 12px;
  margin-left: auto;
}

.footer__submit {
  button {
    padding: 16px 14px;
  }
}
</style>
