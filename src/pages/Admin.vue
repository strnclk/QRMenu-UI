<template>
  <div>
    <q-tabs
      v-model="tab"
      inline-label
      switch-indicator
      class="bg-lime text-dark shadow-2 rounded-lg"
    >
      <q-tab name="companyInfo" icon="business" label="KURUM BİLGİLERİ" />
      <q-tab name="edit" icon="edit" label="DÜZENLEME" />
    </q-tabs>

    <q-tab-panels
      v-model="tab"
      animated
      transition-prev="fade-out"
      transition-next="fade-in"
    >
      <!-- Kurum Bilgileri Tabı -->
      <q-tab-panel name="companyInfo" class="q-pa-md">
        <div class="company-info text-center q-mb-md">
          <q-img
            :src="companyLogoUrl"
            alt="Company Logo"
            contain
            style="max-width: 300px; margin: 0 auto"
          />
          <q-card class="q-mt-md text-dark shadow-3 rounded-lg q-pa-md card">
            <q-card-section class="card-section">
              <div class="text-h6 q-mb-xs shadow-3">Kurum Adı</div>
              <div class="text-h5 q-mb-sm">{{ companyName }}</div>
              <div class="text-h6 q-mt-md q-mb-xs shadow-3">Açıklama</div>
              <div class="text-body1">
                {{ companyDomain || "Açıklama Yok" }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </q-tab-panel>

      <!-- Yemek Grupları Düzenleme Tabı -->
      <q-tab-panel name="edit" class="q-pa-md">
        <div class="text-center text-h6 q-mb-md">Yemek Yönetimi</div>
        <div class="q-pa-md edit-tab">
          <div v-if="foodGroups.length > 0" class="row q-gutter-md">
            <q-card
              v-for="(group, index) in foodGroups"
              :key="index"
              class="col-12 col-sm-6 col-md-4 q-mb-md"
              bordered
              flat
            >
              <q-card-section>
                <q-img
                  :src="group.imageUrl"
                  alt="Food Group Image"
                  contain
                  style="max-width: 100%"
                />
                <div class="text-h6 q-mt-md">{{ group.groupName }}</div>
                <div class="text-body1 text-grey-7">
                  {{ group.description || "Açıklama Yok" }}
                </div>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn
                  flat
                  icon="edit"
                  color="primary"
                  @click="openUpdateFoodGroupDialog(group)"
                >
                  Düzenle
                </q-btn>
                <q-btn
                  flat
                  icon="delete"
                  color="negative"
                  @click="handleDeleteFoodGroup(group.foodGroupId)"
                >
                  Sil
                </q-btn>
                <q-btn
                  flat
                  icon="visibility"
                  color="secondary"
                  @click="fetchFoods(group.foodGroupId)"
                >
                  Yemekler
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
          <div v-else>Yemek grubu bulunamadı...</div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Yemek Grubu Güncelleme Dialog -->
    <q-dialog v-model="isUpdateDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Yemek Grubunu Güncelle</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="selectedGroup.groupName" label="Yemek Grubu Adı" />
          <q-input v-model="selectedGroup.description" label="Açıklama" />
          <q-file
            v-model="selectedGroup.image"
            label="Resim"
            @change="performUploadImage"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="İptal" @click="closeUpdateDialog" />
          <q-btn
            flat
            label="Güncelle"
            color="primary"
            @click="performUpdateFoodGroup"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Yemekler Listesi -->
    <div v-if="foods.length > 0" class="q-pa-md">
      <h4>Yemekler</h4>
      <div class="row q-gutter-md">
        <!-- Yemekler için kartlar -->
        <q-card
          v-for="(food, index) in foods"
          :key="index"
          class="col-12 col-sm-6 col-md-4 q-mb-md"
          bordered
          flat
        >
          <q-card-section>
            <q-img
              :src="food.imageUrl"
              alt="Food Image"
              contain
              style="max-width: 100%"
            />
            <div class="text-h6 q-mt-md">{{ food.name }}</div>
            <div class="text-body1">
              {{ food.description || "Açıklama Yok" }}
            </div>
            <div class="text-body2">Fiyat: {{ food.price }} ₺</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              flat
              icon="edit"
              color="primary"
              @click="openUpdateFoodDialog(food)"
            >
              Düzenle
            </q-btn>
            <q-btn
              flat
              icon="delete"
              color="negative"
              @click="handleDeleteFood(food.foodId)"
            >
              Sil
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <q-dialog v-model="isUpdateFoodDialogOpen">
      <q-card>
        <q-card-section>
          <div class="text-h6">Yemeği Güncelle</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="selectedFood.name" label="Yemek Adı" />
          <q-input v-model="selectedFood.description" label="Açıklama" />
          <q-input v-model="selectedFood.price" label="Fiyat" type="number" />
          <q-file
            v-model="selectedFood.image"
            label="Resim"
            @change="performUploadImage"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="İptal" @click="closeUpdateFoodDialog" />
          <q-btn
            flat
            label="Güncelle"
            color="primary"
            @click="performUpdateFood"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { menu } from "../composables/admin";

// Tab ayarları
const tab = ref("companyInfo");

const {
  getCompany,
  getFoodGroups,
  deleteFoodGroup,
  updateFoodGroup,
  uploadImageAPI,
  getFoodsByFoodGroupId,
  deleteFood,
  updateFood,
} = menu();

// Şirket bilgileri
const companyLogoUrl = ref("");
const companyName = ref("");
const companyDomain = ref("");

// Yemek grupları verisi
const foodGroups = ref([]);

// Yemekler verisi
const foods = ref([]);

// Dialog durumu
const isUpdateDialogOpen = ref(false);
const selectedGroup = ref({
  groupName: "",
  description: "",
  image: null,
});

const isUpdateFoodDialogOpen = ref(false);
const selectedFood = ref({
  name: "",
  description: "",
  price: 0,
  image: null,
});

// Şirket verilerini çekme fonksiyonu
async function fetchCompanyData() {
  try {
    const response = await getCompany();
    if (response) {
      companyLogoUrl.value = response.imageUrl;
      companyName.value = response.name;
      companyDomain.value = response.domain;
    }
  } catch (error) {
    console.error("Şirket verileri alınırken hata:", error);
  }
}

// Yemek gruplarını çekme fonksiyonu
async function fetchFoodGroups() {
  try {
    const groupsData = await getFoodGroups();
    foodGroups.value = groupsData || [];
  } catch (error) {
    console.error("Yemek grupları alınırken hata:", error);
  }
}

// Yemekleri çekme fonksiyonu
async function fetchFoods(foodGroupId) {
  try {
    const foodsData = await getFoodsByFoodGroupId(foodGroupId);
    foods.value = foodsData || [];
  } catch (error) {
    console.error("Yemekler alınırken hata:", error);
  }
}

// Yemek grubu silme işlemi
async function handleDeleteFoodGroup(id) {
  try {
    await deleteFoodGroup(id);
    await fetchFoodGroups(); // Listeyi güncelle
  } catch (error) {
    console.error("Yemek grubu silinirken hata:", error);
  }
}

// Yemek silme işlemi
async function handleDeleteFood(id) {
  try {
    await deleteFood(id);
    await fetchFoods(selectedGroup.value.foodGroupId); // Yemek listesini güncelle
  } catch (error) {
    console.error("Yemek silinirken hata:", error);
  }
}

// Güncelleme dialogunu açma
function openUpdateFoodGroupDialog(group) {
  selectedGroup.value = { ...group, image: null };
  isUpdateDialogOpen.value = true;
}

// Yemek grubu güncelleme işlemi
async function performUpdateFoodGroup() {
  try {
    await updateFoodGroup(selectedGroup.value.foodGroupId, selectedGroup.value);
    isUpdateDialogOpen.value = false;
    await fetchFoodGroups(); // Listeyi güncelle
  } catch (error) {
    console.error("Yemek grubu güncellenirken hata:", error);
  }
}

// Yemek güncelleme işlemi
async function performUpdateFood() {
  try {
    await updateFood(selectedFood.value.foodId, selectedFood.value);
    isUpdateFoodDialogOpen.value = false;
    await fetchFoods(selectedGroup.value.foodGroupId); // Listeyi güncelle
  } catch (error) {
    console.error("Yemek güncellenirken hata:", error);
  }
}

// Yemek güncelleme dialogunu açma
function openUpdateFoodDialog(food) {
  selectedFood.value = { ...food, image: null };
  isUpdateFoodDialogOpen.value = true;
}

// Dialog kapatma
function closeUpdateDialog() {
  isUpdateDialogOpen.value = false;
}
function closeUpdateFoodDialog() {
  isUpdateFoodDialogOpen.value = false;
}

// Resim yükleme işlemi
async function performUploadImage(file) {
  try {
    const imageUrl = await uploadImageApi(file); // İsim değişikliği yapıldı
    selectedGroup.value.imageUrl = imageUrl; // Resim URL'sini güncelle
  } catch (error) {
    console.error("Resim yüklenirken hata:", error);
  }
}

// Sayfa yüklendiğinde veriyi çek
onMounted(async () => {
  await fetchCompanyData(); // Şirket verilerini yüklüyoruz
  await fetchFoodGroups(); // Yemek grubu verilerini yüklüyoruz
});
</script>

<style scoped>
.q-card {
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
}
.q-card:hover {
  transform: scale(1.02);
}
.q-input {
  width: 100%;
}
</style>
