<template>
  <section class="alertapp">
    <!-- header -->
    <header class="header">
      <h2 class="new-alert">Alertas</h2>
    </header>
    <!-- main section -->
    <section v-show="alerts.length" class="main">
      <input id="toggle-all" :checked="allChecked" class="toggle-all" type="checkbox" @change="toggleAll({ done: !allChecked })">
      <label for="toggle-all" />
      <ul class="alert-list">
        <alert
          v-for="(alert, index) in filteredAlerts"
          :key="index"
          :alert="alert"
          @toggleAlert="toggleAlert"
          @editAlert="editAlert"
          @deleteAlert="deleteAlert"
        />
      </ul>
    </section>
    <!-- footer -->
    <footer v-show="alerts.length" class="footer">
      <span class="alert-count">
        <strong>{{ remaining }}</strong>
        {{ remaining | pluralize('item') }} left
      </span>
      <ul class="filters">
        <li v-for="(val, key) in filters" :key="key">
          <a :class="{ selected: visibility === key }" @click.prevent="visibility = key">{{ key | capitalize }}</a>
        </li>
      </ul>
      <!-- <button class="clear-read" v-show="alerts.length > remaining" @click="clearRead">
        Clear read
      </button> -->
    </footer>
  </section>
</template>

<script>
import Alert from './Alert.vue'

const STORAGE_KEY = 'alerts'
const filters = {
  unread: alerts => alerts.filter(alert => !alert.done),
  all: alerts => alerts,
  read: alerts => alerts.filter(alert => alert.done)
}
const defalutList = [
  { text: 'star this repository', done: false },
  { text: 'fork this repository', done: false },
  { text: 'follow author', done: false },
  { text: 'vue-element-admin', done: true },
  { text: 'vue', done: true },
  { text: 'element-ui', done: true },
  { text: 'axios', done: true },
  { text: 'webpack', done: true }
]
export default {
  components: { Alert },
  filters: {
    pluralize: (n, w) => n === 1 ? w : w + 's',
    capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
  },
  data() {
    return {
      visibility: 'unread',
      filters,
      // alerts: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defalutList
      alerts: defalutList
    }
  },
  computed: {
    allChecked() {
      return this.alerts.every(alert => alert.done)
    },
    filteredAlerts() {
      return filters[this.visibility](this.alerts)
    },
    remaining() {
      return this.alerts.filter(alert => !alert.done).length
    }
  },
  methods: {
    setLocalStorage() {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(this.alerts))
    },
    addAlert(e) {
      const text = e.target.value
      if (text.trim()) {
        this.alerts.push({
          text,
          done: false
        })
        this.setLocalStorage()
      }
      e.target.value = ''
    },
    toggleAlert(val) {
      val.done = !val.done
      this.setLocalStorage()
    },
    deleteAlert(alert) {
      this.alerts.splice(this.alerts.indexOf(alert), 1)
      this.setLocalStorage()
    },
    editAlert({ alert, value }) {
      alert.text = value
      this.setLocalStorage()
    },
    clearRead() {
      this.alerts = this.alerts.filter(alert => !alert.done)
      this.setLocalStorage()
    },
    toggleAll({ done }) {
      this.alerts.forEach(alert => {
        alert.done = done
        this.setLocalStorage()
      })
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
</style>
