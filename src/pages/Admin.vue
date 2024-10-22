<template>
  <div>
    <q-tabs
      v-model="tab"
      inline-label
      switch-indicator
      class="bg-lime text-dark shadow-2 rounded-lg"
      @input="resetViewOnTabChange"
    >
      <q-tab name="companyInfo" icon="business" label="KURUM BİLGİLERİ" />
      <q-tab name="edit" icon="edit" label="MENÜ DÜZENLEME" />
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

        <!-- Geri dön butonu -->
        <q-btn
          v-if="!isFoodGroupVisible"
          label="Geri Dön"
          icon="arrow_back"
          color="primary"
          @click="showFoodGroups"
          class="q-mb-md"
        />

        <div class="q-pa-md edit-tab">
          <!-- Yemek Grupları -->
          <div
            v-if="foodGroups.length > 0 && isFoodGroupVisible"
            class="row q-gutter-md justify-center"
            style="margin: 0 auto; max-width: 100%"
          >
            <q-card
              v-for="(group, index) in foodGroups"
              :key="index"
              class="col-12 col-sm-6 col-md-3 col-lg-2 q-mb-md"
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
              </q-card-section>
            </q-card>
          </div>

          <!-- Yemek Listesi -->
          <div v-if="foods.length > 0 && !isFoodGroupVisible" class="q-pa-md">
            <div class="text-center text-h6 q-mb-md"><h4>Yemekler</h4></div>

            <div class="row q-gutter-md">
              <q-card
                v-for="(food, index) in foods"
                :key="index"
                class="col-12 col-sm-6 col-md-2 q-mb-md"
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

                <!-- Düzenle ve Sil Butonları -->
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

          <div v-else-if="isFoodGroupVisible && foodGroups.length === 0">
            Yemek grubu bulunamadı...
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>

  <!-- Yemek Grubu Güncelleme Dialog -->
  <!-- Yemek Grubu Güncelleme Dialog -->
  <q-dialog v-model="isUpdateDialogOpen" class="wide-dialog">
    <q-card class="wide-card">
      <q-card-section>
        <div class="text-h6">Yemek Grubunu Güncelle</div>
      </q-card-section>
      <q-card-section>
        <!-- Resim Önizleme Alanı -->
        <q-img
          v-if="imagePreviewUrl"
          :src="imagePreviewUrl"
          alt="Preview Image"
          contain
          class="dialog-img-preview"
          @click="triggerFileInputForGroup"
        />
        <!-- Gizli Dosya Seçici -->
        <input
          type="file"
          ref="fileInputForGroup"
          @change="onFileChangeForGroup"
          accept="image/*"
          style="display: none"
        />
        <q-input v-model="selectedGroup.groupName" label="Yemek Grubu Adı" />
        <q-input v-model="selectedGroup.description" label="Açıklama" />
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

  <!-- Yemek Güncelleme Dialog -->
  <q-dialog v-model="isUpdateFoodDialogOpen" class="wide-dialog">
    <q-card class="wide-card">
      <q-card-section>
        <div class="text-h6">Yemeği Güncelle</div>
      </q-card-section>
      <q-card-section>
        <!-- Resim Önizleme Alanı -->
        <q-img
          v-if="foodImagePreviewUrl"
          :src="foodImagePreviewUrl"
          alt="Food Preview Image"
          contain
          class="dialog-img-preview"
          @click="triggerFileInputForFood"
        />
        <!-- Gizli Dosya Seçici -->
        <input
          type="file"
          ref="fileInputForFood"
          @change="onFileChangeForFood"
          accept="image/*"
          style="display: none"
        />
        <q-input v-model="selectedFood.name" label="Yemek Adı" />
        <q-input v-model="selectedFood.description" label="Açıklama" />
        <q-input v-model="selectedFood.price" label="Fiyat" type="number" />
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
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { adminAPIs } from "../composables/admin";
import { uploadImageAPI } from "../composables/upload";
import { Notify } from "quasar";
// Yemek grubu için seçilen dosya ve önizleme URL'si

const selectedImageFileForGroup = ref<File | null>(null); // Yemek grubu için seçilen dosya

