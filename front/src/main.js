import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//Debut import pour vue-markdown-editor
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';

// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';
// langue
import frFR from '@kangc/v-md-editor/lib/lang/fr-FR';
//Fin import v-md-editor

VMdEditor.use(vuepressTheme, {
    Prism,
});   

VMdEditor.lang.use('fr-FR', frFR);

//Import icon
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

/* import specific icons */
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

library.add(faFloppyDisk);

const app = createApp(App);

app.use(VMdEditor);

app.component('font-awesome-icon', FontAwesomeIcon);

app.mount('#app');