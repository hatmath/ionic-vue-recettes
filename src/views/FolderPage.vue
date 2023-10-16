<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ $route.params.id === 'Accueil' ? 'Recette du moment' : $route.params.id }}</ion-title>
      </ion-toolbar>
     </ion-header>

    <ion-content :fullscreen="true" class="ion-text-center ion-align-items-center" safe-area>
      <div>        
        <ion-img :src="recette.strMealThumb"></ion-img>
        <h1>{{ recette.strMeal }}</h1>
        <p>Origine: {{ recette.strArea }} <br> Catégorie: {{ recette.strCategory }}</p>
        <h2>Ingrédients</h2>

        <!-- Le DynamicScroller ne fonctionne pas bien alors commenté pour l'instant -->
        <!-- <ul>
          <DynamicScroller :items="ingredients" :item-height="20" :min-item-size="20">
            <template #default="{ item }">
              <li>{{ item }}</li>
            </template>
          </DynamicScroller>
        </ul> -->

        <ul class="no-bullets center-list">
          <li v-for="item in ingredients" :key="item">{{ item }}</li>
        </ul>

        <h2>Instructions</h2>
        <p class="instructions-paragraph">{{ recette.strInstructions }}</p>        
      </div>
    </ion-content>
    
    <ion-footer>
      <ion-toolbar color="dark">
        <ion-searchbar v-model="searchQuery" @keyup.enter="startSearch"></ion-searchbar>
      </ion-toolbar>
    </ion-footer>

  </ion-page>
</template>

<script setup lang="ts">
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonFooter,
} from '@ionic/vue';

import { loadingController } from '@ionic/vue';
import { DynamicScroller } from 'vue3-virtual-scroller';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const recette = ref({});
const ingredients = ref([{}]);
const router = useRouter();
const searchQuery = ref('');

const getUneRecette = async () => {
  const loading = await loadingController.create({
    message: 'Attendre SVP ...',
  });
  await loading.present();

  const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

  fetch(url)
    .then((reponse) => reponse.json())
    .then((data) => {
      console.log("(FolderPage.vue) Recette -> ");
      console.log(data);
      recette.value = data.meals[0];
      const temp = [];
      for (let i = 1; i <= 20; i++) {
        if (
          data.meals[0]['strMeasure' + i] !== '' &&
          data.meals[0]['strMeasure' + i] !== null &&
          data.meals[0]['strMeasure' + i] !== ' '
        ) {
          temp.push(
            data.meals[0]['strMeasure' + i] +
            ' ' +
            data.meals[0]['strIngredient' + i]
          );
        }
      }
      ingredients.value = temp;
      console.log("(FolderPage.vue) Nombre d'ingredients -> " + (ingredients.value ? ingredients.value.length : 0));
      loading.dismiss();
    });
};

onMounted(() => {
  console.log('(FolderPage.vue) did enter');
  getUneRecette();
});

const startSearch = () => {
    const query = searchQuery.value;
    console.log("(Search.vue) startSearch() -> " + query);
    if (query.trim() !== '') {
        searchQuery.value = '';
        router.push({ name: 'Search', params: { rechercher: query } });
    }
};

</script>

<style scoped>

.no-bullets {
  list-style-type: none;
}

.center-list {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
}

.instructions-paragraph {
  padding-left: 20px;
  padding-right: 20px;
  text-align: left;
}

</style>
