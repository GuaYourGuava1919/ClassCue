<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import OnboardingDialog from './components/OnboardingDialog.vue'
</script>

<template>
  <div class="app">
    <Navbar/>
    <router-view />
    <Footer/>
    <OnboardingDialog />
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Playwrite+DK+Loopet:wght@100..400&display=swap');

body, html {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow-x: hidden;  /* 防止橫向滾動條 */
  color: #444545;
}



</style>
