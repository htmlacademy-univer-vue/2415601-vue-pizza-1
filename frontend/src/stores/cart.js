import { defineStore } from 'pinia'
export const useCartStore = defineStore('cart', {
	state: () => ({
		phone: "",
		address: {},
		pizzas: [],
		misc: []
	}),
	getters: {},
	actions: {}
})
