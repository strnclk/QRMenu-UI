<template>
  <div>
    <div v-if="!hasFoods" class="empty-menu-message">
      Menünüz Hazırlanıyor...
    </div>

    <!-- Tablar -->
    <q-tabs
      v-if="hasFoods"
      v-model="tab"
      inline-label
      active-bg-color="grey-9"
      indicator-color="grey-8"
      class="custom-tabs q-pt-lg q-mb-lg text-white"
      no-shadow
      flat
    >
      <!-- Sadece foods array'i dolu olan foodgroupları göster -->
      <div
        v-for="(i, index) in dataMenu.filter((group) => group.foods.length > 0)"
        :key="index"
      >
        <q-tab :name="`tab${index}`">
          <div class="tab-content">
            <q-img class="tab-img" :src="i.imageUrl" contain />
            <div class="tab-label text-bold" style="font-size: large">
              {{ i.groupName }}
            </div>
          </div>
        </q-tab>
      </div>
    </q-tabs>

    <!-- Tab Panel İçerikleri - Swipeable özelliği ile -->
    <q-tab-panels
      class="custom-tab-panels"
      v-if="hasFoods"
      v-model="tab"
      animated
      swipeable
    >
      <q-tab-panel
        :name="`tab${index}`"
        v-for="(i, index) in dataMenu.filter((group) => group.foods.length > 0)"
        :key="index"
      >
        <div class="text-h6 text-grey-2">{{ i.groupName }}</div>

        <div class="row">
          <div
            class="col-12 col-sm-6 col-md-4"
            v-for="(ii, indexx) in i.foods"
            :key="indexx"
          >
            <q-card
              class="my-card q-ma-sm q-pa-none custom-card"
              flat
              bordered
              @click="openModal(ii)"
            >
              <q-card-section class="row no-wrap q-pa-none">
                <!-- Yemek İsmi ve Açıklama Bölümü -->
                <q-card-section class="col-7 q-pa-none">
                  <div
                    class="text-orange-3 q-mb-xs q-pt-lg"
                    style="font-size: 16px"
                  >
                    {{ ii.name }}
                  </div>
                  <div
                    class="text-caption text-grey-4 q-mb-sm"
                    v-if="ii.description"
                  >
                    {{ ii.description }}
                  </div>
                </q-card-section>

                <!-- Yemek Resmi Bölümü -->
                <q-card-section class="col-5 flex justify-center">
                  <q-img
                    class="rounded-borders"
                    :src="ii.imageUrl"
                    contain
                    style="max-width: 100px; max-height: 100px"
                  />
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions class="q-pa-none" align="right">
                <q-btn
                  class="text-body1 text-grey-4"
                  dense
                  flat
                  :label="ii.price"
                  icon-right="currency_lira"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-tab-panel>
    </q-tab-panels>

    <!-- Sağa ve Sola geçiş butonları -->
    <div class="row justify-center q-pt-lg">
      <q-btn
        v-if="hasFoods"
        icon="arrow_back"
        @click="prevTab"
        :disable="tabIndex === 0"
        color="primary"
        flat
        rounded
        size="lg"
        class="q-mr-sm"
      />
      <q-btn
        v-if="hasFoods"
        icon="arrow_forward"
        @click="nextTab"
        :disable="tabIndex === dataMenu.length - 1"
        color="primary"
        flat
        rounded
        size="lg"
      />
    </div>

    <q-dialog v-if="hasFoods" v-model="showModal">
      <q-card class="modal-card q-pa-md">
        <q-card-section v-if="selectedFood">
          <div class="text-h6">{{ selectedFood?.name }}</div>
          <q-img
            class="q-mt-md"
            :src="selectedFood?.imageUrl"
            contain
            style="max-width: 300px; max-height: 300px"
          />
        </q-card-section>
        <q-card-section v-if="selectedFood?.description">
          <div>{{ selectedFood?.description }}</div>
          <div class="text-h6 q-mt-md">{{ selectedFood?.price }} ₺</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Kapat" @click="showModal = false" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { menu } from "../composables/menu";
import { computed } from "vue"; // computed import edin
const hasFoods = computed(() =>
  dataMenu.value.some((group) => group.foods.length > 0)
);
// Tip tanımlamaları
interface Food {
  name: string;
  imageUrl: string;
  description: string;
  price: number;
}

interface FoodGroup {
  groupName: string;
  imageUrl: string;
  foods: Food[];
}

const { getMenu } = menu();
const tab = ref("tab0");
const tabIndex = ref(0);

// Vue Router'dan route parametrelerini alıyoruz
const route = useRoute();

// URL'den userId parametresini alıyoruz, yoksa varsayılanı kullanıyoruz
const userId = ref<string>(
  (route.params.userId as string) || "1f327e7a-0d39-404e-9fff-c6ff37deef00"
);

// `dataMenu` artık `FoodGroup` tipinde olacak
const dataMenu = ref<FoodGroup[]>([]);

const showModal = ref(false);
// `selectedFood` artık `Food` tipinde olacak
const selectedFood = ref<Food | null>(null);

const reloadMenu = async () => {
  dataMenu.value = await getMenu(userId.value);
};

// Tab geçişi için fonksiyonlar
const nextTab = () => {
  if (tabIndex.value < dataMenu.value.length - 1) {
    tabIndex.value++;
    tab.value = `tab${tabIndex.value}`;
  }
};

const prevTab = () => {
  if (tabIndex.value > 0) {
    tabIndex.value--;
    tab.value = `tab${tabIndex.value}`;
  }
};

// Yemek kartına tıklayınca modal açılır
const openModal = (food: Food) => {
  selectedFood.value = food;
  showModal.value = true;
};

onMounted(async () => {
  await reloadMenu();
  tab.value = "tab0";
});
</script>

<style scoped>
.modal-card {
  max-width: 500px;
  max-height: 600px;
}
.custom-card {
  background-color: rgba(40, 37, 37, 0.7); /* Beyaz arka plan, %80 opaklık */
}
.custom-tabs {
  background-color: rgba(75, 5, 5, 0); /* Beyaz arka plan, %80 opaklık */
}
.custom-tab-panels {
  background-color: rgba(252, 252, 252, 0); /* Beyaz arka plan, %80 opaklık */
}
.empty-menu-message {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: #888;
  font-weight: bold;
  text-align: center;
}
/* 2 */
/* .tab-img {
  width: 50px;
  height: 50px;
  margin-right: 8px;
} */

/* 3 */
.tab-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tab-img {
  width: 50;
  height: 50px;
  margin-bottom: 8px;
}

.tab-label {
  font-size: 14px;
}
</style>
