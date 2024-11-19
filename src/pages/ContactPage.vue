<template>
    <div class="contact-page">
      <div class="container">
        <!-- Hizmet Verdiğimiz Kafeler Başta -->
        <section class="cafes">
          <h2 class="cafes-title">Hizmet Verdiğimiz Kafeler</h2>
          <div class="cafes-list">
            <div class="cafe-card">
              <span class="cafe-name">BaristaTime</span>
            </div>
            <div class="cafe-card">
              <span class="cafe-name">Köşebaşı Cafe</span>
            </div>
          </div>
        </section>
  
        <!-- Biz Kimiz Başlık ve Metin -->
        <section class="about">
          <h1 class="page-title">Biz Kimiz?</h1>
          <p class="about-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto non delectus repellendus illum exercitationem amet autem quam ducimus repudiandae soluta.
          </p>
        </section>
  
        <!-- İletişim Bilgileri Kartı -->
        <section class="contact-info">
          <h2 class="info-title">İletişim Bilgilerimiz</h2>
          <p class="phone-text">
  <i class="fa fa-phone" style="display:inline;"></i>
  <a href="tel:+1234567890" class="phone-number" style="display:inline; margin-left: 10px;">0555 555 55 55</a>
</p>

        </section>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: "ContactPage",
  };
  </script>
  
  <style scoped>
  /* Genel Sayfa Stili */
  .contact-page {
  font-family: 'Poppins', sans-serif;
  background: url('src/img/FuPiC.png') no-repeat center center; /* Görseli arka plan olarak ekledik */
  background-size: cover; /* Görselin sayfanın tamamını kaplamasını sağlarız */
  background-attachment: fixed; /* Görselin kaymasını engeller */
  padding: 60px 20px;
  text-align: center;
  color: #fff; /* Yazı rengi beyaz, görsel ile kontrast oluşturmak için */
  min-height: 100vh; /* Sayfa yüksekliğini %100 viewport yüksekliğine ayarlıyoruz */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  /* Hizmet Verdiğimiz Kafeler Bölümü */
  .cafes {
    margin-bottom: 50px;
  }
  
  .cafes-title {
    font-size: 30px; /* Başlık boyutunu biraz küçülttüm */
    font-weight: 600;
    color: #003366;
    margin-bottom: 20px;
  }
  
  .cafes-list {
    display: flex;
    justify-content: space-around;
    gap: 20px;
    flex-wrap: wrap;
  }
  
  .cafe-card {
    background-color: #003366;
    padding: 20px;
    width: 250px; /* Kart genişliğini ayarladım */
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .cafe-name {
    font-size: 20px;
    font-weight: 700;
    color: #ffffff;
    text-align: center;
    transition: color 0.3s ease;
  }
  
  .cafe-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
  }
  
  .cafe-card:hover .cafe-name {
    color: #5259b6; /* Hover efekti */  }
  
  /* Başlık ve Biz Kimiz Bölümü */
  .about {
    margin-bottom: 50px;
  }
  
  .page-title {
    font-size: 36px;
    font-weight: 700;
    color: #003366;
    margin-bottom: 20px;
  }
  
  .about-text {
    font-size: 18px;
    line-height: 1.6;
    color: #fff;
    margin: 0 auto;
    max-width: 800px;
    font-weight: 700;
  }
  
  /* İletişim Bilgileri Kartı */
  .contact-info {
    margin-top: 30px;
    background-color: #15416d;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .info-title {
    font-size: 24px; /* Başlık boyutunu küçülttüm */
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 20px;
  }
  
  .phone-text {
    font-size: 18px; /* Yazı boyutunu küçülttüm */
    color: #ffffff;
  }
  
  .phone-number {
    font-size: 20px; /* Numara boyutunu küçülttüm */
    font-weight: 700;
    color: #00e1ff;
    text-decoration: none;
    transition: color 0.3s ease;
  }
  
  .phone-number:hover {
    color: #5259b6; /* Hover efekti */
  }
  </style>
  