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
          <q-card class="q-mt-md text-dark shadow-3 rounded-lg q-pa-md card">
            <q-card-section class="card-section">
              <!-- Şirket Adı Başlığı -->
              <div class="text-h6 q-mb-xs shadow-3">Kurum Adı</div>
              <div class="text-h5 q-mb-sm">{{ companyName }}</div>

              <!-- Açıklama Başlığı -->
              <div class="text-h6 q-mt-md q-mb-xs shadow-3">Açıklama</div>
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

        <div class="q-pa-md edit-tab">
          <!-- Yeni Kart Ekleme -->
          <div class="q-mb-md">
            <q-input
              v-model="newCardName"
              label="Yeni Ürün Grubu Ekle"
              outlined
              dense
            />
            <br />
            <q-btn
              label="Ekle"
              color="primary"
              class="q-ml-sm"
              @click="addCard"
            />
          </div>

          <!-- Kartlar -->
          <div class="row q-gutter-md">
            <q-card
              v-for="(card, index) in cards"
              :key="index"
              class="col-12 col-sm-6 col-md-4 q-mb-md"
              bordered
              flat
              @click="selectCard(index)"
            >
              <q-card-section>
                <!-- İsim Düzenleme -->
                <q-input
                  v-if="card.editMode"
                  v-model="card.name"
                  outlined
                  dense
                  label="Ad"
                  @blur="updateCard(index)"
                />
                <div v-else>
                  <span>{{ card.name }}</span>
                </div>
              </q-card-section>
              <q-card-actions align="right">
                <!-- Düzenleme Butonu -->
                <q-btn
                  icon="edit"
                  color="primary"
                  flat
                  round
                  @click.stop="toggleEditMode(index)"
                />
                <!-- Silme Butonu -->
                <q-btn
                  icon="delete"
                  color="negative"
                  flat
                  round
                  @click.stop="removeCard(index)"
                />
              </q-card-actions>
            </q-card>
          </div>

          <!-- Tıklanan karta ait veri ekleme alanı -->
          <div v-if="selectedCard !== null" class="q-mt-md">
            <q-card class="q-pa-md">
              <q-card-section>
                <h4>{{ cards[selectedCard].name }} -</h4>
                <div class="row q-gutter-md">
                  <q-input
                    v-model="newItemName"
                    label="Ürün Adı"
                    class="col-12 col-md-4"
                    outlined
                    dense
                  />
                  <q-input
                    v-model="newItemPrice"
                    label="Fiyat Bilgisi Giriniz"
                    class="col-12 col-md-4"
                    outlined
                    dense
                  />
                </div>
                <br />
                <q-file
                  v-model="newItemImage"
                  label="Resim Ekleyin"
                  outlined
                  dense
                  accept="image/*"
                  @added="onFileAdded"
                />
                <q-btn
                  label="Ekle"
                  color="primary"
                  class="q-mt-sm"
                  @click="addItemToCard"
                />
              </q-card-section>
            </q-card>
          </div>

          <!-- Tıklanan karta ait tablo (Eğer veri varsa) -->
          <div
            v-if="
              selectedCard !== null && cards[selectedCard].tableData.length > 0
            "
            class="q-mt-md"
          >
            <q-card class="q-pa-md">
              <q-card-section>
                <h4>{{ cards[selectedCard].name }} -</h4>
                <q-table
                  :rows="cards[selectedCard].tableData"
                  :columns="columns"
                  row-key="id"
                  grid
                >
                  <template v-slot:body-cell-name="props">
                    <q-td :props="props">
                      <q-input v-model="props.row.name" outlined dense />
                    </q-td>
                  </template>
                  <template v-slot:body-cell-image="props">
                    <q-td :props="props">
                      <img
                        :src="props.row.image"
                        alt="Item Image"
                        width="50"
                        height="50"
                      />
                    </q-td>
                  </template>
                  <template v-slot:body-cell-price="props">
                    <q-td :props="props">
                      <q-input v-model="props.row.price" outlined dense />
                    </q-td>
                  </template>
                  <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                      <q-btn
                        icon="delete"
                        color="negative"
                        flat
                        round
                        @click="removeItem(props.row.id)"
                      />
                    </q-td>
                  </template>
                </q-table>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { menu } from "../composables/menu";
