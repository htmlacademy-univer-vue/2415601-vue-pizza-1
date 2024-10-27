<template>
    <main class="content">
        <form action="#" method="post">
            <div class="content__wrapper">
                <h1 class="title title--big">Конструктор пиццы</h1>
                <div class="content__dough">
                    <div class="sheet">
                        <h2 class="title title--small sheet__title">Выберите
                            тесто</h2>
                        <div v-for="d in dough" :key="d.id"
                            class="sheet__content dough">
                            <label
                                v-bind:class="`dough__input dough__input--${dough_values[d.id]}`">
                                <input type="radio" name="dought"
                                    v-bind:value="dough_values[d.id]"
                                    class="visually-hidden" checked>
                                <b>{{ d.name }}</b>
                                <span>Из твердых сортов пшеницы</span>
                            </label>
                        </div>

                    </div>

                </div>

                <div class="content__diameter">
                    <div class="sheet">
                        <h2 class="title title--small sheet__title">Выберите
                            размер</h2>

                        <div v-for="diameter in sizes" :key="diameter.id"
                            class="sheet__content diameter">
                            <label
                                v-bind:class="`diameter__input diameter__input--${size_values[diameter.id]}`">
                                <input type="radio" name="diameter"
                                    v-bind:value="size_values[diameter.id]"
                                    class="visually-hidden">
                                <span>{{ diameter.name }}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="content__ingredients">
                    <div class="sheet">
                        <h2 class="title title--small sheet__title">Выберите
                            ингредиенты</h2>

                        <div class="sheet__content ingredients">

                            <div
                                class="ingredients__sauce">
                                <p>Основной соус:</p>

                                <label v-for="sauce in sauces" :key="sauce.id" class="radio ingredients__input">
                                    <input type="radio" name="sauce"
                                        v-bind:value="sauce_values[sauce.id]"
                                        checked>
                                    <span>{{ sauce.name }}</span>
                                </label>
                            </div>

                            <div class="ingredients__filling">
                                <p>Начинка:</p>

                                <ul class="ingredients__list">
                                    <li v-for="ingredient in ingredients"
                                        :key="ingredient.id"
                                        class="ingredients__item">
                                        <span
                                            class="filling filling--ingredient">{{
                                                ingredient.name }}</span>

                                        <div
                                            class="counter counter--orange ingredients__counter">
                                            <button type="button"
                                                class="counter__button counter__button--minus"
                                                disabled>
                                                <span
                                                    class="visually-hidden">Меньше</span>
                                            </button>
                                            <input type="text" name="counter"
                                                class="counter__input"
                                                value="0">
                                            <button type="button"
                                                class="counter__button counter__button--plus">
                                                <span
                                                    class="visually-hidden">Больше</span>
                                            </button>
                                        </div>
                                    </li>
                                </ul>

                            </div>

                        </div>
                    </div>
                </div>

                <div class="content__pizza">
                    <label class="input">
                        <span class="visually-hidden">Название пиццы</span>
                        <input type="text" name="pizza_name"
                            placeholder="Введите название пиццы">
                    </label>

                    <div class="content__constructor">
                        <div class="pizza pizza--foundation--big-tomato">
                            <div class="pizza__wrapper">
                                <div
                                    class="pizza__filling pizza__filling--ananas">
                                </div>
                                <div
                                    class="pizza__filling pizza__filling--bacon">
                                </div>
                                <div
                                    class="pizza__filling pizza__filling--cheddar">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="content__result">
                        <p>Итого: 0 ₽</p>
                        <button type="button" class="button"
                            disabled>Готовьте!</button>
                    </div>
                </div>

            </div>

        </form>
    </main>
</template>

<script setup>
import dough from '../mocks/dough.json'
import ingredients from '../mocks/ingredients.json'
import sauces from '../mocks/sauces.json'
import sizes from '../mocks/sizes.json'

import dough_values from '../common/data/doughSizes'
import size_values from '../common/data/sizes'
import sauce_values from '../common/data/sauces'

</script>

<style lang="scss" scoped>
@import "@/assets/scss/ds-system/ds.scss";
@import "@/assets/scss/mixins/mixins.scss";
.content {
  padding-top: 20px;
}

.content__wrapper {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  width: 920px;
  margin: 0 auto;
  padding-right: 2.12%;
  padding-bottom: 30px;
  padding-left: 2.12%;
}

.content__dough {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__diameter {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__ingredients {
  width: 527px;
  margin-top: 15px;
  margin-right: auto;
  margin-bottom: 15px;
}

.content__pizza {
  width: 373px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.content__constructor {
  width: 315px;
  margin-top: 25px;
  margin-right: auto;
  margin-left: auto;
}

.content__result {
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  p {
    @include b-s24-h28;

    margin: 0;
  }

  button {
    margin-left: 12px;
    padding: 16px 45px;
  }
}
</style>