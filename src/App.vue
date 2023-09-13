<template>
  <v-app>
    <v-main>
      <appGlobalFeed />
    </v-main>
  </v-app>
</template>

<script>
import appGlobalFeed from '@/views/GlobalFeed.vue'

export default {
  name: 'App',

  components: {
    // HelloWorld,
    appGlobalFeed,
  },

  data: () => ({
    //
  }),
}
</script>
