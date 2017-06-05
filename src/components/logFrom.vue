<template>
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>
        <div class="g-form-input">
          <input type="text" v-model="username" placeholder="请输入你的邮箱地址">
        </div>
        <span class="g-form-error">{{userError.errorText}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>
        <div class="g-form-input">
          <input type="password" v-model="password" placeholder="请输入密码">
        </div>
        <span class="g-form-error">{{passError.errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <p>{{errorText}}</p>
    </div>
  </div>
</template>

<script>
  export default{
    data () {
      return {
        username:'',
        password:'',
        errorText:''
      }
    },
    computed:{
      userError () {
        let errorText, status
        if(!/@/g.test(this.username)){
          status = false
          errorText = '请输入正确的邮箱地址'
        }else{
          status = true
          errorText = ''
        }
        if(!this.userFLag){
          errorText = ''
          this.userFLag = true
        }
        return {
          status,
          errorText
        }
      },
      passError () {
        let errorText, status
        if(!/^\w{1,8}$/g.test(this.password)){
          status = false
          errorText = '密码不是1-8位'
        }else{
          status = true
          errorText = ''
        }
        if(!this.passFLag){
          errorText = ''
          this.passFLag = true
        }
        return {
          status,
          errorText
        }
      }
    },
    methods:{
      onLogin () {
        if(!this.userError.status || !this.passError.status){
          this.errorText = "请输入用户名或者密码"
        }else{
          this.errorText = ''
          this.$http.get('api/login').then((res) => {
            this.$emit('on-login',res.data)
          },(errey) =>{

          })
        }
      }
    }
  }
</script>

<style>

</style>
