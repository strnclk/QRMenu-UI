<template>
  <div class="all">
    <div class="login-container">
      <div class="login-box">
        <h2><b>Admin Paneli</b></h2>
        <form @submit.prevent="onSubmit">
          <div class="input-group">
            <i class="fas fa-user icon"></i> <!-- Kullanıcı İkonu -->
            <input type="text" v-model="dataReqlogin.username" required placeholder="Kullanıcı Adı" />
          </div>
          <div class="input-group">
            <i class="fas fa-lock icon"></i> <!-- Kilit İkonu -->
            <input type="password" v-model="dataReqlogin.password" required placeholder="Şifre" />
          </div>
          <button type="submit" class="btn-login">Giriş Yap</button>
        </form>
      </div>
    </div>
  </div>
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
  .all {
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  background-image: url('~/src/assets/kagit.png');
  background-size: cover;
  background-position: center;
  height: 100vh;
}
.icon {
  position: absolute;
  left: 10px; /* İkonun inputun içinde uygun bir pozisyonda olmasını sağlamak için */
  top: 50%;
  transform: translateY(-50%);
  color: #a2c71c; /* İkon rengi */
  font-size: 18px; /* İkon boyutu */
}

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .login-box {
    background-color: #ffffff;
    padding: 40px;
    border-radius: 15px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    width: 550px;
    text-align: center;
  }

  h2 {
    color: #4da339;
    margin-bottom: 20px;
    font-size: 28px;
  }

  .input-group {
    position: relative;
    margin-bottom: 20px;
  }

  .input-group input {
    width: 100%;
    padding: 12px 40px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 16px;
    transition: border-color 0.3s;
  }

  .input-group input:focus {
    border-color: #a2c71c;
    outline: none;
  }
  .btn-login {
    background-color: #4da339;
    color: white;
    padding: 12px;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    width: 100%;
    font-size: 18px;
    transition: background-color 0.3s, transform 0.2s;
  }

  .btn-login:hover {
    background-color: #a2c71c;
    transform: scale(1.05);
  }
  </style>

  