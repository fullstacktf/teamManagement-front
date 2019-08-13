<template>
  <li :class="{ completed: alert.done, editing: editing }" class="alert">
    <div class="view">
      <input
        :checked="alert.done"
        class="toggle"
        type="checkbox"
        @change="toggleAlert( alert)"
      >
      <label @dblclick="editing = true" v-text="alert.text" />
      <button class="destroy" @click="deleteAlert( alert )" />
    </div>
    <input
      v-show="editing"
      v-focus="editing"
      :value="alert.text"
      class="edit"
      @keyup.enter="doneEdit"
      @keyup.esc="cancelEdit"
      @blur="doneEdit"
    >
  </li>
</template>

<script>
export default {
  name: 'Alert',
  directives: {
    focus(el, { value }, { context }) {
      if (value) {
        context.$nextTick(() => {
          el.focus()
        })
      }
    }
  },
  props: {
    alert: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  data() {
    return {
      editing: false
    }
  },
  methods: {
    deleteAlert(alert) {
      this.$emit('deleteAlert', alert)
    },
    editAlert({ alert, value }) {
      this.$emit('editAlert', { alert, value })
    },
    toggleAlert(alert) {
      this.$emit('toggleAlert', alert)
    },
    doneEdit(e) {
      const value = e.target.value.trim()
      const { alert } = this
      if (!value) {
        this.deleteAlert({
          alert
        })
      } else if (this.editing) {
        this.editAlert({
          alert,
          value
        })
        this.editing = false
      }
    },
    cancelEdit(e) {
      e.target.value = this.alert.text
      this.editing = false
    }
  }
}
</script>
