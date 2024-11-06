import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
	state: () => ({
		phone: "",
		address: {},
		pizzas: [],
		misc: []
	}),
	getters: {
		totalCartPrice: (state) => {
			const pizzasPrice = state.pizzas.reduce((sum, pizza) => sum + pizza.price, 0);
			const miscPrice = state.misc.reduce((sum, el) => sum + el.price, 0);
			return pizzasPrice + miscPrice;
		},
		getPhone: (state)=> {
			return state.phone;
		},
		getAddress: (state)=> {
			return state.address;
		},
		getPizzas: (state)=> {
			return state.pizzas;
		},
		getMisc: (state)=> {
			return state.misc;
		}
	},
	actions: {
		addPizza(pizza) {
			const pizzaExist = state.pizzas.find((item) => item.id === pizza.id);
		
			if (pizzaExist) {
				pizzaExist.quantity += 1;
			} else {
				state.pizzas.push({ ...pizza, quantity: 1 });
			}
		},
		deletePizza(id) {
			const pizzaExist = state.pizzas.find((item) => item.id === pizza.id);
			if (pizzaExist.quantity === 1)
				state.pizzas = state.pizzas.filter((pizza) => pizza.id !== id);
			else 
				pizzaExist.quantity -= 1;
		},
		editPizza(newPizza) {
			const targetIndex = state.pizzas.findIndex(
			  (pizza) => pizza.id === newPizza.id
			);
			this.pizzas.splice(targetIndex, 1, newPizza);
		},
		addMisc(newMisc) {
			const miscExist = state.misc.find((item) => item.id === newMisc.id);
		
			if (miscExist) {
				miscExist.quantity += 1;
			} else {
				state.misc.push({ ...newMisc, quantity: 1 });
			}
		},
		deleteMisc(id) {
			const miscExist = state.misc.find((item) => item.id === pizza.id);
			if (miscExist.quantity === 1)
				state.misc = state.misc.filter((pizza) => pizza.id !== id);
			else 
				miscExist.quantity -= 1;
		},
	}
})
