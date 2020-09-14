<template>
  <ul class="pagination">
    <li
      :class="{'active' : pageActual === item }"
      v-for="item in pages" :key="item"
      @click.prevent="CHANGE_PAGE(item)"
    >
      {{item}}
    </li>
  </ul>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      people: null,
      perPage: 5,
      pages: null,
    };
  },
  computed: {
    ...mapGetters(['pageActual']),
  },
  methods: {
    ...mapMutations(['CHANGE_PAGE']),
    getPeople() {
      this.$http
        .get()
        .then((response) => {
          this.people = response.data.length;
          this.pages = Math.ceil(this.people / this.perPage);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.getPeople();
  },
};
</script>

<style lang="scss">
  .pagination{
    display: flex;
    justify-content: flex-end;
    list-style: none;
    li{
      height: 30px;
      width: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      margin-right: 5px;
      background: $color-white;
      transition: .3s ease-in-out;
      cursor: pointer;
      &.active{
        color: $color-white;
        font-weight: 900;
        background: $color-primary;
        background: linear-gradient(
          90deg,
          $color-primary 0%,
          $color-secondary 100%
        );
      }
    }
  }
</style>
