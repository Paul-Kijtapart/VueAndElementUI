<template>
  <div class="itemMenu">
    <!-- Modals -->
    <!-- chart -->
    <el-dialog
      :title="selectedTitle"
      :visible.sync="isChartSelected"
      size="large"
      :before-close="handleClose"
    >

      <div v-if="chartDialogPage === 1">
        <!-- Body -->
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="Activity name" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="Activity zone" prop="region">
            <el-select v-model="ruleForm.region" placeholder="Activity zone">
              <el-option label="Zone one" value="shanghai"></el-option>
              <el-option label="Zone two" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Activity time" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker type="date" placeholder="Pick a date" v-model="ruleForm.date1"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker type="fixed-time" placeholder="Pick a time" v-model="ruleForm.date2"
                                style="width: 100%;"></el-time-picker>
              </el-form-item>
            </el-col>
          </el-form-item>
          <el-form-item label="Instant delivery" prop="delivery">
            <el-switch on-text="" off-text="" v-model="ruleForm.delivery"></el-switch>
          </el-form-item>
          <el-form-item label="Activity type" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="Online activities" name="type"></el-checkbox>
              <el-checkbox label="Promotion activities" name="type"></el-checkbox>
              <el-checkbox label="Offline activities" name="type"></el-checkbox>
              <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="Sponsorship"></el-radio>
              <el-radio label="Venue"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="Activity form" prop="desc">
            <el-input type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
            <el-button @click="resetForm('ruleForm')">Reset</el-button>
          </el-form-item>
        </el-form>
        <!-- Footer -->
        <span slot="footer" class="dialog-footer">
        <el-row>
             <el-button type="primary" @click="chartDialogPage += 1"> Next </el-button>
        </el-row>
      </span>
      </div>
      <div v-if="chartDialogPage === 2">
        <!-- Body -->
        <el-table :data="gridData">
          <el-table-column property="date" label="Date" width="150"></el-table-column>
          <el-table-column property="name" label="Name" width="200"></el-table-column>
          <el-table-column property="address" label="Address"></el-table-column>
        </el-table>
        <!-- Footer -->
        <span slot="footer" class="dialog-footer">
        <el-row>
          <el-col
            :span="6"
          >
            <el-button @click="chartDialogPage -= 1"> Previous </el-button>
          </el-col>
          <el-col
            :span="6"
            :offset="6"
          >
             <el-button type="primary" @click="selectedChoice = ''"> Submit </el-button>
          </el-col>
        </el-row>
      </span>
      </div>
    </el-dialog>

    <!-- other -->
    <el-dialog
      :title="selectedTitle"
      :visible.sync="isOtherSelected"
      size="large"
      :before-close="handleClose"
    >

    </el-dialog>
    <!-- Options -->
    <el-collapse
      v-model="activeNames"
      @change="handleChange"
    >
      <!-- chart -->
      <el-collapse-item
        title="Chart Items"
        name="1"
      >
        <el-button-group>
          <el-button
            type="primary"
            v-for="(chart, index) in CHART_OPTIONS"
            :key="index"
            @click="onChartItemClick(chart)"
          >
            {{ chart }}
          </el-button>
        </el-button-group>
      </el-collapse-item>
      <!-- other -->
      <el-collapse-item
        title="Other Items"
        name="2"
      >
        <el-button-group>
          <el-button
            type="primary"
            v-for="(choice, index) in OTHER_OPTIONS"
            :key="index"
            @click="onOtherItemClick(choice)"
          >
            {{ choice }}
          </el-button>
        </el-button-group>
      </el-collapse-item>

    </el-collapse>
  </div>
</template>

<script>
  import ElCollapse from '../../node_modules/element-ui/packages/collapse/src/collapse'
  import ElCollapseItem from '../../node_modules/element-ui/packages/collapse/src/collapse-item'
  import ElButtonGroup from '../../node_modules/element-ui/packages/button/src/button-group'
  import ElButton from '../../node_modules/element-ui/packages/button/src/button'
  import ElDialog from '../../node_modules/element-ui/packages/dialog/src/component'

  // Constants
  const CHART_OPTIONS = [
    'It',
    'Is',
    'High',
    'Noon',
    'Somewhere',
    'InThisWorld'
  ]

  const OTHER_OPTIONS = [
    'OK',
    'Then'
  ]

  export default {
    components: {
      ElDialog,
      ElButton,
      ElButtonGroup,
      ElCollapseItem,
      ElCollapse
    },
    data: function () {
      return {
        // Actives Bar
        activeNames: [],

        // Available Choices
        CHART_OPTIONS: CHART_OPTIONS,
        OTHER_OPTIONS: OTHER_OPTIONS,

        // Selected choices
        selectedTitle: '',
        selectedChoice: '',

        // States for chart modal
        chartDialogPage: 0,

        // Data
        gridData: [{
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-03',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-03',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-03',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-02',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-04',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-01',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }, {
          date: '2016-05-03',
          name: 'John Smith',
          address: 'No.1518,  Jinshajiang Road, Putuo District'
        }],

        // Chart Form
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: 'Please input Activity name', trigger: 'blur'},
            {min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur'}
          ],
          region: [
            {required: true, message: 'Please select Activity zone', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: 'Please pick a date', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: 'Please pick a time', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: 'Please select at least one activity type', trigger: 'change'}
          ],
          resource: [
            {required: true, message: 'Please select activity resource', trigger: 'change'}
          ],
          desc: [
            {required: true, message: 'Please input activity form', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleChange: function () {
        console.log('Change detected')
      },

      // Listeners
      onChartItemClick: function (chartName) {
        console.log(chartName + ' Chart Clicked.')
        this.chartDialogPage = 1
        this.selectedChoice = 'chart'
        this.selectedTitle = chartName
      },
      onOtherItemClick: function (otherName) {
        console.log(otherName + ' Other Clicked.')
        this.selectedChoice = 'other'
        this.selectedTitle = otherName
      },

      handleClose (done) {
        this.$confirm('Are you sure to close this dialog?')
          .then(_ => {
            console.log('k then')
            this.selectedChoice = ''
          })
          .catch(_ => {
            console.log('uhhh')
          })
      }
    },
    computed: {
      isChartSelected: function () {
        return this.selectedChoice === 'chart'
      },
      isOtherSelected: function () {
        return this.selectedChoice === 'other'
      }
    }

  }
</script>
