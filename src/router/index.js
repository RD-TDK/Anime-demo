import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import BasicAnimations from '../pages/BasicAnimations.vue'
import ParameterControl from '../pages/ParameterControl.vue'
import AdvancedAnimations from '../pages/AdvancedAnimations.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/basic',
    name: 'BasicAnimations',
    component: BasicAnimations
  },
  {
    path: '/parameters',
    name: 'ParameterControl',
    component: ParameterControl
  },
  {
    path: '/advanced',
    name: 'AdvancedAnimations',
    component: AdvancedAnimations
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
