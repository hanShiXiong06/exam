<template>
  <bread-crumb>
    <template #level1>学生管理</template>
    <template #level2>密码修改</template>
  </bread-crumb>
  <h2 style="text-align: center;">密码修改</h2>
  <el-form :model="form" :rules="rules" ref="form" label-width="120px">
    <el-form-item label="学号" prop="teacherId">
      <el-input v-model="form.teacherId" disabled></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="teacherName">
      <el-input v-model="form.teacherName" disabled></el-input>
    </el-form-item>
    <el-form-item label="原密码" prop="oldPassword">
      <el-input type="password" v-model="form.oldPassword"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" v-model="form.newPassword"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input type="password" v-model="form.confirmPassword"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('form')">修改密码</el-button>
      <el-button @click="resetForm('form')">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from 'vue';
import BreadCrumb from '@/components/BreadCrumb.vue';

export default {
  components: {
    BreadCrumb
  },
  setup() {
    const form = reactive({
      teacherId: '', // 初始化时应从其他来源（如路由）获取
      teacherName: '', // 同上
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });

    const rules = {
      // ... 其他规则保持不变
      confirmPassword: [
        // ... 其他验证规则保持不变
      ],
    };

    function submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 调用后端API修改密码
          axios.post('/api/changePassword', form)
            .then(response => {
              if (response.data.success) {
                ElMessage.success('密码修改成功');
                // 重置表单（可选）
                resetForm('form');
              } else {
                ElMessage.error(response.data.message);
              }
            })
            .catch(error => {
              ElMessage.error('密码修改失败，请稍后再试');
              console.error(error);
            });
        } else {
          console.log('表单验证失败！');
          return false;
        }
      });
    }

    function resetForm(formName) {
      this.$refs[formName].resetFields();
    }

    // 假设从路由或其他地方获取教师编号和姓名，并在组件加载时设置
    // 这部分代码应该根据实际的应用逻辑来填写
    // 例如：使用Vue Router的route对象获取参数，或者从Vuex Store中获取数据

    return {
      form,
      rules,
      submitForm,
      resetForm,
    };
  },

};
</script>

<style></style>