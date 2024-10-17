<template>
    <q-page class="login-page flex flex-center">
      <q-card class="q-pa-md" style="width: 350px">
        <q-card-section>
          <div class="text-h6 text-center text-bold q-mb-md">QRMenu</div>
        </q-card-section>
  
        <q-card-section>
          <q-form @submit="onSubmit" class="q-gutter-md">
            <!-- Kullanıcı Adı Input -->
            <q-input
              v-model="dataReqlogin.username"
              label="Kullanıcı Adı"
              filled
              clearable
              :rules="[val => !!val || 'Kullanıcı Adı Zorunludur']"
            />
  
            <!-- Şifre Input -->
            <q-input
              v-model="dataReqlogin.password"
              label="Şifre"
              type="password"
              filled
              clearable
              :rules="[val => !!val || 'Şifre Zorunludur']"
            />
  
          
  
            <!-- Giriş Butonu -->
            <q-btn
              type="submit"
              label="Giriş Yap"
              color="primary"
              unelevated
              class="full-width"
              no-caps
            />
          </q-form>
        </q-card-section>
  
        <q-card-actions align="center">
          <q-btn flat label="Şifremi Unuttum" color="primary" class="q-pa-none text-bold" no-caps/>
        </q-card-actions>
      </q-card>
    </q-page>
  </template>
  
  <script setup>
  import { ref } from "vue";

  import {useLoginApi} from '../composables/login'
  

  const {login }= useLoginApi();


  // Form verilerini tutmak için reactive bir nesne oluşturuyoruz
  const dataReqlogin = ref({
    username: "",
    password: "",
  });
  const dataResponse =ref({});
  // Form gönderme fonksiyonu
  const onSubmit = async () => {
    let result = await login(dataReqlogin.value);


  };
  </script>
  
  <style scoped>
  /* Flexbox ile sayfayı ortalamak için stil */
  .login-page {
    min-height: 100vh;
  }
  .q-card {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  }
  .full-width {
    width: 100%;
  }
  </style>
  