import Vue from 'vue'
import VueRouter from 'vue-router'
import Filterpage from '@/views/filterpage.vue'
import FilterRes from '@/views/filterRes.vue'
import FamilyView from '@/views/familyView.vue'
import PersonalView from '@/views/personalView.vue'
import MedicalHealth from '@/views/medicalhealth.vue'
import Property from '@/views/property.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/filterpage' },
  { path: '/filterpage', component: Filterpage },
  { path: '/filterRes', component: FilterRes },
  { path: '/familyView:fmid', component: FamilyView, props: true },
  { path: '/personalView/:pid', component: PersonalView, props: true },
  { path: '/medicalhealth', component: MedicalHealth },
  { path: '/property', component: Property }
]

const router = new VueRouter({
  routes
})

export default router
