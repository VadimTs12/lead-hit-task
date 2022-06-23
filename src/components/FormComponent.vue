<template>
  <form action="">
    <div class="flex flex-col w-1/3 mx-auto">
      <label for="site_id" class="text-xl ">Введите ID сайта</label>
      <input type="text"
             name="site_id"
             id="site_id"
             v-model="siteID"
             @input="handlerID"
             placeholder="id сайта"
             class="border-gray-200 border-2 rounded-md p-2 focus:outline-blue-400"
      >
      <div class="h-8"><span v-if="error" class="text-red-400 text-xs">id сайта должен содержать 24 символа</span></div>
    </div>
    <button type="submit" @click.prevent="auth" class="p-2 hover:bg-blue-600 hover:text-white rounded-md duration-300 bg-blue-400 text-black mx-2">Войти</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "FormComponent",
  data() {
    return {
      siteID: '',
      error: false
    }
  },
  methods: {
    handlerID() {
      this.error = false
    },
    async auth() {
      try {
        if (this.siteID.length === 24) {
         const response =  await axios.get('https://track-api.leadhit.io/client/test_auth', {
            headers: {
              'Api-Key': '5f8475902b0be670555f1bb3:eEZn8u05G3bzRpdL7RiHCvrYAYo',
              'Leadhit-Site-Id' : this.siteID
            }
          })
          console.log(response)
          if (response.data.message === 'ok') {
            await localStorage.setItem('leadhit-site-id', this.siteID)
            await this.$router.push('/analytics')
          }
        } else {
          this.error = true
        }
      } catch (e) {
        console.log(e.messages)
      }
    }
  }
}
</script>

<style scoped>
</style>
