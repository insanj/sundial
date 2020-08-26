<template>
  <div>
    <md-app-toolbar class="md-primary">
      <md-button class="md-icon-button">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">My Title</span>
    </md-app-toolbar>
  </div>
</template>

<style>

</style>

<script>
import Vue from 'vue'
import VueMaterial from 'vue-material'

Vue.use(VueMaterial)

export default {
  name: 'SundialNav',
  props: {
    msg: String
  }
}
</script>