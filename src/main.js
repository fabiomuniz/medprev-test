import Vue from 'vue';
import VueTheMask from 'vue-the-mask';
import Vuelidate from 'vuelidate';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import TheHeader from './components/TheHeader.vue';
import titleMixin from './mixins/titleMixin';

Vue.config.productionTip = false;

Vue.component('TheHeader', TheHeader);

Vue.mixin(titleMixin);

Vue.use(VueTheMask);
Vue.use(Vuelidate);

Vue.prototype.$http = axios.create({
  baseURL: 'https://jsonbox.io/box_8c90972e48dc2e98eb1b',
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
