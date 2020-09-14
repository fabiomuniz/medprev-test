<template>
  <section :class="['modal', {'modal--active' : modal}]">
    <div class="modal__wrapper">
      <img src="@/assets/delete.svg" alt="remover pessoa">
      <h3>REMOVER</h3>
      <p>
        Tem certeza que deseja remover essa pessoa? <br>
        Esse procedimento <strong>não poderá ser desfeito</strong>.
      </p>
      <div class="modal__buttons">
        <button class="btn modal__buttons__cancel" @click.prevent="CHANGE_MODAL">
          Cancelar
        </button>
        <button class="btn modal__buttons__delete" :disabled="save" @click.prevent="removePerson()">
          {{save ? "Excluindo...": "Excluir"}}
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      save: false,
    };
  },
  computed: {
    ...mapGetters(['modal', 'personId']),
  },
  methods: {
    ...mapMutations(['CHANGE_MODAL']),
    ...mapActions(['getPeople']),
    removePerson() {
      this.save = true;
      this.$http
        .delete(`/${this.personId}`)
        .then(() => {
          this.getPeople();
          this.CHANGE_MODAL();
          this.save = false;
        })
        .catch((error) => {
          this.save = false;
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
  .modal{
    width: 100vw;
    height: 100vh;
    background: RGBA(112,112,112,.2);
    position: fixed;
    z-index: -1;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: .3s ease;
    &--active{
      opacity: 1;
      z-index: 10;
    }
    &__wrapper{
      background: $color-white;
      border-radius: 20px;
      text-align: center;
      max-width: 600px;
      padding: 50px 20px;
      @include media(">=small") {
        padding: 50px 100px;
      }
      img{
        max-width: 50px;
        margin-bottom: 30px;
      }
      h3{
        font-size: 30px;
        font-weight: 900;
      }
      p{
        margin: 15px 0px 30px;
        line-height: 24px;
        strong{
          color: $color-red;
        }
      }
    }
    &__buttons{
      display: flex;
      justify-content: center;
      &__cancel{
        background: $color-text;
        margin-right: 15px;
      }
      &__delete{
        background: $color-red;
      }
    }
  }
</style>
