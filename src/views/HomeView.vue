<template>
  <div class="home">
    <el-container>
      <el-header>
        <div>
          <img src="../assets/logo.png" alt="">
          <strong>在线考试系统</strong>
        </div>
        <div>
            <span>admin,</span>
            <span @click="logout()">退出</span>
        </div>
      </el-header>
      <el-main class="content">
        <el-aside>
          <left-menu></left-menu>
        </el-aside>
        <el-main class="con_right">
          <router-view ></router-view>
        </el-main>
      </el-main>
      <el-footer>
        <p><span>版权：石家庄科技信息职业学院</span><span>术支持：人工智能学院</span></p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import LeftMenu from "../components/LeftMenu.vue";

export default {
  name: 'HomeView',
  components: {
    LeftMenu
  },
  methods: {
    logout() {
      // 清除token
        localStorage.removeItem('islogin',0);
      // 跳转到登录页面
        this.$router.push('/login');
    },

  },
  mounted() {
    // this._fetchBook()
  }
}
</script>
<style scoped>
.el-header {
  background: #6495ed;
  color: #fff;
  height: auto;
  display: flex;
  justify-content: space-between;
}

.el-header div:first-child {
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.el-header img {
  width: 3rem;
}

.el-header div:first-child strong {
  margin-left: 1rem;
  font-size: 1.5rem;
  letter-spacing: 3px;
}
.content {
  display: flex;
  padding: 0;
  padding-top: 3px;
  min-height: calc(100vh - 95px);
  overflow: hidden;
}
.el-aside {
  margin-right: .3rem;
  width: 12%;
  box-shadow: -2px -2px 10px 2px #787879;
}
@media screen and (max-width:1200px) {
  .el-aside{
    width: 15%;
  }
}
.con_right{
  /* background: red; */
  box-shadow: -2px -2px 10px 2px #787879;
  border-radius: 5px 0 0 5px;
  padding: .5rem 1rem;
}
.el-footer {
  background: #6495ed;
  color: #fff;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 35px;
}

.el-footer p {
  font-size: .8rem;
  line-height: 25px;
}
.el-footer p span{
  margin-right: 15px;
}
</style>
