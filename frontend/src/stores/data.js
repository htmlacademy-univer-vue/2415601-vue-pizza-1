import { defineStore } from 'pinia'
import doughs from "@/mocks/dough.json";
import ingredients from "@/mocks/ingredients.json";
import sauces from "@/mocks/sauces.json";
import sizes from "@/mocks/sizes.json";
import miscs from "@/mocks/misc.json";
import {
	normalizeDough,
	normalizeSizes,
	normalizeIngredients,
	normalizeSauces,
  } from "@/common/helpers";

export const useDataStore = defineStore('data', {
	state: () => ({
		dough: doughs.map((dough) => normalizeDough(dough)),
        ingredients: ingredients.map((ingredient) => normalizeIngredients(ingredient)),
        misc: miscs,
        sauce: sauces.map((sauce) => normalizeSauces(sauce)),
        sizes: sizes.map((size) => normalizeSizes(size))
	}),
	getters: {
		getIngredients() {
			return state.ingredients;
		}
	},
	actions: {}
})