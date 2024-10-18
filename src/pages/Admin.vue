<template>
    <div>
      <!-- Tab Navigation -->
      <q-tabs
        v-model="tab"
        inline-label
        switch-indicator
        class="bg-lime text-dark shadow-2 rounded-lg"
      >
        <q-tab name="companyInfo" icon="business" label=" KURUM BİLGİLERİ" />
        <q-tab name="edit" icon="edit" label="DÜZENLEME" />
      </q-tabs>
  
      <!-- Tab Content -->
      <q-tab-panels
        v-model="tab"
        animated
        transition-prev="fade-out"
        transition-next="fade-in"
      >
        <!-- Company Info Tab Content -->
        <q-tab-panel name="companyInfo" class="q-pa-md">
          <div class="company-info text-center q-mb-md">
            <q-img
              :src="companyLogoUrl"
              alt="Company Logo"
              contain
              style="max-width: 300px; margin: 0 auto"
            />
            <q-card
              class="q-mt-md bg-white text-dark shadow-3 rounded-lg q-pa-md card"
            >
              <q-card-section>
                <!-- Şirket Adı Başlığı -->
                <div class="text-h6 q-mb-xs">Kurum Adı</div>
                <div class="text-h5 text-primary q-mb-sm">{{ companyName }}</div>
  
                <!-- Açıklama Başlığı -->
                <div class="text-h6 q-mt-md q-mb-xs">Açıklama</div>
                <div class="text-body1">
                  {{ companyDomain }}
                </div>
              </q-card-section>
            </q-card>
          </div>
        </q-tab-panel>
  
        <!-- Alarms Tab Content -->
        <q-tab-panel name="edit" class="q-pa-md">
    <div class="text-center text-h6 q-mb-md">Yemek Yönetimi</div>
  
    <q-card class="q-pa-md" bordered shadow="2" style="max-width: 600px; margin: 0 auto;">
      <q-form @submit.prevent="addDish" class="q-gutter-md">
        <div class="q-gutter-md row items-center">
          <div class="col">
            <q-input
              v-model="newDishName"
              label="Yemek Adı"
              required
              filled
              class="bg-light"
              style="border-radius: 8px;"
            />
          </div>
          <div class="col">
            <q-input
              v-model="newDishPrice"
              label="Fiyat"
              type="number"
              required
              filled
              class="bg-light"
              style="border-radius: 8px;"
            />
          </div>
          <div class="col">
            <q-file
              v-model="newDishImageFile"
              label="Yemek Resmi Yükle"
              accept="image/*"
              filled
              required
              hint="Resim dosyasını yükleyin."
              class="bg-light"
              style="border-radius: 8px;"
              @change="updateImagePreview"
            />
          </div>
        </div>
        <q-img
          v-if="imagePreview"
          :src="imagePreview"
          alt="Yemek Resmi Önizlemesi"
          contain
          style="max-width: 150px; margin: 20px auto; border-radius: 8px;"
        />
        <q-btn label="Ekle" type="submit" color="primary" class="q-mt-md" rounded />
      </q-form>
    </q-card>
  
    <div class="q-mt-md">
      <q-card bordered shadow="2" style="max-width: 600px; margin: 0 auto;">
          <q-card-section>
    <div class="text-h5 q-mb-md text-primary">Eklenen Yemekler</div>
    <q-table
      :rows="dishes"
      :columns="columns"
      row-key="id"
      class="q-mt-md"
      flat
      style="max-width: 100%;"
      square
    >
      <!-- Üst kısım düğmesi -->
      <template v-slot:top>
        <q-btn
          @click="clearDishes"
          label="Hepsini Sil"
          color="negative"
          flat
          class="q-ml-md q-mb-md"
          style="border-radius: 12px; padding: 10px 20px;"
        />
      </template>
  
      <!-- Resim hücresi -->
      <template v-slot:body-cell-image="props">
        <q-td :props="props" style="text-align: center;">
          <q-img
            :src="props.row.imageUrl"
            alt="Yemek Resmi"
            contain
            style="max-width: 100px; border-radius: 12px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);"
          />
        </q-td>
      </template>
  
      <!-- İsim hücresi -->
      <template v-slot:body-cell-name="props">
        <q-td :props="props">
          <div class="text-body1 text-weight-medium text-dark">{{ props.row.name }}</div>
        </q-td>
      </template>
  
      <!-- Fiyat hücresi -->
      <template v-slot:body-cell-price="props">
        <q-td :props="props">
          <div class="text-body2 text-weight-medium text-secondary">{{ props.row.price }}₺</div>
        </q-td>
      </template>
  
      <!-- İşlem düğmeleri -->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-pt-sm q-pb-sm">
          <q-btn
            @click="editDish(props.row.id)"
            icon="edit"
            color="orange"
            flat
            class="q-mr-sm"
            style="border-radius: 50%;"
          />
          <q-btn
            @click="removeDish(props.row.id)"
            icon="delete"
            color="negative"
            flat
            style="border-radius: 50%;"
          />
        </q-td>
      </template>
    </q-table>
  </q-card-section>
  
      </q-card>
    </div>
  </q-tab-panel>
  
      </q-tab-panels>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { menu} from "../composables/menu"
  import axios from "axios";
  


  const tab = ref("companyInfo");
  
  // Company data
  const companyLogoUrl = ref("");
  const companyName = ref("");
  const companyDomain= ref("");
  

  
  async function fetchCompanyData() {
    try {
      const response = await axios.get("https://api.qrmenu.fupico.com/api/Menu/getCompanyByUserId", {
        headers: {
          'FuPiCo-Security': `Bearer ${localStorage.getItem('accessToken')}` // Token ekleniyor
        }
      });
  
      // Gelen yanıt verilerini kontrol ediyoruz
      if (response.data) {
        companyLogoUrl.value = response.data.imageUrl; // Logo URL'si
        companyName.value = response.data.name;     // Şirket adı
        companyDomain.value = response.data.domain; // Domain
      }
    } catch (error) {
      console.error("Şirket verileri alınırken hata:", error);
    }
  }
  // Yemek bilgileri
  const newDishName = ref('');
  const newDishPrice = ref('');
  const newDishImageFile = ref(null);
  const imagePreview = ref(null);
  
  // Yemek listesi ve sütun tanımları
  const dishes = ref([]);
  const columns = [
    { name: 'image', label: 'Resim', align: 'left', field: 'imageUrl' },
    { name: 'name', label: 'Yemek Adı', align: 'left', field: 'name' },
    { name: 'price', label: 'Fiyat', align: 'left', field: 'price' },
    { name: 'actions', label: 'İşlemler', align: 'right', field: 'actions' }
  ];
  
  // Yemek ekleme fonksiyonu
  const addDish = () => {
    const newDish = {
      id: Date.now(), // Örnek ID
      name: newDishName.value,
      price: newDishPrice.value,
      imageUrl: imagePreview.value, // Önizleme URL'si
    };
    dishes.value.push(newDish);
  
    // Formu temizle
    newDishName.value = '';
    newDishPrice.value = '';
    newDishImageFile.value = null;
    imagePreview.value = null;
  };
  
  // Resim önizleme güncelleme fonksiyonu
  const updateImagePreview = (event) => {
    const file = event.target.files[0];
    if (file) {
      imagePreview.value = URL.createObjectURL(file); // Önizleme URL'sini oluştur
    } else {
      imagePreview.value = null; // Resim yüklenmediyse
    }
  };
  
  // Yemek silme fonksiyonu
  const removeDish = (id) => {
    dishes.value = dishes.value.filter(dish => dish.id !== id);
  };
  
  // Tüm yemekleri silme fonksiyonu
  const clearDishes = () => {
    dishes.value = [];
  };
  
  onMounted(async() => {
    fetchCompanyData();
  
  });
  
  </script>
  
  <style scoped>
  
  
  </style>
  