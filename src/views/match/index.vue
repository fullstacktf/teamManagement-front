<template>
  <div class="match-container">
    <component :is="currentRole" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminMatch from './admin'
import editorMatch from './editor'

export default {
  name: 'Match',
  components: { adminMatch, editorMatch },
  data() {
    return {
      currentRole: 'adminMatch'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorMatch'
    }
  }
}
</script>
