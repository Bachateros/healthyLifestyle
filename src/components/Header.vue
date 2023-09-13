<template>
  <v-app-bar color="primary" density="compact">
    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-app-bar-title>Главная</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" location="left" temporary>
    <v-list-item title="Home"> </v-list-item>
    <v-divider></v-divider
  ></v-navigation-drawer>
</template>
<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      drawer: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
