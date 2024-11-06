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
