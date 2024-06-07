<template>
  <div class="main">
    <h2>欢迎admin登录登录考试系统</h2>
    <div class="main_bg"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.main{
  height: 100%;
}
h2{
  text-align: center;
  line-height: 100px;
  letter-spacing: 3px;
  font-size: 2.5rem;
}
.main_bg{
  width: 100%;
  height: calc(100% - 100px);
  background-image: url(../assets/bg_1.jpg);
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>