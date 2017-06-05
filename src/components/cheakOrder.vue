<template>
  <div>
    <my-dialog :is-show="isCheak" @on-close='isCheakHide'>
      请检查你的支付状态！
      <div class="button" @click="checkStatus">
        支付成功
      </div>
      <div class="button" @click="checkEnd">
        支付失败
      </div>
    </my-dialog>
    <my-dialog :is-show="isCheakShow" @click='toOrderList'>
      <div class="button" @click='toOrderList'>
        购买成功！
      </div>
    </my-dialog>
    <my-dialog :is-show="isCheakShows" @click="cheakHide">
      <div class="button" @click="cheakHide">
        购买失败！
      </div>
    </my-dialog>
  </div>
</template>

<script>
  import myDialog from "./base/dialog"
  export default {
    props: {
      isCheak:{
        type:Boolean,
        default: false
      },
      bankId:{
        type:[Number,String]
      }
    },
    data () {
      return {
        isCheakShow:false,
        isCheakShows:false
      }
    },
    components:{
      myDialog
    },
    methods:{
      isCheakHide () {
        this.$emit('on-cheak-order')
      },
      checkStatus () {
        this.$http.post('/api/getOrderList',{orderId:this.bankId})
          .then((res) => {
            this.isCheakShow = true
            this.$emit('on-cheak-order')
          },(err) => {
            this.isCheakShows = true
            this.$emit('on-cheak-order')
          })
      },
      checkEnd () {
        this.isCheakShows = true
        this.$emit('on-cheak-order')
      },
      cheakHide () {
        this.isCheakShows = false
      },
      toOrderList () {
        this.isCheakShow = false
        this.$router.push({path: '/orderList'})
      }
    }
  }
</script>

<style>

</style>
