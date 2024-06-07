<template>
    <div>
        <!-- 面包屑导航 -->
        <bread-crumb>
            <template #level1>学生管理</template>
            <template #level2>班级列表</template>
        </bread-crumb>
        <!-- 添加按钮 -->
        <div class="add_btn">
            <el-button type="success" @click="showAddDialog = true">添加班级</el-button>
        </div>
        <!-- 添加学生信息表单 -->
        <el-dialog title="添加班级信息" width="50%" v-model="showAddDialog">
            <el-form :model="classForm" ref="classFormRef" label-width="120px">
                <el-form-item label="班级编号">
                    <el-input v-model="classForm.classid" placeholder="请输入班级编号"></el-input>
                </el-form-item>
                <el-form-item label="班级名称">
                    <el-input v-model="classForm.cname" placeholder="请输入班级名称"></el-input>
                </el-form-item>
                <el-form-item label="辅导员">
                    <el-input v-model="classForm.teacher" placeholder="请输入辅导员"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="classForm.teach_phone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showAddDialog = false">取消</el-button>
                    <el-button type="primary" @click="addClass()"> 添加 </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 学生信息列表 -->
        <el-table :data="classList" border>
            <el-table-column label="序号" width="70%">
                <template #default="scope">
                    <span>{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="classid" label="班级id" />
            <el-table-column prop="cname" label="班级名称" />
            <el-table-column prop="teacher" label="辅导员" />
            <el-table-column prop="teach_phone" label="电话" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="editInfo(scope.$index)">编辑</el-button>
                    <el-button type="danger" size="small" @click="delClass(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 编辑表单 -->
        <el-dialog title="修改班级信息" width="50%" v-model="showEditDialog">
            <el-form :model="classForm" ref="classFormRef" label-width="120px">
                <el-form-item label="班级编号">
                    <el-input v-model="classForm.classid" placeholder="请输入班级编号"></el-input>
                </el-form-item>
                <el-form-item label="班级名称">
                    <el-input v-model="classForm.cname" placeholder="班级名称"></el-input>
                </el-form-item>
                <el-form-item label="辅导员">
                    <el-input v-model="classForm.teacher" placeholder="请输入辅导员"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="classForm.teach_phone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showEditDialog = false">取消</el-button>
                    <el-button type="primary" @click="editClass()"> 修改信息</el-button>
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
            showAddDialog: false, // 添加模态框的显示
            showEditDialog: false,
            classList: [
                {
                    "classid": "2201",
                    "cname": "2022级软件1班",
                    "teacher": "张三",
                    "teach_phone": "182124578"
                },
                {
                    "classid": "2201",
                    "cname": "2022级软件1班",
                    "teacher": "张三",
                    "teach_phone": "182124578"
                },
                {
                    "classid": "2201",
                    "cname": "2022级软件1班",
                    "teacher": "张三",
                    "teach_phone": "182124578"
                },
                {
                    "classid": "2201",
                    "cname": "2022级软件1班",
                    "teacher": "张三",
                    "teach_phone": "182124578"
                }
            ],
            classForm: {
                classid: '',
                cname: '',
                teacher: '',
                teach_phone: ''
            }
        };
    },
    components: { BreadCrumb },
    methods: {
        // 添加学生信息
        addClass() {
            this.classList.unshift({
                ...this.classForm
            });
            this.resetForm();
            this.showAddDialog = false;
        },
        // 编辑表单信息回填
        editInfo(key) {
            this.showEditDialog = true;
            this.classForm = this.classList[key];
            this.classForm.key = key;
        },
        // 执行修改学生信息
        editClass() {
            this.classList[this.classForm.key] = this.classForm;
            this.resetForm();
            this.showEditDialog = false;
        },
        // 重置表单信息
        resetForm() {
            this.$refs.classFormRef.resetFields();
        },
        // 删除学生信息
        delClass(key) {
            this.classList.splice(key, 1);
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
    margin: 1rem 0;
}
</style>