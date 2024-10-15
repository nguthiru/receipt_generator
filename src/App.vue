<template>
  <div class="app-container flex flex-col h-screen">

    <NavBar/>
    <main class="h-full">

      <router-view/>
    </main>
  </div>
</template>

<style lang="scss"></style>

<script setup>
import NavBar from '@/components/NavBar.vue';
</script>
