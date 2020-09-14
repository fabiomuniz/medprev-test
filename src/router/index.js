import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Person from '../views/Person.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'people',
    component: Home,
  },
  {
    path: '/person',
    name: 'person.new',
    component: Person,
    children: [
      {
        path: ':id',
        name: 'person.edit',
        component: Person,
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
