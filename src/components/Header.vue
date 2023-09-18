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
    <v-app-bar-title>{{ currentPage }}</v-app-bar-title>
  </v-app-bar>
  <v-navigation-drawer
    v-model="drawer"
    location="left"
    temporary
    theme="dark"
    permanent
    image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
  >
    <v-list>
      <v-list-item v-for="item in items" :key="item" :value="item">
        <routerLink :to="{ name: item.value }" class="routerLink">
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </routerLink>
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      drawer: false,
      items: [
        {
          title: 'User Profile',
          value: 'userSettings',
        },
        {
          title: 'Home',
          value: 'mainPage',
        },
        {
          title: 'Statistics',
          value: 'statistics',
        },
        {
          title: 'Catalog',
          value: 'catalog',
        },
      ],
    }
  },
  computed: {
    currentPage() {
      console.log(this.$route)

      return this.$route.matched[0].name
    },
  },
}
</script>

<style lang="scss" scoped></style>
