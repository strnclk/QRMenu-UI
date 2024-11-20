<template>
  <footer class="footer">
    <div class="footer-content">
      <a href="https://www.fupico.com" target="_blank" class="footer-link">
        © {{ currentYear }} FuPiCo
      </a>
      <a href="/contact" class="footer-contact">
        <span class="contact-text">Bizimle İletişime Geçebilirsiniz</span>
      </a>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed } from "vue";
export default {
  name: "FooterComponent",
  setup() {
    const currentYear = computed(() => new Date().getFullYear());
    return { currentYear };
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

.footer {
  display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(70, 84, 148, 0.8);
    padding: 8px 12px;
    border-top: 2px solid #22d3ff;
    color: #f0f0f0;
    font-family: 'Poppins', sans-serif;
    box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.2);
    bottom: 0;
    width: 100%;
}

.footer-content {
  display: flex;
  flex-direction: column; /* Elemanları dikey yerleştir */
  align-items: center;
  gap: 4px; /* Daha küçük gap */
  width: 100%;
  max-width: 600px; /* Genişlik sınırı daha küçük yapıldı */
}

.footer-link {
  color: #5692ca; /* Vurgulu renk */
  text-decoration: none;
  font-size: 12px; /* Daha küçük yazı boyutu */
  font-weight: 600;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #ffffff; /* Hoverda beyaz */
}

.footer-contact {
  color: #00e1ff; /* Açık mavi renk */
  text-decoration: none;
  font-size: 10px; /* Daha küçük yazı boyutu */
  font-weight: 600;
  padding: 4px 8px; /* Daha küçük padding */
  border-radius: 16px; /* Daha yuvarlak köşeler */
  background-color: #003366; /* Derin mavi arka plan */
  transition: background-color 0.3s ease, color 0.3s ease;
}

.footer-contact:hover {
  background-color: #256685; /* Hoverda vurgulu renk */
  color: #ffffff; /* Hoverda beyaz yazı */
}

.contact-text {
  font-size: 10px; /* Daha küçük yazı boyutu */
  transition: opacity 0.3s ease;
}

.footer-contact:hover .contact-text {
  opacity: 0; /* Hoverda metni kaybolması */
}
</style>
