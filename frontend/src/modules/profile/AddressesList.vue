<template>
  <div class="layout__address">
    <div
      v-for="address in addresses"
      :key="address.id"
      class="sheet address-form"
    >
      <div class="address-form__header">
        <b>Адрес №{{ address.id }}. {{ address.name }}</b>
        <div class="address-form__edit">
          <button
            type="button"
            class="icon"
            @click="emits('openForm', 'edit', address)"
          >
            <span class="visually-hidden">Изменить адрес</span>
          </button>
        </div>
      </div>
      <p>{{ address.street }}, {{ address.building }}, {{ address.flat }}</p>
      <small>{{ address.comment }}</small>
    </div>
  </div>
</template>

<script setup>
defineProps({
  addresses: {
    type: Array,
    required: true,
  },
});
const emits = defineEmits(["openForm"]);
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
</style>
