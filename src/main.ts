import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { store } from './store'
import './tiny-grid.scss'
import '@fontsource/roboto'
import './default.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus, faMinus)

const app = createApp(App)

app.use(router)
app.use(store)

app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
