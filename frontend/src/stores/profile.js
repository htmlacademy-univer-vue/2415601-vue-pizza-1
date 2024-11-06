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
	actions: {
		login(email, password) {
			console.log(email, password);
		},
		logout() {
			state.id = 0;
			state.name = "";
			state.email = "";
			state.avatar = "";
			state.phone = "";
			state.orders = [];
			state.addresses = [];
		},
		addOrder(order){
			state.orders.push(order);
		},
		deleteOrder(id) {
			state.orders = state.orders.filter((order) => order.id !== id);
		},
		clearOrders() {
			state.orders = [];
		},
		addAddress(address) {
			state.addresses.push(address);
		},
		deleteAddress(id) {
			state.addresses = state.addresses.filter((address) => address.id !== id);
		},
	}
})
