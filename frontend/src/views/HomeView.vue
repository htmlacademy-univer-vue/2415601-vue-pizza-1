<template>
    <main class="content">
        <form action="#" method="post">
            <div class="content__wrapper">
                <h1 class="title title--big">Конструктор пиццы</h1>
                <div class="content__dough">
                    <div class="sheet">
                        <h2 class="title title--small sheet__title">Выберите
                            тесто</h2>
                        <div v-for="d in dough"
                        :key="d.id"
                        class="sheet__content dough">
                            <label class="dough__input dough__input--light">
                                <input type="radio" name="dought" v-bind:value="dough_values[d.id]"
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

                        <div v-for="diameter in sizes"
                        :key="diameter.id"
                        class="sheet__content diameter">
                            <label
                                class="diameter__input diameter__input--small">
                                <input type="radio" name="diameter"
                                v-bind:value="size_values[diameter.id]" class="visually-hidden">
                                <span>{{diameter.name}}</span>
                            </label>
                        </div>
                    </div>
                </div>

                <div class="content__ingredients">
                    <div class="sheet">
                        <h2 class="title title--small sheet__title">Выберите
                            ингредиенты</h2>

                        <div class="sheet__content ingredients">

                            <div v-for="sauce in sauces"
                            :key="sauce.id"
                            class="ingredients__sauce">
                                <p>Основной соус:</p>

                                <label class="radio ingredients__input">
                                    <input type="radio" name="sauce"
                                        v-bind:value="sauce_values[sauce.id]" checked>
                                    <span>{{sauce.name}}</span>
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

    const dough_values = {
        1: "light",
        2: "large"
    };

 const size_values = {
    1: "small",
  2: "normal",
  3: "big",
 };

 const sauce_values = {
    1: "tomato",
    2: "creamy",
 };

</script>