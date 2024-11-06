import { defineStore } from "pinia";

export const usePizzaStore = defineStore("pizza", {
  state: () => ({
    name: "",
    dough: {},
    size: {},
    sauce: {},
    ingredients: [],
  }),
  getters: {
    totalPizzaPrice: (state) => {
      const ingredientsTotalPrice = state.ingredients.reduce(
        (sum, ingredient) => sum + ingredient.price,
        0
      );
      const multiplier = state.size.multiplier;
      return (
        multiplier *
        (state.sauce.price + state.dough.price + ingredientsTotalPrice)
      );
    },
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
  },
  actions: {
    addIngredient(newIngredient) {
        const ingredientExist = state.ingredients.find((item) => item.id === newIngredient.id);
    
        if (ingredientExist) {
            ingredientExist.quantity += 1;
        } else {
            state.ingredients.push({ ...newIngredient, quantity: 1 });
        }
    },
}
});
