import doughSizes from "./data/doughSizes";
import sizes from "./data/sizes";
import ingredients from "./data/ingredients";
import sauces from "./data/sauces";

export const normalizeDough = (dough) => {
  return {
    ...dough,
    doughSize: dough.id ? doughSizes[dough.id] : "",
  };
};

export const normalizeSizes = (size) => {
  return {
    ...size,
    size: size.id ? sizes[size.id] : "",
  };
};

export const normalizeIngredients = (ingredient) => {
  return {
    ...ingredient,
    ingredient: ingredient.id ? ingredients[ingredient.id] : "",
  };
};

export const normalizeSauces = (sauce) => {
  return {
    ...sauce,
    sauce: sauce.id ? sauces[sauce.id] : "",
  };
};

export const normalizeMisc = (misc) => {
  return {
    ...misc,
    quantity: 0,
  };
};

export function getImageUrl(path) {
  const publicUrl = "/api";
  return `${publicUrl}/${path}`;
}

export function getFilteredPizzasOfOrder(state) {
  let filteredPizzas = [];
  let ingredientss = [];

  state.orderPizzas.map((pizza) => {
    pizza.ingredients.map((ingredient) =>
      ingredientss.push({
        ingredientId: ingredient.ingredientId,
        quantity: ingredient.quantity,
      })
    );
    filteredPizzas.push({
      name: pizza.name,
      quantity: pizza.quantity,
      ingredients: ingredientss,
      sauceId: pizza.sauceId,
      doughId: pizza.doughId,
      sizeId: pizza.sizeId,
    });
  });
  return filteredPizzas;
}

export function getFilteredMiscsOfOrder(state) {
  let filteredMiscs = [];

  if (state.orderMisc) {
    state.orderMisc.map((misc) => {
      filteredMiscs.push({
        miscId: misc.miscId,
        quantity: misc.quantity,
      });
    });
    return filteredMiscs;
  } else {
    return [];
  }
}

export function getPizzasWithId(pizzas) {
  let pizzaArray = [];
  pizzas.map((pizza) => pizzaArray.push({ ...pizza, id: pizzas.lenght + 1 }));
  return pizzaArray;
}
