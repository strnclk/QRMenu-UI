<template>
  <footer class="footer">
    <a href="https://www.fupico.com" target="_blank" class="footer-link">
      © {{ currentYear }} FuPiCo
    </a>
    <a href="tel:+905438194976" class="footer-phone">
      <q-icon name="phone" size="24px" />
    </a>
  </footer>
</template>

<script lang="ts" setup>
import { computed } from "vue";
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px 0;
  border-top: 1px solid #ff0000;
  gap: 20px;
}

.footer-link {
  color: #ff0000;
  text-decoration: none;
  font-size: 18px;
  font-weight: bold;
}

.footer-phone {
  color: #00e1ff;
  text-decoration: none;
}

.footer-phone q-icon {
  cursor: pointer;
}
</style>
