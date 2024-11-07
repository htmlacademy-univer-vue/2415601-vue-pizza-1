<template>
  <transition name="fade" mode="out-in">
    <div v-if="status" class="layout__address">
      <form
        action="test.html"
        method="post"
        class="address-form address-form--opened sheet"
        @submit.prevent="emits('save')"
      >
        <div class="address-form__header">
          <b>{{ getIdAndName(addressParams.id, addressParams.name) }}</b>
        </div>

        <div class="address-form__wrapper">
          <div class="address-form__input">
            <label class="input">
              <span>Название адреса*</span>
              <input
                :value="addressParams.name"
                type="text"
                name="addr-name"
                placeholder="Введите название адреса"
                required
                @input="emits('setAddressInfo', 'name', $event.target.value)"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--normal">
            <label class="input">
              <span>Улица*</span>
              <input
                :value="addressParams.street"
                type="text"
                name="addr-street"
                placeholder="Введите название улицы"
                required
                @input="emits('setAddressInfo', 'street', $event.target.value)"
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Дом*</span>
              <input
                :value="addressParams.building"
                type="text"
                name="addr-house"
                placeholder="Введите номер дома"
                required
                @input="
                  emits('setAddressInfo', 'building', $event.target.value)
                "
              />
            </label>
          </div>
          <div class="address-form__input address-form__input--size--small">
            <label class="input">
              <span>Квартира</span>
              <input
                :value="addressParams.flat"
                type="text"
                name="addr-apartment"
                placeholder="Введите № квартиры"
                @input="emits('setAddressInfo', 'flat', $event.target.value)"
              />
            </label>
          </div>
          <div class="address-form__input">
            <label class="input">
              <span>Комментарий</span>
              <input
                type="text"
                name="addr-comment"
                placeholder="Введите комментарий"
                :value="addressParams.comment"
                @input="emits('setAddressInfo', 'comment', $event.target.value)"
              />
            </label>
          </div>
        </div>

        <div class="address-form__buttons">
          <button
            v-if="actionType == 'edit'"
            type="button"
            class="button button--transparent"
            @click="emits('delete')"
          >
            Удалить
          </button>
          <button type="submit" class="button">Сохранить</button>
        </div>
      </form>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  status: {
    type: Boolean,
    required: true,
  },
  addressParams: {
    type: Object,
    required: true,
  },
  actionType: {
    type: String,
    required: true,
  },
});
const emits = defineEmits(["save", "delete", "setAddressInfo"]);
const getIdAndName = (id, name) => {
  return `Адрес №${id}. ${name}`;
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.address-form {
  $bl: &;

  position: relative;

  padding-top: 0;
  padding-bottom: 26px;

  &--opened {
    #{$bl}__header {
      padding: 16px;
    }
  }

  p {
    @include r-s16-h19;

    margin-top: 0;
    margin-bottom: 16px;
    padding: 0 16px;
  }

  small {
    @include l-s11-h13;

    display: block;

    padding: 0 16px;
  }
}

.address-form__wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 80%;
  padding: 16px;
}

.address-form__input {
  width: 100%;
  margin-bottom: 16px;

  &--size {
    &--normal {
      width: 60.5%;
    }

    &--small {
      width: 18%;
    }
  }
}

.address-form__buttons {
  display: flex;
  justify-content: flex-end;

  padding: 0 16px;

  button {
    margin-left: 16px;
    padding: 16px 27px;
  }
}

.address-form__header {
  @include b-s14-h16;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 21px;
  padding: 10px 16px;

  border-bottom: 1px solid rgba($green-500, 0.1);
}

.icon {
  display: block;
  overflow: hidden;

  width: 32px;
  height: 32px;

  transition: 0.3s;

  border: none;
  border-radius: 50%;
  outline: none;
  background-color: $white;
  background-image: url("@/assets/img/edit.svg");
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    box-shadow: $shadow-light;
  }

  &:active {
    box-shadow: $shadow-large;
  }

  &:focus {
    box-shadow: $shadow-regular;
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
