<template>
    <div class="con">
        <el-form :model="form" :rules="rules" ref="loginForm" label-width="80px">
            <h2>科信在线考试平台</h2>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" placeholder="请输入学号"></el-input>
            </el-form-item>
            <el-form-item label="密&nbsp;&nbsp;&nbsp;码" prop="password" class="pwd">
                <el-input type="password" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <!-- <el-form-item label="选择身份" prop="role">
                <el-select v-model="form.role" placeholder="请选择身份">
                    <el-option label="超级管理员" value="admin"></el-option>
                    <el-option label="二级学院" value="college"></el-option>
                    <el-option label="教师" value="teacher"></el-option>
                    <el-option label="学生" value="student"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="handleSubmit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

import  { login} from '@/api/teacher/auth'
import  { useAuthAdminStore} from '@/store/admin/AuthAdminStore';


export default {

    data() {
        return {
            form: {
                username: '',
                password: '',
                role: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                role: [
                    { required: true, message: '请选择身份', trigger: 'change' },
                ],
            }
        };
    },
    methods: {
       handleSubmit() {
            this.$refs.loginForm.validate(async valid => {
                if (valid) {
                    // 表单验证通过，可以进行登录逻辑
                    // console.log('登录表单提交:', this.form);
                     const res =  await login(this.form)
                     // console.log(res);
                    // 此处可以调用 API 或其他逻辑
                   //   localStorage.setItem("islogin",1);
                  useAuthAdminStore().saveToken( res.data.token )

                    this.$router.push("/");
                } else {
                    console.log('表单验证失败!');
                    return false;
                }
            });
        }

    }
}
</script>

<style scoped>
.con {
    width: 100vw;
    height: 100vh;
    background-color: red;
    background-image: url(../assets/bg.jpg);
    background-size: 100% 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.el-form{
    width: 50%;
    background-color: rgba(17, 117, 224,.3);
    padding: 2rem;
    border-radius: .5rem;
}
h2 {
  color: #007bff; /* 蓝色 */
  text-align: center;
  margin-bottom: 20px;
  font-size:2.5rem;
  letter-spacing: .5rem;
  text-shadow: 3px 3px 2px #fff,-3px -3px 2px #fff;
}
@media screen and (max-width:768px) {
    h2{
  font-size:1.5rem;

    }
}
</style>