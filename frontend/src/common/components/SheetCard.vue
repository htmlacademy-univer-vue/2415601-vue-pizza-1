<template>
  <div class="sheet">
    <SectionTitle class="sheet__title"><slot name="title" /></SectionTitle>
    <div class="sheet__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { SectionTitle } from "@/common/components";
</script>

<style lang="scss" scoped>
@import "@/assets/scss/app.scss";
.sheet {
  padding-top: 15px;

  border-radius: 8px;
  background-color: $white;
  box-shadow: $shadow-light;
}

.sheet__title {
  padding-right: 18px;
  padding-left: 18px;
}

.sheet__content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  margin-top: 8px;
  padding-top: 18px;
  padding-right: 18px;
  padding-left: 18px;

  border-top: 1px solid rgba($green-500, 0.1);
}
</style>
