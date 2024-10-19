
<template>
    <q-layout class="custom-background" view="hHh lpR fFf">

      <q-page-container class="content-container" align="center">
        <router-view />
      </q-page-container>
  
    </q-layout>
  </template>

<style scoped>
.custom-background {
  background-image: url('/images/rest2.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  min-height: 100vh; /* Tüm sayfayı kaplaması için */
}



.content-container {
  min-height: 100vh; /* İçerik taşsa bile arkaplan sabit kalır */
}
@media (min-width: 600px) {
  .custom-background {
    background-image: url('/images/rest2.jpg'); /* 600px üzeri için yeni resim */
  }
}


</style>