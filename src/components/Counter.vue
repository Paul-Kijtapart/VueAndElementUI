<template>
  <div class="counter">
    {{ count }}
  </div>
</template>

<script type="javascript">

  // External Plugins
  import { mapState } from 'vuex'

  export default {
    computed: mapState([
      // map this.count to store.state.count
      'count'
    ])
  }
</script>
