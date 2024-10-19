<template>
  <div>
    <q-tabs
      v-model="tab"
      inline-label
      active-bg-color="grey-9"
      indicator-color="grey-8"
      class="custom-tabs q-pt-lg q-mb-lg text-white"
      no-shadow
      flat
    >
      <div v-for="(i, index) in dataMenu.$values" :key="index">
        <q-tab :name="`tab${index}`">
          <div class="tab-content">
            <q-img class="tab-img" src="/images/kahvalti.jpg" contain />
            <div class="tab-label text-bold" style="font-size: large">
              {{ i.groupName }}
            </div>
          </div>
        </q-tab>
      </div>
    </q-tabs>

    <q-tab-panels class="custom-tab-panels" v-model="tab" animated>
      <q-tab-panel
        :name="`tab${index}`"
        v-for="(i, index) in dataMenu.$values"
        :key="index"
      >
        <div class="text-h6 text-grey-2">{{ i.groupName }}</div>

        <div class="row">
          <div
            class="col-12 col-sm-6 col-md-4"
            v-for="(ii, indexx) in i.foods.$values"
            :key="indexx"
          >
            <q-card class="my-card q-ma-sm q-pa-none custom-card" flat bordered>
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
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";

import { menu } from "../composables/menu";

const { getFoodGroupsAndFoodsByCompanyName, check2, getMenu } = menu();

const tab = ref("tab0");

// window.location.hostname tam alan adını verir: "qrmenu.fupico.com"
const hostname = window.location.hostname;

// Alt alan adını çekmek için hostname'i bölüyoruz
//const parts = hostname.split("qrmenu.fupico.com/");
const parts = hostname.split("qrmenu.fupico.com/");

// url'den sonraki id'yi almak
const companyNamee = ref(parts[1]);

const companyName = ref("kosebasi");
const dataMenu = ref({});

const reloadMenu = async () => {
  console.log('companyNamee', companyNamee.value)
  dataMenu.value = await getFoodGroupsAndFoodsByCompanyName(companyName.value);
  //let result = await getMenu();
  console.log("dataMenu", dataMenu.value);
  //console.log('result', result)
};
onMounted(async () => {
  //console.log('companyNamee', companyNamee);
  await reloadMenu();
  tab.value = "tab0";
});



</script>

<style scoped>
.custom-card {
  background-color: rgba(40, 37, 37, 0.7); /* Beyaz arka plan, %80 opaklık */
}
.custom-tabs {
  background-color: rgba(75, 5, 5, 0); /* Beyaz arka plan, %80 opaklık */
}
.custom-tab-panels {
  background-color: rgba(252, 252, 252, 0); /* Beyaz arka plan, %80 opaklık */
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
