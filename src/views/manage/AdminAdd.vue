<template>
    <div>
        <h2 style="text-align: center;margin: 1.2rem 0;">添加二级学院管理员</h2>
      <el-form :model="form" :rules="rules" ref="form" label-width="100px" style="width: 400px; margin: 0 auto;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密&nbsp;&nbsp;&nbsp;码" prop="password">
          <el-input type="password" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="院&nbsp;&nbsp;&nbsp;系" prop="type">
          <el-select v-model="form.type" placeholder="请选择类型">
            <el-option label="人工智能学院" value="1"></el-option>
            <el-option label="学前教育与艺术设计学院" value="2"></el-option>
            <el-option label="电子与通信学院" value="3"></el-option>
            <el-option label="经济管理学院" value="4"></el-option>
            <el-option label="医学与制药工程学院" value="5"></el-option>
            <el-option label="机电工程与交通运输学院" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">添加</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          username: '',
          password: '',
          type: ''
        },
        rules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ]
        }
      };
    },
    methods: {
      submitForm() {
        this.$refs.form.validate(valid => {
          if (valid) {
            // 提交表单逻辑
            console.log('表单验证通过');
          } else {
            console.log('表单验证失败');
            return false;
          }
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
    }
  };
  </script>
  
  <style scoped>
    /* 你可以在这里添加自定义样式，例如设置蓝色主题 */
    .el-button {
      background-color: #409eff;
      border-color: #409eff;
    }
  
    .el-button:hover,
    .el-button:focus {
      background-color: #66b1ff;
      border-color: #66b1ff;
    }
  </style>
  