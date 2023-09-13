<template>
  <v-app-bar
    color="primary"
    density="compact"
    theme="dark"
    image="https://cdn.vuetifyjs.com/images/backgrounds/bg.jpg"
  >
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title>Главная</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    theme="dark"
    permanent
    image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
  >
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
  computed: {},
}
</script>

<style lang="scss" scoped></style>
