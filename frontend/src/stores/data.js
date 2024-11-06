import { defineStore } from "pinia";
import resources from "@/services/resources";

import {
  // функции нормализации
  normalizeDough,
  normalizeSizes,
  normalizeIngredients,
  normalizeSauces,
  normalizeMisc,
} from "@/common/helpers";

export const useDataStore = defineStore("data", {
  state: () => ({
    dough: [],
    ingredients: [],
    misc: [],
    sauce: [],
    sizes: [],
  }),
  actions: {
    async fetchdata() {
      const res1 = await resources.dough.getDoughs();
      // console.log(res1.data)
      if (res1.__state !== "success") {
        return;
      } else {
        const data = res1.data.slice(0, 2);
        // console.log(data);
        this.dough = data.map((dough) => normalizeDough(dough));
      }

      const res2 = await resources.ingredient.getIngredients();
      // console.log(res2.data)
      if (res1.__state !== "success") {
        return;
      } else {
        const data = res2.data.slice(0, 15);
        // console.log(data);
        this.ingredients = data.map((ingredient) =>
          normalizeIngredients(ingredient)
        );
        // console.log(this.ingredients);
      }

      const res3 = await resources.misc.getMiscs();
      // console.log(res3.data)
      if (res1.__state !== "success") {
        return;
      } else {
        const data = res3.data.slice(0, 3);
        // console.log(data);
        this.misc = data.map((misc) => normalizeMisc(misc));
      }

      const res4 = await resources.sauce.getSauces();
      // console.log(res4.data)
      if (res1.__state !== "success") {
        return;
      } else {
        const data = res4.data.slice(0, 2);
        // console.log(data);
        this.sauce = data.map((sauce) => normalizeSauces(sauce));
      }

      const res5 = await resources.size.getSizes();
      // console.log(res5.data)
      if (res1.__state !== "success") {
        return;
      } else {
        const data = res5.data.slice(0, 3);
        // console.log(data);
        this.sizes = data.map((size) => normalizeSizes(size));
        // console.log(this.sizes);
      }
    },
  },
});
