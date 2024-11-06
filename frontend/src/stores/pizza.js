import { defineStore } from 'pinia'
export const usePizzaStore = defineStore('pizza', {
	state: () => ({
		pizza: {
			name: "",
			dough: {},
			size: {},
			sauce: {},
			ingredients: [],
		  },
	}),
	getters: {},
	actions: {}
})
