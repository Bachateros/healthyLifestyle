<template>Global feed {{ foodStore.foods }}</template>
<script>
import { useFoodStore } from '@/store/index.js'
export default {
  name: 'appGlobalFeed',
  data() {
    return {
      foodStore: useFoodStore(),
    }
  },
}
</script>

<style lang="scss" scoped></style>
