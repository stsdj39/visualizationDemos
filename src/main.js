import { createApp } from 'vue'
import DataVVue3 from '@kjgl77/datav-vue3'
import './style.css'
import App from './App.vue'



createApp(App).mount('#app')
App.use(DataVVue3)
App.mount('#app')

