
<template>
    <q-layout class="custom-background" view="hHh lpR fFf">

      <q-page-container class="content-container" align="center">
        <router-view />
      </q-page-container>
  
    </q-layout>
  </template>

<style scoped>
.custom-background {
  background-image: url('/images/rest1.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Tüm sayfayı kaplaması için */
}
.content-container {
  min-height: 100vh; /* İçerik taşsa bile arkaplan sabit kalır */
}
</style>