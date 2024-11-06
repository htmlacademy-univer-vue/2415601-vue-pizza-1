<template>
  <main class="layout">
    <div class="layout__content">
      <div class="layout__title">
        <SectionTitle size="big">Мои данные</SectionTitle>
      </div>

      <div class="user">
        <picture>
          <source
            type="image/webp"
            srcset="
              @/assets/img/users/user5@2x.webp 1x,
              @/assets/img/users/user5@4x.webp 2x
            "
          />
          <img
            src="@/assets/img/users/user5@2x.jpg"
            srcset="@/assets/img/users/user5@4x.jpg"
            :alt="authStore.user.name"
            width="72"
            height="72"
          />
        </picture>
        <div class="user__name">
          <span>{{ authStore.user.name }}</span>
        </div>
        <p class="user__phone">
          Контактный телефон: <span>{{ authStore.user.phone }}</span>
        </p>
      </div>

      <AddressesList :addresses="profileStore.addresses" @openForm="openForm" />

      <AddressForm
        :status="opened"
        :address-params="addressParams"
        :action-type="actionType"
        @save="save"
        @delete="deletee(addressParams.id)"
        @setAddressInfo="setValueAddress"
      />

      <div class="layout__button">
        <button
          type="button"
          class="button button--border"
          @click="openForm('add', {})"
        >
          Добавить новый адрес
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { SectionTitle } from "../common/components";
import { useProfileStore, useAuthStore } from "../stores";
import { reactive, ref } from "vue";
import AddressesList from "../modules/profile/AddressesList.vue";
import AddressForm from "../modules/profile/AddressForm.vue";
const profileStore = useProfileStore();
const authStore = useAuthStore();
const actionType = ref("");
const opened = ref(false);

let addressParams = reactive({
  name: "",
  street: "",
  building: "",
  flat: "",
  comment: "",
  // userId: profileStore.id,
  // id: Math.random(),
});

const setValueAddress = (option, value) => {
  addressParams[option] = value;
};

const deletee = (id) => {
  profileStore.deleteAddress(id);
  opened.value = false;
};

const save = () => {
  if (actionType.value == "edit") {
    // console.log(addressParams);
    profileStore.editAddress({ ...addressParams, userId: profileStore.id });
  }
  if (actionType.value == "add") {
    // console.log(addressParams);
    profileStore.addAddress({
      ...addressParams,
      userId: authStore.user.id,
    });
  }
  addressParams.name = "";
  addressParams.street = "";
  addressParams.building = "";
  addressParams.flat = "";
  addressParams.comment = "";
  opened.value = false;
};

const openForm = (action, order) => {
  if (action == "edit") {
    actionType.value = "edit";
    opened.value = true;
    addressParams.id = order.id;
    addressParams.name = order.name;
    addressParams.street = order.street;
    addressParams.building = order.building;
    addressParams.flat = order.flat;
    addressParams.comment = order.comment;
    addressParams.userId = order.userId;
  }
  if (action == "add") {
    actionType.value = "add";
    opened.value = true;
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";

.user {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-bottom: 33px;
}

.user__name {
  @include b-s20-h23;

  margin-left: 30px;

  span {
    display: inline-block;

    vertical-align: middle;
  }
}

.user__button {
  display: inline-block;

  cursor: pointer;
  vertical-align: middle;
}

.user__phone {
  @include b-s16-h19;

  width: 100%;
  margin-top: 20px;

  span {
    font-weight: 400;
  }
}

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
  background-image: url("../assets/img/edit.svg");
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
