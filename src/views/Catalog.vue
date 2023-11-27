<template>
  <div class="pa-5 text-center">
    <h2>Не нашли нужного продукта? Добавьте его!</h2>
    <div class="mt-3 mb-5">
      <appAddProductToCatalog />
    </div>
    <appSearchFood />
    <appCatalogTable class="mt-3" />
  </div>
</template>
<script>
import appAddProductToCatalog from '@/components/AddProductToCatalog.vue'
import appSearchFood from '@/components/SearchFood.vue'
import appCatalogTable from '@/components/CatalogTable.vue'
export default {
  name: 'appCatalog',
  components: {
    appAddProductToCatalog,
    appSearchFood,
    appCatalogTable,
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
