<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button color="primary"></ion-menu-button>
                </ion-buttons>
                <ion-title>Recherche &nbsp; {{ $route.params.id }}</ion-title>                
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true" class="ion-text-center ion-align-items-center">
            <ion-list>
                <ion-item v-for="(recette, index) in recettes" :key="index" class="custom-item">
                    <router-link :to="`/Detail/${recette.idMeal}`">
                        <ion-img :src="recette.strMealThumb" alt="Icone recette"
                            style="min-width: 50px; min-height: 50px; max-width: 75px; width: 100%; height: auto; display: block; margin: 0 auto;">
                        </ion-img></router-link>
                    <ion-label>&nbsp;&nbsp;&nbsp;&nbsp;{{ recette.strMeal }}</ion-label>
                </ion-item>
            </ion-list>
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
    IonList,
    IonItem,
    IonImg,
    IonLabel,
    IonFooter,
    IonSearchbar,
} from '@ionic/vue';

import { loadingController } from '@ionic/vue';
import { DynamicScroller } from 'vue3-virtual-scroller';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const recettes = ref([{}]);
const router = useRouter();
const searchQuery = ref('');

const getUneRecette = async () => {
    const loading = await loadingController.create({
        message: 'Attendre SVP ...',
    });
    await loading.present();

    let url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

    const category = window.location.pathname.split('Search/')[1];
    if (category !== undefined) {
        url = url + category;
    }

    fetch(url)
        .then((reponse) => reponse.json())
        .then((data) => {
            console.log("(Search.vue) Recettes -> ");
            console.log(data);
            recettes.value = data.meals;
            console.log("(Search.vue) Nombre de recette -> " + (recettes.value ? recettes.value.length : 0));
            loading.dismiss();
        });
};

onMounted(() => {
    console.log('(Search.vue) did enter');
    getUneRecette();
});

const startSearch = () => {
    const query = searchQuery.value;
    console.log("(Search.vue) startSearch() -> " + query);
    if (query.trim() !== '') {
        router.push({ name: 'Search', params: { rechercher: query } });
    }
};

</script>
  
<style scoped>
.custom-item {
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 10px;
    margin-bottom: 0px;
}
</style>
  