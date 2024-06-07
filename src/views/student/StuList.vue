<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-crumb>
      <template #level1>学生管理</template>
      <template #level2>学生列表</template>
    </bread-crumb>
    <!-- 添加按钮 -->
    <div class="add_btn">
      <el-form :inline="true" :model="search" class="demo-form-inline">
        <el-form-item label="学生姓名">
          <el-input v-model="search.user" placeholder="学生姓名"></el-input>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="search.class" placeholder="班级">
            <el-option label="选择班级" value=""></el-option>
            <el-option label="软件22级1班" value="1"></el-option>
            <el-option label="物联网23级1班" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
        </el-form-item>
      </el-form>
      <el-button type="success" @click="showAddDialog = true">添加学生信息</el-button>
      <!-- 上传文件按钮 -->
      <el-button type="primary" @click="showImportDialog = true">批量导入</el-button>
    </div>
    <!-- 文件上传表单 -->
    <el-dialog title="批量导入学生信息" width="50%" v-model="showImportDialog">
      <el-upload class="upload-demo" ref="upload" action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview" :on-remove="handleRemove" :auto-upload="false">
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <el-button type="text" @click="downloadTemplate">下载模板文件</el-button>
    </el-dialog>
    <!-- 添加学生信息表单 -->
    <el-dialog title="添加学生信息" width="50%" v-model="showAddDialog">
      <el-form :model="studentForm" ref="studentFormRef" label-width="120px">
        <el-form-item label="学号">
          <el-input v-model="studentForm.sno" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="studentForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="studentForm.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="studentForm.major" placeholder="请选择专业">
            <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
            <el-option label="软件工程" value="软件工程"></el-option>
            <!-- 更多专业选项 -->
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="studentForm.classid" placeholder="请选择班级">
            <el-option label="2023级1班" value="class20231"></el-option>
            <el-option label="2023级2班" value="class20232"></el-option>
            <!-- 更多班级选项 -->
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="addStudent()"> 添加 </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 学生信息列表 -->
    <el-table :data="stuList" border>
      <el-table-column label="序号" width="70%">
        <template #default="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="sno" label="学号" width="90%" />
      <el-table-column prop="name" label="学生姓名" width="95%" />
      <el-table-column prop="gender" label="性别" width="90%" />
      <el-table-column prop="major" label="专业" />
      <el-table-column prop="classid" label="班级" width="95%" />
      <el-table-column label="学籍状态" width="95%">
        <template #default="scope">
          <el-tag :type="state[scope.row.status].type">{{ state[scope.row.status].txt }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="添加时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="editInfo(scope.$index)">编辑</el-button>
          <el-button type="warning" size="small" @click="resetPwd(scope.$index)">重置密码</el-button>
          <el-button type="danger" size="small" @click="delTeacher(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 编辑表单 -->
    <el-dialog title="修改学生信息" width="50%" v-model="showEditDialog">
      <el-form :model="studentForm" ref="studentFormRef" label-width="120px">
        <el-form-item label="学号">
          <el-input v-model="studentForm.sno" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="studentForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="studentForm.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="专业">
          <el-select v-model="studentForm.major" placeholder="请选择专业">
            <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
            <el-option label="软件工程" value="软件工程"></el-option>
            <!-- 更多专业选项 -->
          </el-select>
        </el-form-item>
        <el-form-item label="班级">
          <el-select v-model="studentForm.classid" placeholder="请选择班级">
            <el-option label="2023级1班" value="class20231"></el-option>
            <el-option label="2023级2班" value="class20232"></el-option>
            <!-- 更多班级选项 -->
          </el-select>
        </el-form-item>
        <el-form-item label="学籍状态">
          <el-select v-model="studentForm.status">
            <el-option label="在籍" value="0"></el-option>
            <el-option label="休学" value="1"></el-option>
            <el-option label="退学" value="2"></el-option>
            <el-option label="毕业" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button type="primary" @click="editStudent()"> 修改信息</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";
export default {
  data() {
    return {
      search:{user:'',class:''},
      showAddDialog: false, // 添加模态框的显示
      showEditDialog: false,
      showImportDialog: false, // 上传表单模态框状态
      state: [{ txt: '在籍', type: 'success' }, { txt: '休学', type: 'warning' }, { txt: '退学', type: 'danger' }, { txt: '毕业', type: 'primary' }],
      stuList: [
        {
          "sno": "20230001",
          "name": "张三",
          "gender": "男",
          "major": "计算机科学与技术",
          "classid": "2023级1班",
          "pwd": "zhangsan123",
          "status": 0,
          "addTime": "2023-09-01 08:00:00"
        },
        {
          "sno": "20230002",
          "name": "李四",
          "gender": "女",
          "major": "经济学",
          "classid": "2023级2班",
          "pwd": "lisi456",
          "status": 1,
          "addTime": "2023-09-02 10:30:00"
        },
        {
          "sno": "20230003",
          "name": "王五",
          "gender": "男",
          "major": "机械工程",
          "classid": "2023级3班",
          "pwd": "wangwu789",
          "status": 2,
          "addTime": "2023-09-03 14:15:00"
        },
        {
          "sno": "20230004",
          "name": "赵六",
          "gender": "女",
          "major": "医学",
          "classid": "2023级4班",
          "pwd": "zhaoliu000",
          "status": 3,
          "addTime": "2023-09-04 09:45:00"
        },
        {
          "sno": "20230005",
          "name": "孙七",
          "gender": "男",
          "major": "法律",
          "classid": "2023级5班",
          "pwd": "sunqi111",
          "status": 0,
          "addTime": "2023-09-05 13:30:00"
        }
      ],
      studentForm: {
        sno: '',
        name: '',
        gender: '',
        major: '',
        classid: '',
        status: '',
      }
    };
  },
  components: { BreadCrumb },
  methods: {
    // 添加学生信息
    addStudent() {
      this.stuList.unshift({
        ...this.studentForm, addTime: this.getCurDateTime(), "pwd": "zhangsan123",
        "status": 0,
      });
      this.resetForm();
      this.showAddDialog = false;
    },
    // 编辑表单信息回填
    editInfo(key) {
      this.showEditDialog = true;
      this.studentForm = JSON.parse(JSON.stringify(this.stuList[key]));
      this.studentForm.key = key;
    },
    // 执行修改学生信息
    editStudent() {
      this.stuList[this.studentForm.key] = this.studentForm;
      this.resetForm();
      this.showEditDialog = false;
    },
    // 重置密码
    resetPwd(key) {
      this.stuList[key].pwd = "123456";
      // 弹框提示，密码重置为123456
      this.$alert('密码重置为123456', '')
    },
    // 重置表单信息
    resetForm() {
      this.$refs.studentFormRef.resetFields();
    },
    // 删除学生信息
    delStudent(key) {
      this.stuList.splice(key, 1);
    },
    // 文件上传
    submitUpload() {
      this.$refs.upload.submit();
    },
    // 模板文件下载
    downloadTemplate() {
      // 下载链接
      const downloadUrl = '/path/to/your/template/file.xlsx';
      window.location.href = downloadUrl;
    },
    // 获取当前时间
    getCurDateTime() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0"); // 月份是从0开始的，所以加1
      const date = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`;
    },

  },
};
</script>

<style scoped>
.add_btn {
  display: flex;
  margin: 1rem 0;
}
.add_btn .el-form{
  flex: 1;
}
</style>