<template>
  <label class="input">
    <span class="visually-hidden">{{ label }}</span>
    <input
      type="text"
      :name="name"
      :placeholder="placeholder"
      @input="emits('input', $event.target.value)"
    />
  </label>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  placeholder: { type: String, default: "" },
});
const emits = defineEmits(["input"]);
</script>

<style scoped lang="scss">
@import "@/assets/scss/app.scss";

.input {
  display: block;

  span {
    @include r-s14-h16;

    display: block;

    margin-bottom: 4px;
  }

  input {
    @include r-s16-h19;

    display: block;

    box-sizing: border-box;
    width: 100%;
    margin: 0;
    padding: 8px 16px;

    transition: 0.3s;

    color: $black;
    border: 1px solid $purple-400;
    border-radius: 8px;
    outline: none;
    background-color: $white;

    font-family: inherit;

    &:focus {
      border-color: $green-500;
    }
  }

  &:hover {
    input {
      border-color: $black;
    }
  }

  &--big-label {
    display: flex;
    align-items: center;

    span {
      @include b-s16-h19;

      margin-right: 16px;

      white-space: nowrap;
    }
  }
}
</style>
