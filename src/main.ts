import {createApp} from 'vue'
import './style.css'
import './assets/css/communal.scss'
import App from './App.vue'
import {createPinia} from "pinia";

const app = createApp(App)
app.use(createPinia()).mount('#app')