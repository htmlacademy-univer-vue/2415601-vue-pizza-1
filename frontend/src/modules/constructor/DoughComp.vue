<template>
  <div class="content__dough">
    <SheetCard class="dough">
      <template #title>Выберите тесто</template>
      <label
        v-for="dough in normalizedDoughs"
        :key="dough.id"
        class="dough__input"
        :class="`dough__input--${dough.doughSize}`"
      >
        <input
          type="radio"
          name="dought"
          :value="dough.doughSize"
          class="visually-hidden"
          :checked="dough.doughSize === modelValue.doughSize"
          @input="
            emit('update:modelValue', {
              ...dough,
              doughSize: $event.target.value,
              price: dough.price,
            })
          "
        />
        <b>{{ dough.name }}</b>
        <span>{{ dough.description }}</span>
      </label>
    </SheetCard>
  </div>
</template>

<script setup>
import { SheetCard } from "../../common/components";
defineProps({
  normalizedDoughs: {
    type: Object,
    required: true,
  },
  modelValue: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue"]);
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.dough__input {
  position: relative;

  margin-right: 8%;
  margin-bottom: 20px;
  padding-left: 50px;

  cursor: pointer;

  b {
    @include r-s16-h19;

    &::before {
      @include p_center-v;

      width: 36px;
      height: 36px;

      content: "";
      transition: 0.3s;

      border-radius: 50%;
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
    }
  }

  span {
    @include l-s11-h13;

    display: block;
  }

  &--light {
    b {
      &::before {
        background-image: url("../../assets/img/dough-light.svg");
      }
    }
  }

  &--large {
    b {
      &::before {
        background-image: url("../../assets/img/dough-large.svg");
      }
    }
  }

  &:hover {
    b::before {
      box-shadow: $shadow-regular;
    }
  }

  input {
    &:checked + b::before {
      box-shadow: $shadow-large;
    }
  }
}
</style>
