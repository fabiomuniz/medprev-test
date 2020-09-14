/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    people: null,
    pageActual: 1,
    modal: false,
    personId: null,
  },
  getters: {
    people: (state) => state.people,
    pageActual: (state) => state.pageActual,
    modal: (state) => state.modal,
    personId: (state) => state.personId,
  },
  mutations: {
    SET_PEOPLE: (state, value) => {
      state.people = value;
    },
    SET_PERSON_ID: (state, value) => {
      state.personId = value;
    },
    CHANGE_PAGE: (state, value) => {
      state.pageActual = value;
    },
    CHANGE_MODAL: (state) => {
      if (state.modal === true) {
        state.personId = null;
      }
      state.modal = !state.modal;
    },
  },
  actions: {
    getPeople(context) {
      axios
        .get(`https://jsonbox.io/box_8c90972e48dc2e98eb1b?sort=+name&skip=${(context.state.pageActual - 1) * 5}&limit=5`)
        .then((response) => {
          context.commit('SET_PEOPLE', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  modules: {},
});
