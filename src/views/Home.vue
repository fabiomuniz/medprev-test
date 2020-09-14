<template>
  <div>
    <TheHeader :title="'Pessoas'" />
    <main class="list" v-if="people !== null">
      <div class="limit-grid">
        <PersonItem
          v-for="person in people"
          :person="person"
          :key="person._id"
        />
        <PersonPagination v-if="people !== null" />
        <PersonDelete v-if="people !== null" />
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['people', 'pageActual']),
  },
  watch: {
    pageActual: {
      deep: true,
      handler() {
        this.getPeople();
      },
    },
  },
  methods: {
    ...mapActions(['getPeople']),
  },
  components: {
    PersonItem: () => import('@/components/PersonItem.vue'),
    PersonPagination: () => import('@/components/PersonPagination.vue'),
    PersonDelete: () => import('@/components/PersonDelete.vue'),
  },
  created() {
    this.getPeople();
  },
  beforeRouteUpdate(to, from, next) {
    console.log(to, from);
    next();
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.getPeople();
    });
  },
};
</script>
