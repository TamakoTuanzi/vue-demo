<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
        <v-selection :selects="products" @on-change='seltData'></v-selection>
      </div>

      <div class="order-list-option">
        开始日期：
        <v-date-picker @on-change="startsDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        结束日期：
        <v-date-picker @on-change="endsDate"></v-date-picker>
      </div>

      <div class="order-list-option">
        关键词：
        <input type="text" class="order-query" v-model.lazy='txt'>
        <!--v-model.lazy  失去焦点时再改变-->
      </div>
      <div class="button" @click="listData">
        搜索
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads" @click="changeOrderType(head)" :class="{active:head.active}">{{ head.label }}</th>
        </tr>
        <tr v-for="item in tableData" :key="item.period">
          <td v-for="head in tableHeads">{{ item[head.key] }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  import VDatePicker from '../components/base/datepicker'
  import VSelection from '../components/base/selection'
  export default {
    components:{
      VDatePicker,
      VSelection
    },
    data () {
      return {
        txt:'',
        strDate:'',
        endDate:'',
        dataId:0,
        products: [
          {
            label: '数据统计',
            value: 0
          },
          {
            label: '数据预测',
            value: 1
          },
          {
            label: '流量分析',
            value: 2
          },
          {
            label: '广告发布',
            value: 3
          }
        ],
        tableHeads: [
          {
            label: '订单号',
            key: 'orderId'
          },
          {
            label: '购买产品',
            key: 'product'
          },
          {
            label: '版本类型',
            key: 'version'
          },
          {
            label: '有效时间',
            key: 'period'
          },
          {
            label: '购买日期',
            key: 'date'
          },
          {
            label: '数量',
            key: 'buyNum'
          },
          {
            label: '总价',
            key: 'amount'
          }
        ],
      }
    },
    watch:{
      txt () {
        console.log(this.txt);
      }
    },
    computed:{
      tableData () {
          return this.$store.getters.getOrderList
      }
    },
    methods:{
      startsDate (data) {
        this.strDate = data
      },
      endsDate (data) {
        this.endDate = data
      },
      seltData (obj) {
        this.dataId = obj.value
      },
      listData () {
        this.$store.commit('updateParams',{
          'txt':this.txt,
          'dataId':this.dataId,
          'strDate':this.strDate,
          'endDate':this.endDate,
        })
        this.$store.dispatch('acOrderList')
      }
    },
    mounted () {
      this.$store.dispatch('acOrderList')
    }
  }
</script>

<style scoped>
  .order-wrap {
    width: 1200px;
    min-height: 800px;
    margin: 20px auto;
    overflow: hidden;
  }
  .order-wrap h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .order-query {
    height: 25px;
    line-height: 25px;
    border: 1px solid #e3e3e3;
    outline: none;
    text-indent: 10px;
  }
  .order-list-option {
    display: inline-block;
    padding-left: 15px;
  }
  .order-list-option:first-child {
    padding-left: 0;
  }
  .order-list-table {
    margin-top: 20px;
  }
  .order-list-table table {
    width: 100%;
    background: #fff;
  }
  .order-list-table td,
  .order-list-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 10px 0;
  }
  .order-list-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
    cursor: pointer;
  }
  .order-list-table th.active {
    background: #35495e;
  }
</style>
