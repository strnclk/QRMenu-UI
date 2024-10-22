<template>
  <div class="q-pa-md">
    <q-card class="q-ma-md" flat bordered>
      <q-card-section>
        <div class="text-h6">Resim Yükleme</div>
      </q-card-section>

      <q-card-section>
        <!-- Resim Önizleme Alanı -->
        <div v-if="previewUrl.length" class="q-mb-md row q-col-gutter-md">
          <div v-for="(url, index) in previewUrl" :key="index" class="q-mb-md">
            <img
              :src="url"
              alt="Önizleme"
              style="max-width: 100%; height: auto"
            />
          </div>
        </div>

        <!-- QUploader Kullanımı -->
        <q-uploader
          style="max-width: 300px"
          url="#"
          label="Yüklemek için dosyaları seçin"
          multiple
          accept=".jpg, image/*"
          @rejected="onRejected"
          @added="onFilesAdded"
        />

        <q-btn
          label="Yükle"
          color="primary"
          @click="handleUpload"
          :disable="!files.length"
          class="q-mt-md"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { uploadImageAPI } from "../composables/upload";

export default {
  setup() {
    const $q = useQuasar();
    const files = ref([]); // Seçilen dosyalar
    const previewUrl = ref([]); // Resimlerin önizlemesi

    // Dosya reddedildiğinde çalışacak fonksiyon
    function onRejected(rejectedEntries) {
      $q.notify({
        type: "negative",
        message: `${rejectedEntries.length} dosya geçerli değil`,
      });
    }

    // Dosya eklendiğinde çalışacak fonksiyon
    function onFilesAdded(addedFiles) {
      files.value = addedFiles; // Seçilen dosyaları ekliyoruz

      // Resim önizleme URL'lerini oluşturuyoruz
      previewUrl.value = addedFiles.map((file) => URL.createObjectURL(file));
    }

    // Dosyaları yükleme fonksiyonu
    async function handleUpload() {
      if (!files.value.length) {
        $q.notify({
          type: "warning",
          message: "Lütfen en az bir dosya seçin.",
        });
        return;
      }

      try {
        const formData = new FormData();
        files.value.forEach((file) => {
          // Backend 'image' parametresini beklediği için alanı 'image' olarak adlandırıyoruz.
          formData.append("image", file); // 'image' backend'deki beklenen alan adı
        });

        // uploadImageAPI fonksiyonunu kullanarak dosya yükleme
        const result = await uploadImageAPI(formData); // formData ile API çağrısı

        if (result) {
          $q.notify({
            type: "positive",
            message: "Resimler başarıyla yüklendi!",
          });
        } else {
          $q.notify({
            type: "negative",
            message: "Yükleme sırasında bir hata oluştu.",
          });
        }
      } catch (error) {
        $q.notify({
          type: "negative",
          message: "Yükleme hatası: " + error.message,
        });
      }
    }

    return { onRejected, onFilesAdded, handleUpload, files, previewUrl };
  },
};
</script>

<style scoped>
.q-page {
  max-width: 600px;
  margin: auto;
}

.q-card {
  width: 100%;
}

img {
  border: 1px solid #ccc;
  padding: 10px;
  width: 100px;
}
</style>
