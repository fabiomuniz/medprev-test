<template>
  <header :class="['header', { 'header--spaced': $route.name !== 'people' }]">
    <div class="limit-grid">
      <div class="header__wrapper">
        <h1 v-html="title"></h1>
        <router-link
          class="btn btn--header"
          :to="$route.name !== 'people' ? '/' : '/person'"
        >{{$route.name !== 'people' ? 'Voltar' : 'Adicionar'}}</router-link>
      </div>
    </div>
    <div class="header__title" v-if="$route.name === 'people'">
      <div class="limit-grid">
        <div class="header__title__wrapper">
          <p>
            <strong>Nome</strong>
          </p>
          <p>
            <strong>Tipo</strong>
          </p>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: ['title'],
};
</script>

<style lang="scss">
.header {
  background: $color-white;
  padding: 30px 0;
  box-shadow: 0px 3px 6px 0px RGBA(112, 112, 112, 0.2);
  margin-bottom: 15px;
  @include media(">=small") {
    padding: 60px 0 30px;
  }
  &--spaced {
    @include media(">=small") {
      padding-bottom: 60px;
    }
  }
  &__wrapper {
    display: grid;
    grid-template-columns: 1fr minmax(auto, 284px);
    grid-gap: 20px;
    align-items: center;
    h1 {
      font-size: 24px;
      font-weight: 900;
      text-transform: uppercase;
      @include media(">=small") {
        font-size: 42px;
      }
    }
  }
  &__title {
    @include media(">=small") {
      margin-top: 60px;
      border-top: 1px solid RGBA(112, 112, 112, 0.1);
      margin-top: 30px;
      padding-top: 30px;
    }
    &__wrapper {
      display: none;
      padding: 0px 30px;
      @include media(">=small") {
       display: grid;
        grid-template-columns: 1fr 250px;
      }
    }
  }
}
</style>
