<template>
  <div class="chooser-component">
    <div>
      <ul class="chooser-list">
        <li v-for='(item,index) in choores' :class='{"active":nowIndex === index}' @click="choser(index)">
          {{item.label}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default{
    props:{
      choores:{
        type: Array,
        default:[{
          label:"test",
          value:0
        }]
      }
    },
    data () {
      return {
        nowIndex:0
      }
    },
    methods:{
      choser ( index ) {
        this.nowIndex = index
        this.$emit('on-change',this.choores[this.nowIndex])
      }
    }
  }
</script>

<style scoped>
  .chooser-component {
    position: relative;
    display: inline-block;
  }
  .chooser-list li{
    display: inline-block;
    border: 1px solid #e3e3e3;
    height: 25px;
    line-height: 25px;
    padding: 0 8px;
    margin-right: 5px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }
  .chooser-list li.active {
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
  }
</style>
