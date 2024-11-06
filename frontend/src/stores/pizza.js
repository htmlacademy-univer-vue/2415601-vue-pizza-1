import { defineStore } from "pinia";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    id: 0,
    name: "",
    dough: {},
    size: {},
    sauce: {},
    ingredients: [],
    // dough: { name:'Тонкое', doughSize: 'light', price: 300},
    // size: {name:'32 см', size: 'small', multiplier: 1},
    // sauce: {name:'Томатный', sauce: 'tomato', price: 50},
  }),
  getters: {
    getDough: (state) => {
      return state.dough;
    },
    getSize: (state) => {
      return state.size;
    },
    getSauce: (state) => {
      return state.sauce;
    },
    getIngredients: (state) => {
      return state.ingredients;
    },
    getIngredientsString: (state) => {
      return state.ingredients
        .map((ingredient) => ingredient.name.toLowerCase())
        .join(", ");
    },
    totalPizzaPrice: (state) => {
      const ingredientsTotalPrice = state.ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price * ingredient.quantity,
        0
      );

      const multiplier = state.size.multiplier;
      return (
        multiplier *
        (state.sauce.price + state.dough.price + ingredientsTotalPrice)
      );
    },
    getPizzaInfo: (state) => {
      return {
        id: state.id,
        name: state.name,
        dough: state.dough,
        size: state.size,
        sauce: state.sauce,
        ingredients: state.ingredients,
        price: state.totalPizzaPrice,
        ingredientsString: state.getIngredientsString,
      };
    },
  },
  actions: {
    addIngredient(newIngredient) {
      const ingredientExist =
        this.ingredients.find((item) => item?.id === newIngredient?.id) ?? -1;
      if (ingredientExist === -1) {
        this.ingredients.push({ ...newIngredient, quantity: 1 });
      } else {
        ingredientExist.quantity += 1;
      }
    },
    upgradeIngredientAmount(ingredient, count) {
      const ingredientExist =
        this.ingredients.find((item) => item?.id === ingredient?.id) ?? -1;
      if (ingredientExist === -1) {
        this.ingredients.push({ ...ingredient, quantity: count });
      } else {
        ingredientExist.quantity = count;
        if (ingredientExist.quantity === 0) {
          this.ingredients = this.ingredients.filter(
            (ingredient) => ingredient.id !== ingredientExist.id
          );
        }
      }
    },
    setPizzaState(pizza) {
      this.id = pizza.id;
      this.name = pizza.name;
      this.dough = pizza.dough;
      this.size = pizza.size;
      this.sauce = pizza.sauce;
      this.ingredients = pizza.ingredients;
    },
  },
});
