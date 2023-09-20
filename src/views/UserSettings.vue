<template>
  User Profile <appHeader></appHeader> user : {{ user.name }}
  <v-sheet width="75%" max-width="500" class="mx-auto">
    <v-form ref="form">
      <v-text-field
        v-model="user.name"
        :counter="20"
        :rules="nameRules"
        label="Name"
        required
      ></v-text-field>

      <v-select
        v-model="user.sex"
        :items="sex"
        :rules="[v => !!v || 'Item is required']"
        label="Sex"
        required
      ></v-select>

      <v-text-field
        v-model="user.age"
        :counter="3"
        :rules="ageRules"
        label="Age"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.height"
        :counter="3"
        :rules="bodyRulus"
        label="Height"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.weight"
        :counter="3"
        :rules="bodyRulus"
        label="Weight"
        required
      ></v-text-field>

      <div class="d-flex flex-column">
        <v-btn color="success" class="mt-4" block @click="validate">
          Validate
        </v-btn>

        <v-btn color="error" class="mt-4" block @click="reset">
          Reset Form
        </v-btn>

        <v-btn
          color="warning"
          class="mt-4"
          block
          @click="resetValidation"
        >
          Reset Validation
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
</template>
<script>
import appHeader from '@/components/Header.vue'
import { useUserInformation } from '@/stores/user'
export default {
  name: 'appUserSettings',
  components: {
    appHeader,
  },
  data: () => ({
    sex: ['Male', 'Female'],
    user: useUserInformation(),
    nameRules: [
      v => !!v || 'Name is required',
      v =>
        (v && v.length <= 20) ||
        'Name must be less than 20 characters',
      v =>
        (v && v.length >= 2) || 'Name must be more than 1 character',
    ],
    ageRules: [
      v => !!v || 'Age is requred',
      v => (v && v > 7) || 'Age must be more than 7',
    ],
    bodyRulus: [
      v => !!v || 'It is requred',
      v => (v && v > 30 && v < 250) || "It's a magic digits",
    ],
  }),
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        console.log(
          'user data:',
          JSON.parse(JSON.stringify(this.user))
        )
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
  },
}
</script>

<style lang="scss" scoped></style>