// selectedGroup değişkeni, imageUrl özelliği ile birlikte tanımlandı
const selectedGroup = ref({
  foodGroupId: -1,
  groupName: "",
  description: "",
  imageUrl: "", // imageUrl özelliği eklendi
  image: null,
});
// Yemek için seçilen dosya ve önizleme URL'si
const selectedImageFileForFood = ref<File | null>(null);
const foodImagePreviewUrl = ref<string | null>(null); // Resim önizleme URL'si
const foods = ref<Array<any>>([]); // Yemek verisi
const imagePreviewUrl = ref<string | null>(null);
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
// Dosya değiştiğinde ön izleme yapacak fonksiyon
const onFileChangeForGroup = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedImageFileForGroup.value = target.files[0];

    // Resim önizlemesi için base64'e çevirme
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        imagePreviewUrl.value = e.target.result as string; // Ön izleme URL'si güncelleniyor
      }
    };
    reader.readAsDataURL(selectedImageFileForGroup.value); // Dosyayı base64 formatına çeviriyoruz

    // Resmi otomatik olarak yükle ve localStorage'de sakla
    await uploadAndSaveImage();
  }
};
// Resim yükleyip, linkini localStorage'e kaydetme fonksiyonu
const uploadAndSaveImage = async () => {
  try {
    const imageData = await uploadImageAPI(selectedImageFileForGroup.value!); // Resmi yükle
    if (imageData && imageData.imageUrl) {
      const fullImageUrl = `${apiDomain}${imageData.imageUrl}`; // Yüklenen resmin tam URL'si
      localStorage.setItem("foodGroupImageUrl", fullImageUrl); // localStorage'e kaydet
      console.log("Resim yüklendi ve localStorage'e kaydedildi:", fullImageUrl);
    } else {
      console.error("Resim yükleme başarısız.");
    }
  } catch (error) {
    console.error("Resim yükleme hatası:", error);
  }
};
// Yemek gruplarının görünürlüğünü kontrol eden flag
const isFoodGroupVisible = ref(true);

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
// Resim yükleme işlemi
const uploadImageForGroup = async () => {
  if (!selectedImageFileForGroup.value) {
    return null; // Resim yüklenmedi ise null döndür
  }

  try {
    const imageData = await uploadImageAPI(selectedImageFileForGroup.value);
    if (imageData && imageData.imageUrl) {
      return imageData.imageUrl; // Yüklenen resim URL'sini döndür
    } else {
      console.error("Resim URL'si alınamadı.");
      return null;
    }
  } catch (error) {
    console.error("Resim yükleme hatası:", error);
    return null;
  }
};

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
// Yemek güncelleme işlemi
const performUpdateFood = async () => {
  try {
    let imageUrl = selectedFood.value.imageUrl;

    // Eğer yeni bir resim seçildiyse resmi yükle
    if (selectedImageFileForFood.value) {
      const imageData = await uploadImageAPI(selectedImageFileForFood.value);
      if (imageData && imageData.imageUrl) {
        imageUrl = `${apiDomain}${imageData.imageUrl}`;
      }
    }

    const payload = {
      name: selectedFood.value.name,
      description: selectedFood.value.description,
      price: selectedFood.value.price,
      imageUrl: imageUrl,
    };

    await updateFood(selectedFood.value.foodId, payload);
    closeUpdateFoodDialog();

    // Yemekleri tekrar yükleyerek güncelleme işlemini yansıt
    await fetchFoods(selectedGroup.value.foodGroupId);
    console.log("Yemek başarıyla güncellendi.");
  } catch (error) {
    console.error("Yemek güncellenirken hata oluştu:", error);
  }
};

// Yemekleri çekme fonksiyonu
const fetchFoods = async (foodGroupId: any) => {
  try {
    const foodsData = await getFoodsByFoodGroupId(foodGroupId);
    if (foodsData) {
      foods.value = foodsData;
      isFoodGroupVisible.value = false; // Yemekler görünsün, gruplar gizlensin
      console.log("Yemekler başarıyla çekildi:", foodsData);
    } else {
      console.error("Yemek verisi bulunamadı.");
      foods.value = [];
    }
  } catch (error: any) {
    console.error(
      "Yemekler alınırken hata oluştu:",
      error?.response?.data || error.message
    );
  }
};

function resetViewOnTabChange(newTab: string) {
  if (newTab === "companyInfo") {
    isFoodGroupVisible.value = true;
  }
}
// Yemek için dosya seçildiğinde tetiklenecek fonksiyon
const onFileChangeForFood = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    selectedImageFileForFood.value = target.files[0];

    // Resim önizlemesi için base64'e çevirme
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target?.result) {
        foodImagePreviewUrl.value = e.target.result as string; // Ön izleme URL'si güncelleniyor
      }
    };
    reader.readAsDataURL(selectedImageFileForFood.value); // Dosyayı base64 formatına çeviriyoruz

    // Resmi otomatik olarak yükle ve localStorage'de sakla
    await uploadAndSaveFoodImage();
  }
};

