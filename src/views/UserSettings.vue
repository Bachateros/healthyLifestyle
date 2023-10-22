<template>
  <appHeader></appHeader>
  <v-sheet
    width="75%"
    max-width="500"
    class="mx-auto mt-5"
    v-if="!user.isUser || isChanged"
  >
    <v-form ref="form">
      <v-text-field
        v-model="localUser.name"
        :counter="20"
        :rules="nameRules"
        label="Имя"
        required
      ></v-text-field>

      <v-select
        v-model="localUser.sex"
        :items="sex"
        :rules="[v => !!v || 'Обязательное поле']"
        label="Пол"
        required
      ></v-select>

      <v-text-field
        v-model="localUser.age"
        :counter="3"
        :rules="ageRules"
        label="Возраст"
        required
      ></v-text-field>

      <v-text-field
        v-model="localUser.height"
        :counter="6"
        :rules="bodyRulus"
        label="Рост"
        required
      ></v-text-field>

      <v-text-field
        v-model="localUser.weight"
        :counter="6"
        :rules="bodyRulus"
        label="Вес"
        required
      ></v-text-field>

      <v-select
        v-model="localUser.activity"
        :items="activities"
        :rules="[v => !!v || 'Обязательное поле']"
        label="Уровень активности"
        required
      ></v-select>

      <div class="d-flex flex-column">
        <v-btn color="success" class="mt-4" block @click="validate">
          Сохранить
        </v-btn>

        <v-btn color="error" class="mt-4" block @click="reset">
          Сбросить данные
        </v-btn>

        <v-btn color="warning" class="mt-4" block @click="cancel">
          Отмена
        </v-btn>
      </div>
    </v-form>
  </v-sheet>
  <v-sheet v-else width="70%" class="mx-auto mt-5">
    <v-card color="#ffeeff">
      <div class="d-flex">
        <v-avatar
          class="ma-3"
          size="200"
          rounded="0"
          :image="getAvatar"
        >
        </v-avatar>
        <div
          class="d-flex flex-column ml-5 justify-space-evenly me-auto"
        >
          <div class="d-flex justify-space-between">
            <div>Имя: {{ user.userData.name }}</div>
            <div class="ml-7">Пол: {{ user.userData.sex }}</div>
          </div>
          <div class="d-flex justify-space-between">
            <div>Возраст: {{ user.userData.age }}</div>
            <div class="ml-5">
              Уровень активности: {{ user.userData.activity }}
            </div>
          </div>
          <p>Рост: {{ user.userData.height }}</p>
          <p>Вес: {{ user.userData.weight }}</p>
        </div>
      </div>
    </v-card>
    <v-row justify="space-evenly" aligh="center" class="mt-5">
      <v-btn color="success" @click="updateData"
        >Обновить данные</v-btn
      >

      <v-dialog v-model="dialog" persistent width="auto">
        <template v-slot:activator="{ props }">
          <v-btn color="error" v-bind="props">Удалить данные</v-btn>
        </template>
        <v-card>
          <v-card-title class="text-h5 text-center"
            >Выход из приложения</v-card-title
          >
          <v-card-text class="text-h5 text-center"
            >Вы действительно хотетите выйти из приложения? Все данные
            будут удалены безвозвратно!</v-card-text
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn
              color="green-darken-1"
              variant="text"
              @click="dialog = false"
            >
              Ой, нет, не хочу</v-btn
            >
            <v-btn
              color="red-darken-1"
              variant="text"
              @click="deleteUser"
            >
              Да:(</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
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
    sex: ['Мужской', 'Женский'],
    activities: ['Низкий', 'Средний', 'Высокий', 'Очень высокий'],
    dialog: false,
    user: useUserInformation(),
    localUser: {
      name: '',
      sex: '',
      age: 18,
      height: 0,
      weight: 0,
    },
    isChanged: false,
    nameRules: [
      v => !!v || 'Обязательное поле',
      v =>
        (v && v.length <= 20) || 'Имя должно быть меньше 20 символов',
      v =>
        (v && v.length >= 2) ||
        'Имя должно быть болшье одного символа',
    ],
    ageRules: [
      v => !!v || 'Обязательное поле',
      v => (v && v > 5) || 'Приложение для пользователей старше 5',
    ],
    bodyRulus: [
      v => !!v || 'Обязательное поле',
      v =>
        (v && v > 30 && v < 250) || 'Что за магическое число число',
    ],
  }),
  methods: {
    async validate() {
      const { valid } = await this.$refs.form.validate()

      if (valid) {
        this.isChanged = false
        this.user.updateUserData(this.localUser)
      }
    },
    reset() {
      this.$refs.form.reset()
    },
    cancel() {
      this.isChanged = false
    },
    updateData() {
      this.localUser = this.user.userData
      this.isChanged = true
    },
    deleteUser() {
      this.dialog = false
      this.user.deleteUserData()
      this.isChanged = true
      this.$router.push({ name: 'mainPage' })
    },
  },
  computed: {
    getAvatar() {
      return this.user.userData.sex == 'Мужской'
        ? 'https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortWaved&accessoriesType=Round&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Black&clotheType=Hoodie&clotheColor=Heather&eyeType=Happy&eyebrowType=UpDown&mouthType=Default&skinColor=Light'
        : 'https://avataaars.io/'
    },
  },
}
</script>

<style lang="scss" scoped></style>
