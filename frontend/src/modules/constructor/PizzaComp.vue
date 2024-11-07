<template>
  <div class="content__pizza">
    <TextInput
      name="pizza_name"
      label="Название пиццы"
      placeholder="Введите название пиццы"
      :value="modelValue"
      @input="setName"
    />
    <AppDrop
      @drop="
        emits('addIngredient', {
          id: $event.id,
          ingredient: $event.ingredient,
          name: $event.name,
          price: $event.price,
        })
      "
    >
      <div class="content__constructor">
        <div
          class="pizza"
          :class="`pizza--foundation--${dough.doughSize}-${sauce.sauce}`"
        >
          <transition-group name="scale" tag="div" class="pizza__wrapper">
            <div
              v-for="(quantity, ingredient) in pizzaIngredients"
              :key="ingredient"
              class="pizza__filling"
              :class="[
                `pizza__filling--${ingredient}`,
                quantity === 2 && 'pizza__filling--second',
                quantity === 3 && 'pizza__filling--third',
              ]"
            />
          </transition-group>
        </div>
      </div>
    </AppDrop>

    <div class="content__result">
      <p>Итого: {{ price }} ₽</p>
      <NormalButton
        :disabled-button="props.disabledButton"
        label="Готовьте!"
        @click="emits('addPizza')"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { AppDrop, TextInput, NormalButton } from "../../common/components";

const props = defineProps({
  sauce: {
    type: Object,
    required: true,
  },
  dough: {
    type: Object,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  disabledButton: {
    type: Boolean,
    default: true,
  },
  modelValue: {
    type: String,
    default: "",
  },
});

const emits = defineEmits(["addIngredient", "update:modelValue", "addPizza"]);

const pizzaIngredients = computed(() => {
  return props.ingredients.reduce((result, ingredientt) => {
    const { ingredient, quantity } = ingredientt;
    if (quantity > 0) {
      result[ingredient] = quantity;
    }
    return result;
  }, {});
});

const setName = (name) => {
  emits("update:modelValue", name);
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
.pizza {
  position: relative;

  display: block;

  box-sizing: border-box;
  width: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &--foundation--large-creamy {
    background-image: url("../../assets/img/foundation/big-creamy.svg");
  }

  &--foundation--large-tomato {
    background-image: url("../../assets/img/foundation/big-tomato.svg");
  }

  &--foundation--light-creamy {
    background-image: url("../../assets/img/foundation/small-creamy.svg");
  }

  &--foundation--light-tomato {
    background-image: url("../../assets/img/foundation/small-tomato.svg");
  }
}

.pizza__wrapper {
  width: 100%;
  padding-bottom: 100%;
}

.pizza__filling {
  $bl: &;
  position: absolute;
  top: 0;
  left: 0;

  display: block;

  width: 100%;
  height: 100%;

  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  &::before,
  &::after {
    display: none;

    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    content: "";

    background-image: inherit;
  }

  &--second {
    &::before {
      display: block;

      transform: rotate(45deg);
    }
  }

  &--third {
    &::before {
      display: block;

      transform: rotate(45deg);
    }

    &::after {
      display: block;

      transform: rotate(-45deg);
    }
  }

  &--ananas,
  &--ananas.pizza__filling--second::before,
  &--ananas.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/ananas.svg");
  }

  &--bacon,
  &--bacon.pizza__filling--second::before,
  &--bacon.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/bacon.svg");
  }

  &--blue_cheese,
  &--blue.pizza__filling--second::before,
  &--blue.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/blue_cheese.svg");
  }

  &--cheddar,
  &--cheddar.pizza__filling--second::before,
  &--cheddar.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/cheddar.svg");
  }

  &--chile,
  &--chile.pizza__filling--second::before,
  &--chile.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/chile.svg");
  }

  &--ham,
  &--ham.pizza__filling--second::before,
  &--ham.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/ham.svg");
  }

  &--jalapeno,
  &--jalapeno.pizza__filling--second::before,
  &--jalapeno.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/jalapeno.svg");
  }

  &--mozzarella,
  &--mozzarella.pizza__filling--second::before,
  &--mozzarella.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/mozzarella.svg");
  }

  &--mushrooms,
  &--mushrooms.pizza__filling--second::before,
  &--mushrooms.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/mushrooms.svg");
  }

  &--olives,
  &--olives.pizza__filling--second::before,
  &--olives.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/olives.svg");
  }

  &--onion,
  &--onion.pizza__filling--second::before,
  &--onion.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/onion.svg");
  }

  &--parmesan,
  &--parmesan.pizza__filling--second::before,
  &--parmesan.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/parmesan.svg");
  }

  &--salami,
  &---salami.pizza__filling--second::before,
  &---salami.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/salami.svg");
  }

  &--salmon,
  &--salmon.pizza__filling--second::before,
  &--salmon.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/salmon.svg");
  }

  &--tomatoes,
  &--tomatoes.pizza__filling--second::before,
  &--tomatoes.pizza__filling--third::after {
    background-image: url("../../assets/img/filling-big/tomatoes.svg");
  }
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}

.scale-enter,
.scale-leave-to {
  transform: scale(1.1);

  opacity: 0;
}
</style>
