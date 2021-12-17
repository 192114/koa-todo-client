import {createApp} from 'vue'
import router from './routes'
import App from './App.vue'

import './assets/css/root.css'
import './assets/css/common.css'
import './assets/css/transition.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
