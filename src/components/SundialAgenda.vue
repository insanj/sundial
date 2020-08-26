<template>
  <div>
  </div>
</template>

<style>

</style>

<script>
import Vue from 'vue'
import { MdButton, MdContent, MdTabs } from 'vue-material/dist/components'

Vue.use(MdButton)
Vue.use(MdContent)
Vue.use(MdTabs)

export default {
  name: 'SundialAgenda',
  props: {
    msg: String
  }
}
</script>