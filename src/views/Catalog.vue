<template>
  <appHeader></appHeader>
  <div class="pa-5 text-center">
    <h2>Не нашли нужного продукта? Добавьте его!</h2>
    <div class="mt-3 mb-5">
      <appAddProductToCatalog />
    </div>
    <appSearchFood />
  </div>
</template>
<script>
import appHeader from '@/components/Header.vue'
import appAddProductToCatalog from '@/components/AddProductToCatalog.vue'
import appSearchFood from '@/components/SearchFood.vue'
export default {
  name: 'appCatalog',
  components: {
    appHeader,
    appAddProductToCatalog,
    appSearchFood,
  },
}
</script>

<style lang="scss" scoped>
.bigger {
  & > * {
    font-size: 2em;
  }
}
</style>
