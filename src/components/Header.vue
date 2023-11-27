<template>
  <v-app-bar
    color="primary"
    density="compact"
    theme="dark"
    image="https://cdn.vuetifyjs.com/images/backgrounds/bg.jpg"
    @click.stop="drawer = !drawer"
  >
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-app-bar-title class="pointer">{{
      currentPage
    }}</v-app-bar-title>
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
          title: 'Главная',
          value: 'mainPage',
        },
        {
          title: 'Пользователь',
          value: 'userSettings',
        },
        {
          title: 'Статистика',
          value: 'statistics',
        },
        {
          title: 'Каталог',
          value: 'catalog',
        },
      ],
    }
  },
  computed: {
    currentPage() {
      return (
        this.items.find(el => el.value == this.$route.name)?.title ||
        'ЗОЖ-учет'
      )
    },
  },
}
</script>

<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
</style>
