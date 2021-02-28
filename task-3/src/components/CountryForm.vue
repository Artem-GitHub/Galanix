<template>
  <form class="form" @submit.prevent="$emit('getData', country)">
    <div class="form__inputs">
      <label class="form__label" for="country">Enter country: </label>
      <input class="form__input" v-model="country" type="text" name="country" id="country">
    </div>
    <div class="form__buttons">
      <button class="form__button" type="submit">Send</button>
      <button class="form__button" type="button" @click="$emit('clearTable')">Clear</button>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      country: null
    }
  }
}
</script>
