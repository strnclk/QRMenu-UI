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
          <!-- Kurum Bilgileri -->
          <q-card bordered flat class="q-pa-md text-center">
            <!-- Resim Alanı -->
            <q-img
              @click="triggerFileInput"
              :src="
                previewUrl || companyDto.imageUrl || '/images/fupico_logo.jpeg'
              "
              alt="Company Logo"
              style="max-width: 300px; margin: 0 auto"
              v-if="previewUrl || companyDto.imageUrl"
            />
            <q-img
              src="/images/fupico_logo.jpeg"
              alt="Default Company Logo"
              contain
              ratio="16/9"
              style="max-width: 300px; margin: 0 auto"
              v-else
            />

            <!-- Gizli Dosya Seçici -->
            <input
              type="file"
              ref="fileInput"
              @change="onFileChange"
              accept="image/*"
              style="display: none"
            />

            <!-- Kurum İsmi -->
            <div class="q-mt-md q-col-12 q-md-6 q-lg-4 q-px-md q-px-lg q-px-xl">
              <div class="text-h6 q-mb-xs" style="color: red">Kurum Adı</div>
              <q-input
                v-model="companyDto.name"
                label="Kurum Adı"
                outlined
                dense
                class="text-center"
                style="text-align: center; font-size: larger; max-width: 100%"
              />
            </div>

            <!-- Açıklama -->
            <div class="q-mt-md q-col-12 q-md-6 q-lg-4 q-px-md q-px-lg q-px-xl">
              <div class="text-h6 q-mb-xs" style="color: red">Açıklama</div>
              <q-input
                v-model="companyDto.domain"
                label="Açıklama"
                outlined
                dense
                class="text-center"
                style="text-align: center; font-size: larger; max-width: 100%"
              />
            </div>
            <!-- Değişiklikleri Kaydet Butonu -->
            <q-btn
              v-if="isModified"
              label="Değişiklikleri Kaydet"
              color="primary"
              @click="saveChanges"
              class="q-mt-md"
            />
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
          <q-file v-model="selectedGroup.image" label="Resim" />
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
          <q-file v-model="selectedFood.image" label="Resim" />
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

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { adminAPIs } from "../composables/admin";
import { uploadImageAPI } from "../composables/upload";
const originalCompanyDto = ref({
  companyId: 0,
  name: "",
  domain: "",
  imageUrl: "",
});
const companyDto = ref({
  companyId: 0,
  name: "",
  domain: "",
  imageUrl: "",
});
// Değişiklikleri izlemek için kullanılan flag
const isModified = ref(false);

watch(
  [companyDto, originalCompanyDto],
  ([newVal, oldVal]) => {
    isModified.value =
      newVal.name !== originalCompanyDto.value.name ||
      newVal.domain !== originalCompanyDto.value.domain ||
      newVal.imageUrl !== originalCompanyDto.value.imageUrl; // imageUrl farkını da izleyelim
  },
  { deep: true }
);

// Verileri kaydetmek için fonksiyon
const saveChanges = async () => {
  const payload = {
    name: companyDto.value.name,
    domain: companyDto.value.domain,
    imageUrl: companyDto.value.imageUrl, // Resim URL'sini ekliyoruz
  };

  const response = await addOrUpdateCompany(payload);

  if (response) {
    console.log("Şirket başarıyla kaydedildi:", response);
  } else {
    console.error("Şirket kaydedilirken hata oluştu.");
  }
};

// Sayfa yüklendiğinde orijinal verileri çekiyoruz

// Tab ayarları
const tab = ref("companyInfo");

// Reactive değişkenler tanımlanıyor
const selectedFile = ref<File | null>(null);
const previewUrl = ref<string | undefined>(undefined); // string | undefined olarak değiştirildi
const companyLogoUrl = ref<string | undefined>(
  localStorage.getItem("companyLogoUrl") || undefined
); // null yerine undefined

const isImageDialogOpen = ref(false);

// Dialog açma fonksiyonu
function openImageDialog() {
  isImageDialogOpen.value = true;
}

// Dialog kapama fonksiyonu
function closeImageDialog() {
  isImageDialogOpen.value = false;
}

