import { defineStore } from "pinia";

export const useProfileStore = defineStore("profile", {
  state: () => ({
    id: 0,
    name: "Василий Ложкин",
    email: "",
    avatar: "",
    phone: "+7 999-999-99-99",
    addresses: [],
    orders: [],
  }),
  getters: {
    getAddresses: (state) => {
      return state.addresses;
    },
    getOrders: (state) => {
      return state.orders;
    },
    getName: (state) => {
      return state.name;
    },
    getEmail: (state) => {
      return state.email;
    },
    getAvatar: (state) => {
      return state.avatar;
    },
    getPhone: (state) => {
      return state.phone;
    },
  },
  actions: {
    login(email, password) {
      // TODO add logic
      console.log(email, password);
      this.email = email;
    },
    logout() {
      // TODO add logic
      this.id = 0;
      this.name = "";
      this.email = "";
      this.avatar = "";
      this.phone = "";
      this.orders = [];
      this.addresses = [];
    },
    addOrder(order) {
      this.orders.push(order);
    },
    deleteOrder(id) {
      this.orders = this.orders.filter((order) => order.id !== id);
    },
    clearOrders() {
      this.orders = [];
    },
    addAddress(address) {
      this.addresses.push(address);
    },
    deleteAddress(id) {
      this.addresses = this.addresses.filter((address) => address.id !== id);
    },
    editAddress(newAddress) {
      const index = this.addresses.findIndex(
        (address) => address.id === newAddress.id
      );
      this.addresses.splice(index, 1, newAddress);
    },
  },
});