import axios from "axios";

const { addFoodGroup } = menu();

// Kartların verisi
const cards = ref([
  { name: "Card 1", editMode: false, tableData: [] },
  { name: "Card 2", editMode: false, tableData: [] },
  { name: "Card 3", editMode: false, tableData: [] },
]);

// Yeni kart ismi
const newCardName = ref("");
// Seçilen kart
const selectedCard = ref(null);

// Yeni eklenen item verileri
const newItemName = ref("");
const newItemImage = ref("");
const newItemPrice = ref("");

// Tablo kolonları
const columns = [
  { name: "name", label: "Item Name", field: "name", align: "left" },
  { name: "image", label: "Item Image", field: "image", align: "left" },
  { name: "price", label: "Item Price", field: "price", align: "right" },
  { name: "actions", label: "Actions", align: "right" },
];

// Kart ekleme fonksiyonu
const addCard = () => {
  if (newCardName.value.trim()) {
    cards.value.push({
      name: newCardName.value,
      tableData: [],
    });
    newCardName.value = "";
  }
};

// Kart silme fonksiyonu
const removeCard = (index) => {
  cards.value.splice(index, 1);
};

// Kart seçme fonksiyonu
const selectCard = (index) => {
  selectedCard.value = index;
};

// Kart ismi güncelleme fonksiyonu
const updateCard = (index) => {
  console.log("Updated Card Name:", cards.value[index].name);
  cards.value[index].editMode = false; // Düzenleme modunu kapatıyoruz
};

// Düzenleme modunu açma/kapatma fonksiyonu
const toggleEditMode = (index) => {
  cards.value[index].editMode = !cards.value[index].editMode;
};

// Tabloya yeni item ekleme
const addItemToCard = () => {
  if (
    newItemName.value.trim() &&
    newItemImage.value.trim() &&
    newItemPrice.value.trim()
  ) {
    const newItem = {
      id: Date.now(), // Benzersiz ID
      name: newItemName.value,
      image: newItemImage.value,
      price: newItemPrice.value,
    };
    cards.value[selectedCard.value].tableData.push(newItem);
    // Formu sıfırla
    newItemName.value = "";
    newItemImage.value = "";
    newItemPrice.value = "";
  }
};

// Tablo üzerindeki item silme fonksiyonu
const removeItem = (id) => {
  cards.value[selectedCard.value].tableData = cards.value[
    selectedCard.value
  ].tableData.filter((item) => item.id !== id);
};

const tab = ref("companyInfo");

// Company data
const companyLogoUrl = ref("");
const companyName = ref("");
const companyDomain = ref("");

async function fetchCompanyData() {
  try {
    const response = await axios.get(
      "https://api.qrmenu.fupico.com/api/Menu/getCompanyByUserId",
      {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`, // Token ekleniyor
        },
      }
    );

    // Gelen yanıt verilerini kontrol ediyoruz
    if (response.data) {
      companyLogoUrl.value = response.data.imageUrl; // Logo URL'si
      companyName.value = response.data.name; // Şirket adı
      companyDomain.value = response.data.domain; // Domain
    }
  } catch (error) {
    console.error("Şirket verileri alınırken hata:", error);
  }
}

// API'den veri çekme fonksiyonu
const fetchFoodGroupData = async () => {
  const data = {};

  try {
    const response = await axios.post(
      "https://api.qrmenu.fupico.com/api/Menu/addFoodGroup",
      data,
      {
        headers: {
          "FuPiCo-Security": `Bearer ${localStorage.getItem("accessToken")}`, // Token ekleniyor
          "Content-Type": "application/json", // İçerik tipi belirtildi
        },
      }
    );

    // Gelen yanıt verilerini kontrol ediyoruz
    if (response.data) {
      companyId.value = response.data.companyId;
      groupName.value = response.data.groupName;
      description.value = response.data.description;
    }
  } catch (error) {
    console.error("Şirket verileri alınırken hata:", error);
  }
};



onMounted(async () => {
  fetchCompanyData();
  fetchFoodGroupData();
});
</script>

<style scoped>
/* Estetik kart ve tablo stilleri */
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
.card {
  background: #ffffff;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}
.edit-tab {
  background: #ffffff;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
}

</style>
