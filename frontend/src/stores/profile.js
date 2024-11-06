import { defineStore } from 'pinia'
export const useProfileStore = defineStore('profile', {
	state: () => ({
		id: 0,
		name: "",
		email: "",
		avatar: "",
		phone: "",
		addresses:[],
		orders: []
	}),
	getters: {
		getAddresses: (state)=> {
			return state.addresses;
		},
		getOrders: (state)=> {
			return state.orders;
		},
		getName: (state)=> {
			return state.name;
		},
		getEmail: (state)=> {
			return state.email;
		},
		getAvatar: (state)=> {
			return state.avatar;
		},
		getPhone: (state)=> {
			return state.phone;
		}
	},
	actions: {}
})
