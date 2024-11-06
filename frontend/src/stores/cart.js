import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    misc: [],
  }),
  getters: {
    totalCartPrice: (state) => {
      const pizzasPrice =
        state.pizzas.reduce(
          (sum, pizza) => sum + pizza.price * pizza.quantity,
          0
        ) ?? 0;
      const miscPrice =
        state.misc.reduce((sum, el) => sum + el.price * el.quantity, 0) ?? 0;
      return pizzasPrice + miscPrice;
    },
    getPizzas: (state) => {
      return state.pizzas;
    },
    getMisc: (state) => {
      return state.misc;
    },
    getFilteredPizzas: (state) => {
      let filteredPizzas = [];
      let ingredientss = [];

      state.pizzas.map((pizza) => {
        pizza.ingredients.map((ingredient) =>
          ingredientss.push({
            ingredientId: ingredient.id,
            quantity: ingredient.quantity,
          })
        );
        filteredPizzas.push({
          name: pizza.name,
          quantity: pizza.quantity,
          ingredients: ingredientss,
          sauceId: pizza.sauce.id,
          doughId: pizza.dough.id,
          sizeId: pizza.size.id,
        });
      });
      return filteredPizzas;
    },
    getFilteredMiscs: (state) => {
      let filteredMiscs = [];

      state.misc.map((misc) => {
        filteredMiscs.push({
          miscId: misc.id,
          quantity: misc.quantity,
        });
      });
      return filteredMiscs;
    },
  },
  actions: {
    addPizza(newPizza) {
      const pizzaExist =
        this.pizzas.find((item) => item?.id === newPizza?.id) ?? -1;
      if (pizzaExist === -1) {
        this.pizzas.push({ ...newPizza, quantity: 1 });
      } else {
        pizzaExist.quantity += 1;
      }
    },
    deletePizza(id) {
      const pizzaExist = this.pizzas.find((item) => item.id === id);
      if (pizzaExist.quantity === 1)
        this.pizzas = this.pizzas.filter((pizza) => pizza.id !== id);
      else pizzaExist.quantity -= 1;
    },
    editPizza(newPizza) {
      const index = this.pizzas.findIndex((pizza) => pizza.id === newPizza.id);
      const pizzaExist =
        this.pizzas.find((item) => item?.id === newPizza?.id) ?? -1;
      this.pizzas.splice(index, 1, {
        ...newPizza,
        quantity: pizzaExist.quantity,
      });
    },
    addMisc(newMisc) {
      const miscExist = this.misc.find((item) => item.id === newMisc.id);

      if (!miscExist) {
        this.misc.push({ ...newMisc, quantity: 1 });
      } else {
        miscExist.quantity += 1;
      }
    },
    deleteMisc(id) {
      const miscExist = this.misc.find((item) => item.id === id);
      miscExist.quantity -= 1;
      if (miscExist.quantity === 0) {
        this.misc = this.misc.filter((misc) => misc.id !== miscExist.id);
      }
    },
    clean() {
      this.pizzas = [];
      this.misc = [];
    },
    setMiscs(miscs) {
      this.misc = miscs;
      console.log(`miscs: ${this.misc} and ${miscs}`);
    },
  },
});
