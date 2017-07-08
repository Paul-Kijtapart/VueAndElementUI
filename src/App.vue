<template>
  <div>
    <el-row>
      <el-col :span="24">
        <item-menu></item-menu>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button>Default Button</el-button>
        <el-button type="primary">Primary Button</el-button>
        <el-button type="text">Text Button</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>

  // App Components
  import ItemMenu from './components/ItemMenu.vue'

  export default {
    components: {
      ItemMenu
    },
    data () {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!!')
      }
    }
  }
</script>
