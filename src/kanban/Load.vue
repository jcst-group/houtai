<template>
 <div>
     <vue-particles
        color="#26722d"
        :particleOpacity="0.9"
        :particlesNumber="60"
        shapeType="circle"
        :particleSize="5"
        linesColor="#26722d"
        :linesWidth="2"
        :lineLinked="true"
        :lineOpacity="0.4"
        :linesDistance="150"
        :moveSpeed="2"
        :hoverEffect="true"
        hoverMode="grab"
        :clickEffect="true"
        clickMode="push"
      >
      
      </vue-particles>
      <div class="login" >
  <h2>登录系统</h2>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'username',
          { rules: [{ required: true, message: 'Please input your username!' }] }
        ]"
        placeholder="Username"
        style="width:80%;margin-left:10%"
      >
        <a-icon
          slot="prefix"
          type="user"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] }
        ]"
        type="password"
        placeholder="Password"
        style="width:80%;margin-left:10%;"
      >
        <a-icon
          slot="prefix"
          type="lock"
          style="color: rgba(0,0,0,.25)"
        />
      </a-input>
    </a-form-item>
    <a-form-item>


      <a-button
        type="primary"
        html-type="submit"
        class="login-form-button"
        :disabled="loginBtn"
        style="width:80%;margin-left:10%"
      >
        Log in
      </a-button>

    </a-form-item>
  </a-form>
  </div>
     
 </div>
</template>
<script>
import { mapActions } from "vuex"
import Vue from 'vue'
import { ACCESS_TOKEN } from "@/store/mutation-types"
  export default {
    beforeCreate () {
      this.form = this.$form.createForm(this);
    },

    data() {
      return {
        loginBtn: false,
      }
    },

    methods: {
      handleSubmit (e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            this.loginBtn = true
            console.log('Received values of form: ', values);
            this.$store.dispatch("user/login",values).then(()=>{
              this.$router.push({ path: 'users' })
              this.$notification.success({
                message: '欢迎',
                description: `欢迎回来`,
              });
              this.loginBtn = false;

            }).catch(error=>{
              console.log(error)
              this.$notification[ 'error' ]({
                message: '登录失败',
                description: ((error.response || {}).data || {}).message || error.message || "请求出现错误，请稍后再试",
                duration: 4,
              });
              /*this.$notification[ 'error' ]({
                message: '登录失败',
                description: ((err.response || {}).data || {}).message || err.message || "请求出现错误，请稍后再试",
                duration: 4,
              });*/
              this.loginBtn = false;
            })
          }
        });
      },
    },
  };
</script>
<style>
body{height:100%;background:linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%);overflow:hidden;}
  #components-form-demo-normal-login .login-form {
    max-width: 300px;
  }
  #components-form-demo-normal-login .login-form-forgot {
    float: right;
  }
  .login{
      width:10%;
      min-width: 300px;
      height:200px;
      position: absolute;
      top:30%;
      left:42%;
      box-shadow: 0 0 50px  #ffffff;
  }
  .login>h2{
      width: 100px;
      margin: auto;
      font-weight: bold;
      
  }
</style>