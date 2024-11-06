import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    pizzas: [],
    misc: [
      {
        id: 0,
        name: "Coca-Cola 0,5 литра",
        cost: "x 56 ₽",
        src: "/src/assets/img/cola.svg",
        price: 56,
        quantity: 0,
      },
      {
        id: 1,
        name: "Острый соус",
        cost: "x 30 ₽",
        src: "/src/assets/img/sauce.svg",
        price: 30,
        quantity: 0,
      },
      {
        id: 2,
        name: "Картошка из печи",
        cost: "x 56 ₽",
        src: "/src/assets/img/potato.svg",
        price: 56,
        quantity: 0,
      },
    ],
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
    },
    clean() {
      this.pizzas = [];
      this.misc = [
        {
          id: 0,
          name: "Coca-Cola 0,5 литра",
          cost: "x 56 ₽",
          src: "/src/assets/img/cola.svg",
          price: 56,
          quantity: 0,
        },
        {
          id: 1,
          name: "Острый соус",
          cost: "x 30 ₽",
          src: "/src/assets/img/sauce.svg",
          price: 30,
          quantity: 0,
        },
        {
          id: 2,
          name: "Картошка из печи",
          cost: "x 56 ₽",
          src: "/src/assets/img/potato.svg",
          price: 56,
          quantity: 0,
        },
      ];
    },
  },
});
