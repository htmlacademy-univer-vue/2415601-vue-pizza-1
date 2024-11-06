import { defineStore } from "pinia";
import resources from "../services/resources";
import { getPizzasWithId } from "@/common/helpers";

export const useProfileStore = defineStore("profile", {
  state: () => ({
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
  },
  actions: {
    async addOrder(order) {
      const res = await resources.order.addOrder(order);
      if (res.__state !== "success") {
        return;
      } else {
        let newObject = {
          id: res.data.id,
          userId: res.data.userId,
          addressId: res.data.addressId,
          orderPizzas: getPizzasWithId(order.pizzas),
          orderMisc: order.misc,
          orderAddress: order.address,
        };
        this.orders.push(newObject);
      }
    },
    async deleteOrder(id) {
      const res = await resources.order.removeOrder(id);
      if (res.__state !== "success") {
        return;
      } else {
        this.orders = this.orders.filter((order) => order.id !== id);
      }
    },
    clearOrders() {
      this.orders = [];
    },
    async addAddress(address) {
      const res = await resources.address.addAddress(address);
      if (res.__state !== "success") {
        return;
      } else {
        const data = res.data;
        this.addresses.push(data);
      }
    },
    async deleteAddress(id) {
      const res = await resources.address.removeAddress(id);
      if (res.__state !== "success") {
        return;
      } else {
        this.addresses = this.addresses.filter((address) => address.id !== id);
      }
    },
    async editAddress(newAddress) {
      const res = await resources.address.updateAddress(newAddress);
      if (res.__state !== "success") {
        return;
      } else {
        const index = this.addresses.findIndex(
          (address) => address.id === newAddress.id
        );
        this.addresses.splice(index, 1, newAddress);
      }
    },
    setAddresses(addresses) {
      this.addresses = addresses;
    },
    setOrders(orders) {
      this.orders = orders;
    },
  },
});
