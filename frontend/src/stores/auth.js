import { defineStore } from "pinia";
import resources from "../services/resources";
import jwtService from "../services/jwt/jwt.service";
import { useProfileStore } from "./profile";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  getters: {
    isAuthenticated() {
      return !!this.user;
    },
  },
  actions: {
    setUser(user) {
      this.user = user;
    },

    async login(credentials) {
      const res = await resources.auth.login(credentials);
      if (res.__state === "success") {
        jwtService.saveToken(res.data.token);
        return "success";
      } else {
        return res.data.message;
      }
    },

    async logout() {
      await resources.auth.logout();
      jwtService.destroyToken();
      resources.auth.setAuthHeader("");
      this.user = null;
    },

    async whoAmI() {
      resources.auth.setAuthHeader(jwtService.getToken());
      const profileStore = useProfileStore();

      const res1 = await resources.auth.whoAmI();
      if (res1.__state !== "success") {
        await this.logout();
        return;
      } else {
        this.setUser(res1.data);
      }

      const res2 = await resources.address.getAddresses();
      if (res2.__state !== "success") {
        await this.logout();
        return;
      } else {
        profileStore.setAddresses(res2.data);
      }

      const res3 = await resources.order.getOrders();
      if (res3.__state !== "success") {
        await this.logout();
      } else {
        profileStore.setOrders(res3.data);
      }
    },
  },
});
