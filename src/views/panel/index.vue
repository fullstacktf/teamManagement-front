<template>
  <div class="panel-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminPanel from './admin'
import editorPanel from './editor'

export default {
  name: 'Panel',
  components: { adminPanel, editorPanel },
  data() {
    return {
      currentRole: 'adminPanel'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorPanel'
    }
  }
}
</script>
