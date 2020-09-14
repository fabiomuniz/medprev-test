<template>
  <div>
    <TheHeader
      :title="
        $route.name === 'person.new' ? 'Adicionar Pessoa' : 'Editar Pessoa'
      "
    />
    <main
      :class="[
        'create',
        person.type !== null
          ? person.type === 1
            ? 'create--pf'
            : 'create--pj'
          : '',
      ]"
    >
      <div class="limit-grid">
        <form id="form" @submit.prevent="sendPerson">
          <div class="create__box form-group form-group--reseted"
            :class="{
              'form-group--error': $v.person.type.$error,
            }"
          >
            <div class="limit-grid2">
              <p class="create__box__alert" v-if="person.type === null">
                escolha o tipo de pessoa para continuar.
              </p>
              <div class="create__box__inline">
                <p><strong>Você é:</strong></p>
                <div class="create__box__inline__wrapper">
                  <label class="form-group form-group--reseted form-group__radio">
                    <input type="radio" :value="1" v-model="$v.person.type.$model"
                    @change="resetForm()"/>
                    <p>Pessoa Fisíca</p>
                  </label>
                  <label class="form-group form-group--reseted form-group__radio">
                    <input type="radio" :value="2" v-model="$v.person.type.$model"
                      @change="resetForm()" />
                    <p>Pessoa Juridíca</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="create__box" v-if="person.type !== null">
            <div class="limit-grid2">
              <div class="form-group" :class="{
              'form-group--error': $v.person.name.$error,
              }">
                <label
                  >{{ person.type === 1 ? 'Nome' : 'Razão Social' }}:
                  <small>(obrigatório)</small></label
                >
                <input type="text" v-model="person.name" />
                <div class="form-group__msg">Preenchimento obrigatório.</div>
              </div>
              <div
                class="create__grid create__grid--colluns-3"
                v-if="person.type === 1"
              >
                <div class="form-group" :class="{
                  'form-group--error': $v.person.cpf.$error,
                }">
                  <label>CPF: <small>(obrigatório)</small></label>
                  <input type="text" v-model="person.cpf" v-mask="'###.###.###-##'"/>
                  <div class="form-group__msg">Preenchimento obrigatório.</div>
                </div>
                <div class="form-group" :class="{
                  'form-group--error': $v.person.sexo.$error,
                }">
                  <label>Sexo: <small>(obrigatório)</small></label>
                  <select v-model="person.sexo">
                    <option value="Feminino">Feminino</option>
                    <option value="Masculino">Masculino</option>
                  </select>
                  <div class="form-group__msg">Preenchimento obrigatório.</div>
                </div>
                <div class="form-group" :class="{
                  'form-group--error': $v.person.birthdate.$error,
                }">
                  <label
                    >Data de nascimento: <small>(obrigatório)</small>
                  </label>
                  <input type="text" v-model="person.birthdate" v-mask="'##/##/####'"/>
                <div class="form-group__msg">Preenchimento obrigatório.</div>
                </div>
              </div>
              <div class="form-group" v-if="person.type === 2"  :class="{
                  'form-group--error': $v.person.cnpj.$error,
                }">
                <label>CNPJ: <small>(obrigatório)</small></label>
                <input type="text" v-model="person.cnpj" v-mask="'##.###.###/####-##'"/>
                <div class="form-group__msg">Preenchimento obrigatório.</div>
              </div>

              <div class="form-group" :class="{
                  'form-group--error': $v.person.email.$error,
                }">
                <label>E-mail:</label>
                <input type="text" v-model="person.email" />
                <div class="form-group__msg">Email inválido.</div>
              </div>
              <div class="create__grid create__grid--half">
                <div class="form-group">
                  <label>Telefone:</label>
                  <input
                    type="text" v-model="person.telephone"
                    v-mask="['(##) ####-####', '(##) #####-####']"
                  />
                </div>
                <div class="form-group">
                  <label>Celular:</label>
                  <input
                    type="text" v-model="person.cellphone"
                    v-mask="['(##) ####-####', '(##) #####-####']"
                  />
                </div>
              </div>
              <div class="create__grid create__grid--half">
                <div class="form-group">
                  <label>Foto:</label>
                  <div class="form-group__file">
                    <p>Clique aqui para escolher seu foto</p>
                    <input type="file" @change="previewFiles" />
                  </div>
                </div>
                <img src="" alt="" class="photo">
              </div>
            </div>
          </div>
          <div class="create__box" v-if="person.type !== null">
            <div class="limit-grid2">
              <div
                class="create__box__repeater"
                v-for="(addresses, key) in $v.person.addresses.$each.$iter"
                :key="key"
              >
                <button
                  class="btn btn--remove"
                  @click.prevent="removeItem(key)"
                  v-if="key > 0"
                >
                  Apagar
                </button>
                <div class="form-group">
                  <div class="form-group" :class="{
                    'form-group--error': addresses.address.$error,
                  }">
                    <label>Endereço: <small>(obrigatório)</small></label>
                    <input type="text" v-model="addresses.$model.address" />
                    <div class="form-group__msg">Preenchimento obrigatório.</div>
                  </div>
                </div>
                <div class="create__grid create__grid--colluns-3">
                  <div class="form-group" :class="{
                    'form-group--error': addresses.number.$error,
                  }">
                    <div class="form-group">
                      <label>Numero: <small>(obrigatório)</small></label>
                      <input type="text" v-model="addresses.$model.number" v-mask="'############'"/>
                      <div class="form-group__msg">Preenchimento obrigatório.</div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-group">
                      <label>Complemento:</label>
                      <input type="text" v-model="addresses.$model.complement" />
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-group">
                      <label>Bairro:</label>
                      <input type="text" v-model="addresses.$model.district" />
                    </div>
                  </div>
                </div>
                <div class="create__grid create__grid--colluns-3">
                  <div class="form-group">
                    <div class="form-group" :class="{
                      'form-group--error': addresses.city.$error,
                    }">
                      <label>Cidade: <small>(obrigatório)</small></label>
                      <input type="text" v-model="addresses.$model.city" />
                      <div class="form-group__msg">Preenchimento obrigatório.</div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-group" :class="{
                      'form-group--error': addresses.state.$error,
                    }">
                      <label>Estado: <small>(obrigatório)</small></label>
                      <input type="text" v-model="addresses.$model.state" />
                      <div class="form-group__msg">Preenchimento obrigatório.</div>
                    </div>
                  </div>

                  <div class="form-group">
                    <div class="form-group">
                      <label>CEP:</label>
                      <input type="text" v-model="addresses.$model.zipcode" v-mask="'##.###-###'"/>
                    </div>
                  </div>
                </div>
              </div>
              <button class="btn btn--add" @click.prevent="addItem()">
                + Endereço
              </button>
            </div>
          </div>
          <button type="submit" class="btn btn--submit" :disabled="save">
            {{save ? 'Salvando' : 'Salvar'}}
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script>
/* eslint-disable no-underscore-dangle */
import { email, required, requiredIf } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      save: false,
      person_id: null,
      person: {
        type: null,
        photo: null,
        name: null,
        email: null,
        cpf: null,
        cnpj: null,
        sexo: null,
        telephone: null,
        cellphone: null,
        birthdate: null,
        addresses: [
          {
            address: null,
            number: null,
            complement: null,
            district: null,
            city: null,
            state: null,
            zipcode: null,
          },
        ],
      },
    };
  },
  validations: {
    person: {
      type: { required },
      name: { required },
      email: { email },
      birthdate: {
        required: requiredIf((value) => value.type === 1),
      },
      sexo: {
        required: requiredIf((value) => value.type === 1),
      },
      cpf: {
        required: requiredIf((value) => value.type === 1),
      },
      cnpj: {
        required: requiredIf((value) => value.type === 2),
      },
      addresses: {
        $each: {
          address: { required },
          number: { required },
          city: { required },
          state: { required },
        },
      },
    },
  },
  methods: {
    resetAllForm() {
      delete this.person._id;
      delete this.person._createdOn;
      delete this.person._updatedOn;
      this.person.type = null;
      this.resetForm();
    },
    resetForm() {
      this.person.photo = null;
      this.person.name = null;
      this.person.email = null;
      this.person.cpf = null;
      this.person.cnpj = null;
      this.person.sexo = null;
      this.person.birthdate = null;
      this.person.telephone = null;
      this.person.cellphone = null;
      this.person.addresses = [
        {
          address: null,
          number: null,
          complement: null,
          city: null,
          state: null,
          zipcode: null,
        },
      ];
    },
    readFile(files) {
      if (files && files[0]) {
        const FR = new FileReader();
        FR.addEventListener('load', (e) => {
          document.querySelector('img.photo').src = e.target.result;
          this.person.photo = JSON.stringify(e.target.result);
        });
        FR.readAsDataURL(files[0]);
      }
    },
    previewFiles(event) {
      const wrapper = document.querySelector('.form-group__file p');
      this.readFile(event.target.files);
      wrapper.innerHTML = event.target.files[0].name;
    },
    addItem() {
      const item = {
        address: null,
        number: null,
        complement: null,
        city: null,
        state: null,
        zipcode: null,
      };

      this.person.addresses.push(item);
    },
    removeItem(key) {
      this.person.addresses.splice(key, 1);
    },
    getPerson(id) {
      this.person_id = id;
      this.$http
        .get(`/${id}`)
        .then((response) => {
          const { data } = response;
          this.person = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendPerson() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.save = true;
        const createOrUpdateRequest = (this.$route.name === 'person.new')
          ? this.$http.post('', { ...this.person })
          : this.$http.put(`/${this.person_id}`, { ...this.person });

        createOrUpdateRequest
          .then(() => {
            this.save = false;
            this.$router.push({
              name: 'people',
            });
          })
          .catch((error) => {
            this.save = false;
            console.log(error);
          });
      } else {
        setTimeout(() => {
          const erro = document.querySelectorAll('.form-group--error');
          const firstErro = erro[0];
          window.scrollTo({
            top: firstErro.offsetTop - 16,
            left: 0,
            behavior: 'smooth',
          });
        }, 100);
      }
    },
  },
  created() {
    if (this.$route.name === 'person.edit') {
      this.getPerson(this.$route.params.id);
    } else {
      this.resetAllForm();
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      if (to.name === 'person.edit') {
        vm.getPerson(to.params.id);
      } else {
        vm.resetAllForm();
      }
    });
  },
};
</script>

