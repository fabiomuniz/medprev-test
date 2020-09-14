<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0px;
  font-family: "Lato", sans-serif;
  background: $color-bg;
}

h1,
h2,
h3,
h4,
h5,
h6,
p {
  margin: initial;
  color: $color-text;
}

.limit-grid {
  width: 100%;
  margin: 0px auto;
  padding: 0 20px;

  @include media(">=tablet") {
    max-width: 1184px;
  }
}

.limit-grid2 {
  width: 100%;
  margin: 0px auto;
  padding: 0 20px;

  @include media(">=tablet") {
    max-width: 978px;
  }
}

.btn {
  height: 30px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  border: 0px none;
  outline: none;
  transition: 0.3s ease-in-out;
  border-radius: 15px;
  text-transform: uppercase;
  font-weight: 900;
  color: $color-white;
  cursor: pointer;
  &:hover {
    opacity: 0.7;
  }
  &--remove {
    position: absolute;
    right: 0;
    top: 20px;
    background-color: $color-red;
  }
  &--add {
    margin-top: 15px;
    margin-left: auto;
    background-color: $color-primary;
  }
  &--back {
    margin-left: auto;
    background-color: $color-text;
  }
  &--header {
    border-radius: 20px;
    height: 40px;
    font-size: 16px;
    margin-left: auto;
    background: $color-primary;
    text-decoration: none;
    background: linear-gradient(
      90deg,
      $color-primary 0%,
      $color-secondary 100%
    );
  }
  &--submit {
    margin-left: auto;
    background: $color-primary;
    background: linear-gradient(
      90deg,
      $color-primary 0%,
      $color-secondary 100%
    );
    &[disabled]{
      background: $color-text;
      opacity: .5;
    }
  }
}
</style>
