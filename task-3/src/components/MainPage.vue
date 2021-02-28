<template>
  <div class="main">
    <h1>Get universities</h1>
    <CountryForm @getData="getData" @clearTable="clearTable"/>
    <ListTable v-if="data.length" :data="data" :selectedItems="selectedItems" @selectItem="selectItem"/>
    <DataLoading v-else-if="loading"/>
    <NoData v-else/>
  </div>
</template>

<script>

import CountryForm from '@/components/CountryForm.vue'
import ListTable from '@/components/ListTable.vue'
import DataLoading from '@/components/DataLoading.vue'
import NoData from '@/components/NoData.vue'

export default {
  data () {
    return {
      data: [],
      selectedItems: [],
      loading: false
    }
  },
  methods: {
    async getData (country) {
      if (localStorage.length) {
        this.data = []
        this.selectedItems = []
        localStorage.clear()
      }
      this.loading = !this.loading
      try {
        this.response = await fetch(`http://universities.hipolabs.com/search?country=${country}`).then(res => res.json())
      } catch (err) {
        console.log(err)
      }
      this.response.forEach((item, i) => {
        this.data.push({ university: item, itemId: i, selected: '' })
      })
      this.loading = !this.loading
    },
    clearTable () {
      this.data = []
      this.selectedItems = []
      localStorage.clear()
    },
    selectItem () {
      if (event.target.checked) {
        this.data[event.target.id].selected = 'checked'
        this.selectedItems.push(this.data[event.target.id])
        this.addToLocalStorage('data', this.data)
        this.addToLocalStorage('selectedItems', this.selectedItems)
      } else {
        this.data.forEach((item, i) => {
          if (String(i) === event.target.id) {
            this.data[i].selected = ''
            this.selectedItems = this.selectedItems.filter(item => item.itemId !== i)
            this.addToLocalStorage('data', this.data)
            this.addToLocalStorage('selectedItems', this.selectedItems)
          }
        })
      }
    },
    addToLocalStorage (name, data) {
      localStorage.setItem(name, JSON.stringify(data))
    },
    getFromLocalStorage (name, data) {
      return JSON.parse(localStorage.getItem(name, data))
    }
  },
  mounted () {
    if (localStorage.length) {
      this.data = this.getFromLocalStorage('data', this.data)
      this.selectedItems = this.getFromLocalStorage('selectedItems', this.selectedItems) || []
    }
  },
  components: {
    CountryForm,
    ListTable,
    DataLoading,
    NoData
  }
}
</script>
