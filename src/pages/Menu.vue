<template>

  <div>
    <q-tabs
      v-model="tab"
      inline-label
      active-bg-color="grey-9"
      indicator-color="grey-8"
      class="custom-tabs q-pt-lg q-mb-lg text-white "
      
      no-shadow
      flat
    >
      <q-tab name="mails">
        <div class="tab-content">
          <q-img class="tab-img" src="/images/kahvalti.jpg" contain />
          <div class="tab-label">Kahvaltı</div>
        </div>
      </q-tab>
      <q-tab name="alarms">
        <div class="tab-content">
          <q-img class="tab-img" src="/images/tatli.jpg" contain />
          <div class="tab-label">Tatlılar</div>
        </div>
      </q-tab>
      <q-tab name="movies">
        <div class="tab-content">
          <q-img class="tab-img" src="/images/borek.jpg" contain />
          <div class="tab-label">Tuzlular</div>
        </div>
      </q-tab>
      <q-tab name="photos">
        <div class="tab-content">
          <q-img class="tab-img" src="/images/icecek.jpg" contain />
          <div class="tab-label">İçecekler</div>
        </div>
      </q-tab>
    </q-tabs>

    <q-tab-panels class="custom-tab-panels" v-model="tab" animated>
      <q-tab-panel name="mails">
        <div class="text-h6 text-grey-2">KAHVALTI</div>

        <div class="row">
          <div class="col-12 col-sm-6 col-md-4" v-for="i in dataMenu.kahvalti" :key="i">
            <q-card
              class="my-card q-ma-md custom-card"
              flat
              bordered
            >
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <div class="text-h5 text-orange-3">{{i.name}}</div>
                  <!-- <div class="text-h5 text-grey-5 q-mt-sm q-mb-xs">Menemen</div> -->
                  <div class="text-caption text-grey-4">
                    {{i.description}}
                  </div>
                </q-card-section>

                <q-card-section class="col-5 flex flex-center">
                  <q-img
                    class="rounded-borders"
                    :src="i.image"
                  />
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn
                  class="text-body1 text-grey-4"
                  dense
                  flat
                  :label="i.price"
                  icon-right="currency_lira"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="alarms">
        <div class="text-h6 text-grey-2">TATLILAR</div>
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4" v-for="i in dataMenu.tatlilar" :key="i">
            <q-card
              class="my-card q-ma-xs custom-card"
              flat
              bordered
            >
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <div class="text-h5 text-orange-3">{{i.name}}</div>
                  <!-- <div class="text-h5 text-grey-5 q-mt-sm q-mb-xs">Menemen</div> -->
                  <div class="text-caption text-grey-4">
                    {{i.description}}
                  </div>
                </q-card-section>

                <q-card-section class="col-5 flex flex-center">
                  <q-img
                    class="rounded-borders"
                    :src="i.image"
                  />
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn
                  class="text-body1 text-grey-4"
                  dense
                  flat
                  :label="i.price"
                  icon-right="currency_lira"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </q-tab-panel>

      <q-tab-panel name="movies">
        <div class="text-h6 text-grey-2">TUZLULAR</div>
       
          <div class="row">
          <div class="col-12 col-sm-6 col-md-4" v-for="i in dataMenu.tuzlular" :key="i">
            <q-card
              class="my-card q-ma-xs custom-card"
              flat
              bordered
            >
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <div class="text-h5 text-orange-3">{{i.name}}</div>
                  <!-- <div class="text-h5 text-grey-5 q-mt-sm q-mb-xs">Menemen</div> -->
                  <div class="text-caption text-grey-4">
                    {{i.description}}
                  </div>
                </q-card-section>

                <q-card-section class="col-5 flex flex-center">
                  <q-img
                    class="rounded-borders"
                    :src="i.image"
                  />
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn
                  class="text-body1 text-grey-4"
                  dense
                  flat
                  :label="i.price"
                  icon-right="currency_lira"
                />
              </q-card-actions>
            </q-card>
          </div>
        </div>
      
      </q-tab-panel>
      <q-tab-panel name="photos">
        <div class="text-h6 text-grey-2">İÇECEKLER</div>
        <div class="row">
          <div class="col-12 col-sm-6 col-md-4" v-for="i in dataMenu.icecekler" :key="i">
            <q-card
              class="my-card q-ma-xs custom-card"
              flat
              bordered
            >
              <q-card-section horizontal>
                <q-card-section class="q-pt-xs">
                  <div class="text-h5 text-orange-3">{{i.name}}</div>
                  <!-- <div class="text-h5 text-grey-5 q-mt-sm q-mb-xs">Menemen</div> -->
                  <div class="text-caption text-grey-4">
                    {{i.description}}
                  </div>
                </q-card-section>

                <q-card-section class="col-5 flex flex-center">
                  <q-img
                    class="rounded-borders"
                    :src="i.image"
                  />
                </q-card-section>
              </q-card-section>

              <q-separator />

              <q-card-actions align="right">
                <q-btn
                  class="text-body1 text-grey-4"
                  dense
                  flat
                  :label="i.price"
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
import { ref, onMounted } from "vue";
import { menu} from "../composables/menu"



const {getFoodGroupsAndFoodsByCompanyName}=menu();

// window.location.hostname tam alan adını verir: "qrmenu.celep.fupico.com"
const hostname = window.location.hostname;

// Alt alan adını çekmek için hostname'i bölüyoruz
const parts = hostname.split('.');

// "celep" alt alan adını almak
const companyNamee = parts[0];

const companyName=ref('kosebasi');
const dataMenuu=ref({});

const reloadMenu =async ()=>{
  
  dataMenuu.value= await getFoodGroupsAndFoodsByCompanyName(companyName.value);
  console.log('dataMenuu', dataMenuu.value)


}
onMounted(async()=>{
  //console.log('companyNamee', companyNamee);
  //await reloadMenu();

})



const tab = ref("mails");

const dataMenu =ref({
  kahvalti:[{
    name:'Menemen',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/kahvalti.jpg',
    price:'180'

  },
  {
    name:'Sahanda Yumurta',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/kahvalti.jpg',
    price:'220'

  },
  {
    name:'Patates Kızartması',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/kahvalti.jpg',
    price:'100'

  },
  {
    name:'Serpme Kahvaltı',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/kahvalti.jpg',
    price:'350'

  },

],
  tatlilar:[
  {
    name:'Mozaik Pasta',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/tatli.jpg',
    price:'150'

  },
  {
    name:'Browni',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/tatli.jpg',
    price:'180'

  },
  {
    name:'Profiterol',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/tatli.jpg',
    price:'180'

  },
  {
    name:'Limonlu Cheesecake',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/tatli.jpg',
    price:'220'

  },
  ],
  tuzlular:[
  {
    name:'Küt Böreği',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/borek.jpg',
    price:'80'

  },
  {
    name:'Kıymalı Börek',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/borek.jpg',
    price:'90'

  },
  {
    name:'Poğaça',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/borek.jpg',
    price:'20'

  },
  {
    name:'Simit',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/borek.jpg',
    price:'15'

  },
  ],
  icecekler:[
  {
    name:'Su',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/icecek.jpg',
    price:'15'

  },{
    name:'Çay',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/icecek.jpg',
    price:'20'

  },{
    name:'Meşrubat',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/icecek.jpg',
    price:'45'

  },{
    name:'Limonata',
    description:'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, laudantium.',
    image:'/images/icecek.jpg',
    price:'35'

  },
  ]
})


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