// Dosya değişiminde çağrılacak fonksiyon
const onFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0];

    // Ön izleme için FileReader ile base64 formatına çevirme
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        previewUrl.value = e.target.result as string; // Ön izleme için URL'yi güncelle
      }
    };
    reader.readAsDataURL(selectedFile.value); // Dosyayı base64 formatına çevir

    // Resmi otomatik olarak yükle
    await uploadImage();
  } else {
    console.error("Dosya bulunamadı veya geçersiz.");
  }
};

// Resim yükleme ve API'ye istek atma fonksiyonu
const apiDomain = "https://api.qrmenu.fupico.com"; // API domainini tanımla

const uploadImage = async () => {
  if (!selectedFile.value) {
    console.error("Lütfen bir dosya seçin.");
    return;
  }

  try {
    const imageData = await uploadImageAPI(selectedFile.value); // Resmi yükle
    if (imageData && imageData.imageUrl) {
      // Eğer gelen imageUrl varsa, tam URL'yi oluştur
      const fullImageUrl = `${apiDomain}${imageData.imageUrl}`;

      companyLogoUrl.value = fullImageUrl; // Yüklenen tam resim URL'sini güncelle
      localStorage.setItem("companyLogoUrl", fullImageUrl); // localStorage'ye yaz
      companyDto.value.imageUrl = fullImageUrl;
      previewUrl.value = undefined; // Ön izlemeyi sıfırla
      console.log("Yüklenen resim URL:", fullImageUrl);
    } else {
      console.error("Resim URL'si alınamadı.");
    }
  } catch (error) {
    console.error("Resim yükleme hatası:", error);
  }
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click(); // Gizli input'u tetikle
  }
};

const fileInput = ref<HTMLInputElement | null>(null);
// Yemek grupları verisi
const foodGroups = ref<Array<any>>([]);
const foods = ref<Array<any>>([]);

// Dialog durumu
const isUpdateDialogOpen = ref(false);
const selectedGroup = ref({
  foodGroupId: 1,
  groupName: "",
  description: "",
  imageUrl: "",
  image: null,
});

const isUpdateFoodDialogOpen = ref(false);
const selectedFood = ref({
  foodId: 1,
  name: "",
  description: "",
  price: 0,
  image: null,
});

// Admin menü fonksiyonları
const {
  getCompany,
  getFoodGroups,
  deleteFoodGroup,
  updateFoodGroup,
  getFoodsByFoodGroupId,
  deleteFood,
  updateFood,
  addOrUpdateCompany,
} = adminAPIs();

// Şirket verilerini çekme fonksiyonu
async function fetchCompanyData() {
  try {
    const response = await getCompany();

    if (response) {
      companyDto.value = response;
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
async function fetchFoods(foodGroupId: any) {
  try {
    const foodsData = await getFoodsByFoodGroupId(foodGroupId);
    foods.value = foodsData || [];
  } catch (error) {
    console.error("Yemekler alınırken hata:", error);
  }
}

// Yemek grubu silme işlemi
async function handleDeleteFoodGroup(id: any) {
  try {
    await deleteFoodGroup(id);
    await fetchFoodGroups(); // Listeyi güncelle
  } catch (error) {
    console.error("Yemek grubu silinirken hata:", error);
  }
}

// Yemek silme işlemi
async function handleDeleteFood(id: number) {
  try {
    await deleteFood(id);
    await fetchFoods(selectedGroup.value.foodGroupId); // Yemek listesini güncelle
  } catch (error) {
    console.error("Yemek silinirken hata:", error);
  }
}

// Güncelleme dialogunu açma
function openUpdateFoodGroupDialog(group: any) {
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
    if (selectedFood.value && selectedFood.value.foodId) {
      await updateFood(selectedFood.value.foodId, selectedFood.value);
      isUpdateFoodDialogOpen.value = false;
      if (selectedGroup.value && selectedGroup.value.foodGroupId) {
        await fetchFoods(selectedGroup.value.foodGroupId); // Listeyi güncelle
      }
    } else {
      console.error("Yemek bilgileri eksik");
    }
  } catch (error) {
    console.error("Yemek güncellenirken hata:", error);
  }
}

// Yemek güncelleme dialogunu açma
function openUpdateFoodDialog(food: any) {
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

// Sayfa yüklendiğinde veriyi çek
onMounted(async () => {
  await fetchCompanyData();
  await fetchFoodGroups();
  // Orijinal verileri kaydediyoruz
  originalCompanyDto.value = { ...companyDto.value };
});
</script>