<style lang="scss">
.create {
  margin-bottom: 40px;
  &__box {
    background: $color-white;
    padding: 20px 0;
    margin-bottom: 15px;
    border-radius: 10px;
    box-shadow: 0px 3px 6px 0px RGBA(112, 112, 112, 0.2);
    &__inline {
      display: flex;
      justify-content: center;
      @include media("<small") {
        flex-wrap: wrap;
        p{
          flex: 1 0 100%;
          margin-bottom: 5px;
        }
        label:first-child{
          margin-left: 0px;
        }
      }
      &__wrapper{
        display: flex;
      }
      .form-group {
        margin-top: initial;
      }
    }
    &__alert {
      text-align: center;
      margin-bottom: 30px;
      color: $color-red;
    }
    &__repeater {
      position: relative;
      border-top: 1px solid RGBA(112, 112, 112, 0.1);
      padding-top: 10px;
      margin-top: 30px;
      &:first-child {
        border-top: initial;
        padding-top: initial;
        margin-top: initial;
      }
    }
    .photo{
      width: 100%;
      max-height: 300px;
      object-fit: contain;
      margin-top: 25px;
    }
  }
  &--pf {
    input[type='text'], select {
      &:focus {
        border-color: $color-primary;
      }
    }
  }
  &--pj {
    input[type='text'], select {
      &:focus {
        border-color: $color-secondary;
      }
    }
  }
  &__grid {
    display: grid;
    &--half {
      grid-template-columns: 1fr;
      @include media(">=small") {
        grid-gap: 15px;
        grid-template-columns: repeat(2, 1fr);
      }
    }
    &--colluns-3 {
      grid-template-columns: 1fr;
      @include media(">=small") {
        grid-gap: 15px;
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }
}

.form-group {
  &:not(.form-group--reseted){
    margin-top: 15px;
  }
  &__msg{
    display: none;
  }
  &--error{
    &.form-group{
      input, select{
        border-color: $color-red !important;
      }
      small{
        color: $color-red;
      }
    }
    .form-group__radio{
      p{
        color: $color-red;
      }
    }
    .form-group__msg{
      display: block;
      color: $color-red;
      font-size: 14px;
    }
  }
  label {
    display: block;
    font-weight: 900;
    margin-bottom: 15px;
    color: $color-text;
  }
  input, select {
    outline: none;
  }
  input[type='radio'] {
    margin: 0px;
  }
  input[type='text'], select {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: 1px solid $color-text;
    color: $color-text;
    transition: 0.2s ease-in-out;
    padding: 0 15px;
    font-weight: 900;
  }
  small {
    font-size: 14px;
    font-weight: 300;
  }
  &__file {
    position: relative;
    p {
      width: 100%;
      height: 40px;
      border-radius: 10px;
      border: 1px solid $color-text;
      color: $color-text;
      transition: 0.2s ease-in-out;
      padding: 0 15px;
      font-weight: 900;
      display: flex;
      align-items: center;
    justify-content: center;
    }
    input[type='file'] {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0px;
      left: 0px;
    }
  }
  &__radio {
    display: flex !important;
    align-items: center;
    margin-left: 30px;
    cursor: pointer;
    p {
      margin-left: 15px;
    }
  }
}
</style>
