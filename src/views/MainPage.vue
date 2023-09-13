<template>
  <appHeader />
  <v-content class="mainPage">
    <h1>Main Page</h1>
    <p class="text-capitalize bg-red text-blue">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde repellendus,
      sequi, fugit temporibus nihil blanditiis consectetur officiis debitis
      quasi nesciunt, dolor sed dolores numquam voluptatibus? Voluptates ad
      aliquam reprehenderit quisquam!
    </p>
    <v-btn
      variant="flat"
      color="blue"
      selected-class="v-slide-group-item--active"
      @click="showDate"
    >
      <v-icon margin="left" icon="mdi mdi-email-edit-outline"></v-icon>
      <span>email me</span>
    </v-btn>
  </v-content>
</template>
<script>
import { useFoodStore } from '@/store/index'
import appHeader from '@/components/Header.vue'
export default {
  name: 'appGlobalFeed',
  components: {
    appHeader,
  },
  data() {
    return {
      foodStore: useFoodStore(),
    }
  },
  methods: {
    showDate() {
      let date = new Date()
      console.log('date: ', date)
    },
  },
}
</script>

<style lang="scss" scoped></style>
