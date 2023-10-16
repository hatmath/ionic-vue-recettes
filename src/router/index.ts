import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '',
    redirect: '/folder/Accueil'
  },
  {
    path: '/folder/:id',
    component: () => import ('../views/FolderPage.vue')
  },
  {
    path: '/Liste/:id',
    component: () => import ('../views/Liste.vue')
  },
  {
    path: '/Detail/:id',
    component: () => import ('../views/Detail.vue')
  },
  {
    path: '/Search/:rechercher',
    name: 'Search',
    component: () => import('../views/Search.vue'), 
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
