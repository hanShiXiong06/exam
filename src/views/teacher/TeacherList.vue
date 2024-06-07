<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-crumb>
      <template #level1>教师管理</template>
      <template #level2>教师列表</template>
    </bread-crumb>
    <!-- 添加按钮 -->
    <div class="add_btn">
      <el-button type="success" @click="showAddDialog = true"
        >添加教师信息</el-button
      >
    </div>
    <el-dialog title="添加教师信息" width="50%" v-model="showAddDialog">
      <el-form :model="teacherForm" ref="teacherForm" label-width="120px">
        <el-form-item label="教师姓名">
          <el-input v-model="teacherForm.name"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="teacherForm.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="teacherForm.phone" type="number"></el-input>
        </el-form-item>
        <el-form-item label="任教学院">
          <el-checkbox-group v-model="teacherForm.departments">
            <el-checkbox
              label="人工智能学院"
              value="人工智能学院"
            ></el-checkbox>
            <el-checkbox
              label="学前教育与艺术设计学院"
              value="学前教育与艺术设计学院"
              >学前教育与艺术设计学院</el-checkbox
            >
            <el-checkbox label="电子与通信学院" value="电子与通信学院"
              >电子与通信学院</el-checkbox
            >
            <el-checkbox label="经济管理学院" value="经济管理学院"
              >经济管理学院</el-checkbox
            >
            <el-checkbox label="医学与制药工程学院" value="医学与制药工程学院"
              >医学与制药工程学院</el-checkbox
            >
            <el-checkbox
              label="机电工程与交通运输学院"
              value="机电工程与交通运输学院"
              >机电工程与交通运输学院</el-checkbox
            >
            <!-- 更多的学院复选框... -->
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showAddDialog = false">取消</el-button>
          <el-button type="primary" @click="addTeacher"> 添加 </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 教师信息列表 -->
    <el-table :data="teacherList" border>
      <!-- <el-table-column label="序号" labelWidth="2%">
        <template #default="scope">
          <span>{{ scope.$index + 1 }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="id" label="教师编号" />
      <el-table-column prop="name" label="教师姓名" />
      <el-table-column prop="sex" label="性别" />
      <el-table-column prop="phone" label="手机号" />
      <el-table-column prop="depart" label="任教学院" />
      <el-table-column label="是否禁用">
        <template #default="scope">
          <el-switch
            v-model="scope.row.isactive"
            inline-prompt
            active-text="是"
            inactive-text="否"
          />
        </template>
      </el-table-column>
      <el-table-column prop="add_time" label="添加时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="primary" @click="editInfo(scope.$index)"
            >编辑</el-button
          >
          <el-button type="danger" @click="delTeacher(scope.$index)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      small
      background
      layout="prev, pager, next"
      :total="pages.total"
      class="mt-4"
    />
    <!-- 编辑表单 -->
    <el-dialog title="编辑教师信息" width="50%" v-model="showEditDialog">
      <el-form :model="teacherForm" ref="teacherForm" label-width="120px">
        <el-form-item label="教师姓名">
          <el-input v-model="teacherForm.name"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="teacherForm.gender">
            <el-radio label="男">男</el-radio>
            <el-radio label="女">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input v-model="teacherForm.phone" type="number"></el-input>
        </el-form-item>
        <el-form-item label="任教学院">
          <el-checkbox-group v-model="teacherForm.departments">
            <el-checkbox
              label="人工智能学院"
              value="人工智能学院"
            ></el-checkbox>
            <el-checkbox
              label="学前教育与艺术设计学院"
              value="学前教育与艺术设计学院"
              >学前教育与艺术设计学院</el-checkbox
            >
            <el-checkbox label="电子与通信学院" value="电子与通信学院"
              >电子与通信学院</el-checkbox
            >
            <el-checkbox label="经济管理学院" value="经济管理学院"
              >经济管理学院</el-checkbox
            >
            <el-checkbox label="医学与制药工程学院" value="医学与制药工程学院"
              >医学与制药工程学院</el-checkbox
            >
            <el-checkbox
              label="机电工程与交通运输学院"
              value="机电工程与交通运输学院"
              >机电工程与交通运输学院</el-checkbox
            >
            <!-- 更多的学院复选框... -->
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showEditDialog = false">取消</el-button>
          <el-button type="primary" @click="doEditInfo"> 修改 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from "@/components/BreadCrumb.vue";

import {fetchTeacherList} from "@/api/teacher/teacher"

export default {
  data() {
    return {
      showAddDialog: false, // 添加模态框的显示
      showEditDialog:false,
      teacherForm: {
        name: "",
        gender: "",
        phone: "",
        departments: [],
      },
      teacherList: [
        {
          id: 1,
          name: "张三",
          sex: "男",
          phone: "13812345678",
          depart: "机电学院",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 2,
          name: "李四",
          sex: "女",
          phone: "13987654321",
          depart: "学前艺术设计",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 3,
          name: "王五",
          sex: "男",
          phone: "13765432109",
          depart: "医药学院",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 4,
          name: "赵六",
          sex: "女",
          phone: "13698765432",
          depart: "人工智能",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 5,
          name: "刘七",
          sex: "男",
          phone: "13512345678",
          depart: "人工智能,经管学院",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 6,
          name: "孙八",
          sex: "女",
          phone: "13487654321",
          depart: "人工智能",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 7,
          name: "周九",
          sex: "男",
          phone: "13365432109",
          depart: "学前艺术设计",
          isactive: true,
          add_time: "2024-05-14 15:52:50 ",
        },
        {
          id: 8,
          name: "吴十",
          sex: "女",
          phone: "13298765432",
          depart: "经管学院",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 9,
          name: "郑十一",
          sex: "男",
          phone: "13112345678",
          depart: "人工智能",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 10,
          name: "朱十二",
          sex: "女",
          phone: "13087654321",
          depart: "经管学院,基础部",
          isactive: true,
          add_time: "2024-05-14 15:52:50 ",
        },
        {
          id: 11,
          name: "马十三",
          sex: "男",
          phone: "13965432109",
          depart: "人工智能,电子通信",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 12,
          name: "陈十四",
          sex: "女",
          phone: "13898765432",
          depart: "电子通信",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 13,
          name: "林十五",
          sex: "男",
          phone: "13712345678",
          depart: "人工智能",
          isactive: true,
          add_time: "2024-05-14 15:52:50 ",
        },
        {
          id: 14,
          name: "黄十六",
          sex: "女",
          phone: "13687654321",
          depart: "学前艺术设计",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
        {
          id: 15,
          name: "徐十七",
          sex: "男",
          phone: "13565432109",
          depart: "人工智能",
          isactive: true,
          add_time: "2024-05-14 15:52:50",
        },
      ],
      pages:{
        total: 0,
        current: 1,
        size: 10,
        pagesize: 10,
      }
    };
  },
  components: { BreadCrumb },
  methods: {
    // 添加教师信息
    addTeacher() {
      let fom = this.teacherForm;
      fom.depart = fom.departments.join(",");
      fom.isactive = true;
      fom.sex = fom.gender;
      fom.id = this.teacherList.length;
      fom.add_time = this.getCurDateTime();
      this.teacherList.unshift(fom);
      this.showAddDialog = false;
    },
    // 编辑表单信息回填
    editInfo(key) {
      this.showEditDialog = true
      let info = this.teacherList[key];
      this.teacherForm = {
        name: info.name,
        gender: info.sex,
        phone: info.phone,
        departments: [],
        tid:key
      };
    },
    // 执行修改
    doEditInfo(){
      let info = this.teacherForm
      this.teacherList[info.tid]={
          id: info.tid,
          name: info.name,
          sex: info.gender,
          phone: info.phone,
          depart: info.departments.join(','),
          isactive: this.teacherList[info.tid].isactive,
          add_time: this.getCurDateTime(),
      }
      // 修改成功后，关闭模态框
      this.showEditDialog = false
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
    // 删除教师信息
    delTeacher(key) {
      this.teacherList.splice(key, 1);
    },
    // fetchTeacherList
    async _fetchTeacherList(){
       const result =  await fetchTeacherList()

       this.teacherList = result.data.rows
       this.pages.total = result.data.count
    }

  },
  mounted() {
    this._fetchTeacherList()
  }
};
</script>

<style scoped>
.add_btn {
  margin: 1rem 0;
}
</style>