// Yemek için resim dosyası seçici tetikleme fonksiyonu
const fileInputForFood = ref<HTMLInputElement | null>(null);
const triggerFileInputForFood = () => {
  if (fileInputForFood.value) {
    fileInputForFood.value.click(); // Dosya seçici tetikleniyor
  }
};

// Resim yükleyip, linkini localStorage'e kaydetme fonksiyonu
const uploadAndSaveFoodImage = async () => {
  try {
    const imageData = await uploadImageAPI(selectedImageFileForFood.value!); // Resmi yükle
    if (imageData && imageData.imageUrl) {
      const fullImageUrl = `${apiDomain}${imageData.imageUrl}`; // Yüklenen resmin tam URL'si
      localStorage.setItem("foodImageUrl", fullImageUrl); // localStorage'e kaydet
      console.log(
        "Yemek resmi yüklendi ve localStorage'e kaydedildi:",
        fullImageUrl
      );
    } else {
      console.error("Resim yükleme başarısız.");
    }
  } catch (error) {
    console.error("Resim yükleme hatası:", error);
  }
};

// Yemek güncelleme dialogunu açma
function openUpdateFoodDialog(food: any) {
  selectedFood.value = { ...food }; // Mevcut yemeği seçiyoruz
  isUpdateFoodDialogOpen.value = true; // Dialogu açıyoruz
  foodImagePreviewUrl.value = selectedFood.value.imageUrl; // Var olan resmi göster
}

// Dialog kapatma fonksiyonu
function closeUpdateFoodDialog() {
  isUpdateFoodDialogOpen.value = false;
  foodImagePreviewUrl.value = null; // Önizlemeyi sıfırla
}

// Dialog durumları ve seçilen yemek
const isUpdateFoodDialogOpen = ref(false);
const selectedFood = ref({
  foodId: 1,
  name: "",
  description: "",
  price: 0,
  imageUrl: "",
});

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click(); // Gizli input'u tetikle
  }
};
const fileInputForGroup = ref<HTMLInputElement | null>(null);
const triggerFileInputForGroup = () => {
  if (fileInputForGroup.value) {
    fileInputForGroup.value.click(); // Dosya seçici tetikleniyor
  }
};
const fileInput = ref<HTMLInputElement | null>(null);
// Yemek grupları verisi
const foodGroups = ref<Array<any>>([]);

// Dialog durumu
const isUpdateDialogOpen = ref(false);

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
const fetchFoodGroups = async () => {
  try {
    const groupsData = await getFoodGroups();
    foodGroups.value = groupsData || [];
  } catch (error) {
    console.error("Yemek grupları alınırken hata:", error);
  }
};

// Geri dönme fonksiyonu
function showFoodGroups() {
  isFoodGroupVisible.value = true; // Yemek gruplarını tekrar göster
}

// Yemek grubu silme işlemi
async function handleDeleteFoodGroup(id: any) {
  try {
    const response = await deleteFoodGroup(id);
    if (response) {
      // Silme işlemi başarılı olursa grupları yeniden çekiyoruz
      await fetchFoodGroups();
    }
  } catch (error) {
    console.error("Yemek grubu silinirken hata:", error);
  }
}

// Yemek silme işlemi
async function handleDeleteFood(id: number) {
  try {
    const response = await deleteFood(id);
    if (response) {
      // Silme işlemi başarılı olursa, yemek listesini yeniden çekiyoruz
      await fetchFoods(selectedGroup.value.foodGroupId);
    }
  } catch (error) {
    console.error("Yemek silinirken hata:", error);
  }
}

