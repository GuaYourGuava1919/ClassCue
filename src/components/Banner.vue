<template>
    <div class="banner-wrapper">
      <div class="title-area">
        <h1>ClassCue</h1>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped lang="scss">

  .banner-wrapper {
    margin: 1.5rem;
    text-align: center;
    width: 50%;
  }

  .title-area{
    font-family: "Playwrite DK Loopet", cursive;
    color: $primary-color;

  }
  
  .title-area h1 {
    font-size: 48px;
    margin-bottom: 0.5rem;
    font-weight: 700;
    letter-spacing: 1px;
  }
  
  .title-area h2 {
    font-size: 32px;
    font-weight: 400;

  }
  
  .teacher-area {
    background-color: $primary-color;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    color: $text-color;
    border-radius: 16px;
    margin-top: 1rem;
    padding: 10px 15px;
    font-size: 18px;
  }
  </style>
  