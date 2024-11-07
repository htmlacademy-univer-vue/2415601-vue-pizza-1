<template>
  <div class="cart__form">
    <div class="cart-form">
      <label class="cart-form__select">
        <span class="cart-form__label">Получение заказа:</span>

        <select
          name="test"
          class="select"
          @input="emit('setAddressOption', $event.target.value)"
        >
          <option
            v-for="(option, index) in options"
            :key="option"
            :value="index"
          >
            {{ option }}
          </option>
        </select>
      </label>

      <label class="input input--big-label">
        <span>Контактный телефон:</span>
        <input
          type="text"
          name="tel"
          placeholder="+7 999-999-99-99"
          :value="address.phone"
          @input="emit('setAddressInfo', 'phone', $event.target.value)"
        />
      </label>

      <transition name="fade" mode="out-in">
        <div v-if="addressOption > 0" class="cart-form__address">
          <span class="cart-form__label">Новый адрес:</span>

          <div class="cart-form__input">
            <label class="input">
              <span>Улица*</span>
              <input
                type="text"
                name="street"
                required="true"
                :value="address.street"
                @input="emit('setAddressInfo', 'street', $event.target.value)"
              />
            </label>
          </div>

          <div class="cart-form__input cart-form__input--small">
            <label class="input">
              <span>Дом*</span>
              <input
                type="text"
                name="house"
                required="true"
                :value="address.building"
                @input="emit('setAddressInfo', 'building', $event.target.value)"
              />
            </label>
          </div>

          <div class="cart-form__input cart-form__input--small">
            <label class="input">
              <span>Квартира</span>
              <input
                type="text"
                name="apartment"
                required="false"
                :value="address.flat"
                @input="emit('setAddressInfo', 'flat', $event.target.value)"
              />
            </label>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
defineProps({
  options: {
    type: Array,
    required: true,
  },
  addressOption: {
    type: Number,
    required: true,
  },
  address: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["setAddressOption", "setAddressInfo"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.cart-form {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.cart-form__select {
  display: flex;
  align-items: center;

  margin-right: auto;

  span {
    margin-right: 16px;
  }
}

.cart-form__label {
  @include b-s16-h19;

  white-space: nowrap;
}

.cart-form__address {
  display: flex;
  align-items: center;

  width: 100%;
  margin-top: 20px;
}

.cart-form__input {
  flex-grow: 1;

  margin-bottom: 20px;
  margin-left: 16px;

  &--small {
    max-width: 120px;
  }
}

.select {
  @include r-s16-h19;

  display: block;

  margin: 0;
  padding: 8px 16px;
  padding-right: 30px;

  cursor: pointer;
  transition: 0.3s;

  color: $black;
  border: 1px solid $purple-400;
  border-radius: 8px;
  outline: none;
  background-color: $silver-100;
  background-image: url("@/assets/img/select.svg");
  background-repeat: no-repeat;
  background-position: right 8px center;

  font-family: inherit;

  appearance: none;

  &:hover {
    border-color: $orange-100;
  }

  &:focus {
    border-color: $green-500;
  }
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