// Yemek grubu seçildiğinde yemekleri getiriyoruz
function openUpdateFoodGroupDialog(group: any) {
  selectedGroup.value = { ...group }; // Seçilen grubu ayarlıyoruz
  imagePreviewUrl.value = selectedGroup.value.imageUrl || null; // Var olan resim URL'sini gösteriyoruz

  isUpdateDialogOpen.value = true; // Dialogu açıyoruz

  // Yemekleri çekme işlemi
  // if (selectedGroup.value.foodGroupId) {
  //   fetchFoods(selectedGroup.value.foodGroupId); // Seçilen yemek grubunun yemeklerini getiriyoruz
  // }
}
// Yemek grubu güncelleme işlemi
// Yemek grubunu güncelleme fonksiyonu
// Yemek grubunu güncelleme işlemi
const performUpdateFoodGroup = async () => {
  try {
    let imageUrl = selectedGroup.value.imageUrl; // Mevcut imageUrl

    // Eğer yeni bir resim seçildiyse, resmi yükle ve URL'yi al
    if (selectedImageFileForGroup.value) {
      const imageData = await uploadImageAPI(selectedImageFileForGroup.value);
      if (imageData && imageData.imageUrl) {
        imageUrl = `${apiDomain}${imageData.imageUrl}`; // Tam URL'yi oluştur
      }
    }

    // Güncelleme isteği, güncellenmiş imageUrl ile gönderiliyor
    const payload = {
      groupName: selectedGroup.value.groupName,
      description: selectedGroup.value.description,
      imageUrl: imageUrl, // Güncellenmiş veya eski imageUrl
    };

    await updateFoodGroup(selectedGroup.value.foodGroupId, payload);
    closeUpdateDialog(); // Dialogu kapat
    await fetchFoodGroups(); // Yemek gruplarını tekrar yükle (otomatik yenileme)
    console.log("Yemek grubu başarıyla güncellendi.");
  } catch (error) {
    console.error("Yemek grubu güncellenirken hata oluştu:", error);
  }
};

// Yemek gruplarını çekme fonksiyonu

// Dialog kapatma

// Dialog kapatma fonksiyonları
// Dialog kapatma fonksiyonları
function closeUpdateDialog() {
  isUpdateDialogOpen.value = false;
  imagePreviewUrl.value = null; // Önizlemeyi sıfırla
}

// Sayfa yüklendiğinde veriyi çek
onMounted(async () => {
  await fetchCompanyData();
  await fetchFoodGroups();
  // Orijinal verileri kaydediyoruz
  originalCompanyDto.value = { ...companyDto.value };
  if (selectedGroup.value.foodGroupId > 0 && !isUpdateDialogOpen.value) {
    await fetchFoods(selectedGroup.value.foodGroupId); // Yemekleri sadece ID 0'dan büyükse ve dialog açık değilse çek
  }
});
</script>

<style scoped>
.q-tab-panel {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.q-pa-md.edit-tab {
  width: 100%;
}

.row {
  margin-left: auto;
  margin-right: auto;
  max-width: 1600px;
}

.q-dialog {
  max-width: 600px;
  max-height: 1000px;
}

.q-card {
  max-height: 450px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 500px;
  margin: auto;
  margin-bottom: 5px;
}

.q-img {
  display: block;
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 0 auto;
}

.q-dialog .q-card {
  max-width: 600px;
}

.q-dialog .q-card-section {
  text-align: center;
}

.q-dialog .q-card-actions {
  justify-content: flex-end;
}

/* Yemek grubu ve yemek güncelleme dialoglarının genişlik ve yükseklik ayarları */
.wide-dialog .q-card {
  max-width: 400px;
  max-height: 90vh;
  min-height: 60vh;
}

.wide-card {
  min-width: 300px;
  min-height: 200px;
}

.dialog-img-preview {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin: 10px auto;
}

/* Responsive adjustments for smaller screens (mobile and tablets) */
@media screen and (max-width: 1024px) {
  /* Kart genişliği ve yüksekliği orta ekranlar için */
  .q-dialog,
  .q-card {
    max-width: 90%;
    max-height: 80vh;
  }

  .q-img,
  .dialog-img-preview {
    width: 150px;
    height: 150px;
  }

  .wide-dialog .q-card {
    max-width: 80%;
    min-height: 50vh;
  }

  .wide-card {
    min-width: 250px;
  }
}

@media screen and (max-width: 600px) {
  /* Kart genişliği ve yüksekliği mobil cihazlar için */
  .q-dialog,
  .q-card {
    max-width: 100%;
    max-height: 90vh;
  }

  .q-img,
  .dialog-img-preview {
    width: 120px;
    height: 120px;
  }

  .wide-dialog .q-card {
    max-width: 100%;
    min-height: 50vh;
  }

  .wide-card {
    min-width: 100%;
  }

  .q-dialog .q-card-actions {
    justify-content: center; /* Mobilde butonları ortaya al */
  }
}
</style>
