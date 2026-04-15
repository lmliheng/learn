<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const styleObj = {
    isActive:  'active',
    isLight: 'light',
}

</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
     
      <nav>
        <RouterLink to="/home" >Home</RouterLink> |
        <RouterLink to="/about">About</RouterLink> |
        <RouterLink to="/watch-test">WatchTest</RouterLink> |
        <RouterLink to="/tab-test">TabTest</RouterLink> |
        <RouterLink to="/props-view">PropsView</RouterLink> |
        <RouterLink to="/model-test-view">ModelTestView</RouterLink>
      </nav>

    </div>
  </header>

  <RouterView :class="styleObj"></RouterView>
</template>

<style scoped>

</style>
