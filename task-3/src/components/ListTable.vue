<template>
  <div class="table">
    <h2>Selected universities: {{ selectedItems.length }}</h2>
    <div class="table__row table__row_title">
      <div class="table__col table__col_pos">
        <p>№</p>
      </div>
      <div class="table__col table__col_name">
        <p>Name</p>
      </div>
      <div class="table__col table__col_country">
        <p>Country</p>
      </div>
      <div class="table__col table__col_web">
        <p>Site</p>
      </div>
      <div class="table__col table__col_checkbox">
        <p>Select</p>
      </div>
    </div>
    <div v-for="item, i of data" :key="i" class="table__row">
      <div class="table__col table__col_pos">
        <p>{{i + 1}}</p>
      </div>
      <div class="table__col table__col_name">
        <p>{{item.university.name}}</p>
      </div>
      <div class="table__col table__col_country">
        <p>{{item.university.country}}</p>
      </div>
      <div class="table__col table__col_web">
        <a :href="item.university.web_pages[0]" target="blank">{{item.university.web_pages[0]}}</a>
      </div>
      <div class="table__col table__col_checkbox">
        <input @change="$emit('selectItem')" type="checkbox" :id="i" :checked="data[i].selected"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: Array,
    selectedItems: Array
  }
}
</script>
