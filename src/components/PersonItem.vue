<template>
  <section
    :class="[
      'list-item',
      person.type === 1 ? 'list-item--pf' : 'list-item--pj',
      { 'list-item--active': active },
    ]"
  >
    <div class="list-item__header" @click.prevent="toggleItem()">
      <h2>{{ person.name }}</h2>
      <p>
        <strong>{{
          person.type === 1 ? 'Pessoa Física' : 'Pessoa Juridíca'
        }}</strong>
      </p>
    </div>
    <div class="list-item__body">
      <div class="list-item__body__data">
        <p>
          <strong>{{ person.type === 1 ? 'CPF' : 'CNPJ' }}:</strong>
          {{ person.type === 1 ? person.cpf : person.cnpj }}
        </p>
        <p>
          <strong>{{
            10 > person.addresses.length
              ? '0' + person.addresses.length
              : person.addresses.length
          }}</strong>
          Endereços cadastrados
        </p>
      </div>
      <div class="list-item__body__buttons">
        <router-link :to="{ name: 'person.edit', params: { id: person._id } }"
          class="btn">Editar</router-link
        >
        <button @click.prevent="remove(person._id)" class="btn">Excluir</button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['person'],
  data() {
    return {
      active: false,
    };
  },
  methods: {
    ...mapMutations(['CHANGE_MODAL', 'SET_PERSON_ID']),
    toggleItem() {
      this.active = !this.active;
    },
    remove(id) {
      this.CHANGE_MODAL();
      this.SET_PERSON_ID(id);
    },
  },
};
</script>

<style lang="scss">
.list-item {
  background: $color-white;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 30px;
  position: relative;
  overflow: hidden;
  box-shadow: 0px 3px 6px 0px RGBA(112, 112, 112, 0.2);
  &::before {
    content: '';
    height: 100%;
    width: 4px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  h2, p{
    position: relative;
    z-index: 2;
  }
  &::after {
    content: '+';
    font-size: 40px;
    font-weight: 300;
    position: absolute;
    right: 30px;
    top: 15px;
    transition: 0.3s ease-in-out;
  }
  &--active {
    &::after {
      transform: rotate(45deg);
    }
    .list-item__body {
      margin-top: 20px;
      padding: 20px 0;
      max-height: 200px;
    }
  }
  &--pf {
    &::before {
      background-color: $color-primary;
    }
    &::after {
      color: $color-primary;
    }
    &:hover {
      .list-item__header {
        h2,
        p {
          color: $color-primary;
        }
      }
    }
  }
  &--pj {
    &::before {
      background-color: $color-secondary;
    }
    &::after {
      color: $color-secondary;
    }
    &:hover {
      .list-item__header {
        h2,
        p {
          color: $color-secondary;
        }
      }
    }
  }
  &__header {
    cursor: pointer;
    display: grid;
    @include media(">=small") {
      grid-template-columns: auto 250px;
    }
    h2 {
      font-size: 16px;
      font-weight: 900;
      max-width: calc(100% - 30px);
      @include media(">=small") {
        font-size: 20px;
      }
    }
    p {
      font-size: 16px;
      display: none;
      strong {
        font-size: 900;
      }
      @include media(">=small") {
        display: block;
      }
    }
    h2,
    p {
      transition: 0.3s ease-in-out;
    }
  }
  &__body {
    max-height: 0px;
    overflow: hidden;
    transition: 0.4s ease-in-out;
    position: relative;
    display: block;
    align-items: center;
    @include media(">=small") {
      display: flex;
    }
    &::after {
      content: '';
      background: RGBA(112, 112, 112, 0.1);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 1px;
    }
    &__data {
      @include media(">=small") {
        display: flex;
      }
      p {
        margin-right: 30px;
        line-height: 24px;
        &:last-child {
          margin-right: initial;
        }
      }
    }
    &__buttons {
      display: flex;
      margin-left: auto;
      margin-top: 15px;
      @include media(">=small") {
        margin-top: initial;
      }
      a,
      button {
        display: flex;
        align-items: center;
        text-decoration: none;
        border-radius: 20px;
        height: 30px;
        padding: 0 30px;
        appearance: none;
        border: 0px none;
        text-transform: uppercase;
        font-weight: 900;
        font-size: 14px;
        color: $color-white;
        @include media(">=small") {
          padding: 0 40px;
        }
      }
      a {
        background-color: $color-text;
        margin-right: 15px;
      }
      button {
        background-color: $color-red;
      }
    }
  }
}
</style>
