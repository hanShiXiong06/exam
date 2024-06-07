<template>
    <div>
        <!-- 面包屑导航 -->
        <bread-crumb>
            <template #level1>管理员管理</template>
            <template #level2>院系管理</template>
        </bread-crumb>
        <div class="add_btn">
            <el-button type="success" @click="showAddDialog = true">添加院系</el-button>
        </div>
        <!-- 添加院系表单-模态框 -->
        <el-dialog title="添加学院信息" width="50%" v-model="showAddDialog">
            <el-form :model="teacherForm" ref="teacherForm" label-width="120px">
                <el-form-item label="二级学院名称：">
                    <el-input v-model="departInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="当前时间:">
                    <el-input v-model="departInfo.add_time" type="text" disabled></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showAddDialog = false">取消</el-button>
                    <el-button type="primary" @click="addDepart()"> 添加 </el-button>
                </div>
            </template>
        </el-dialog>
        <el-table :data="departList" border width="90%">
            <el-table-column label="序号" width="80%">
                <template #default="scope">
                    <span>{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="二级学院名称" />
            <el-table-column prop="author" label="添加时间" />
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="editInfo(scope.$index)">更名</el-button>
                    <el-button type="danger" @click="deleteInfo(scope.$index)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 修改信息表单 -->
        <el-dialog title="修改学院信息" width="50%" v-model="showEditDialog">
            <el-form :model="teacherForm" ref="teacherForm" label-width="120px">
                <el-form-item label="二级学院名称：">
                    <el-input v-model="departInfo.name"></el-input>
                </el-form-item>
                <el-form-item label="当前时间:">
                    <el-input v-model="departInfo.add_time" type="text" disabled></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="showEditDialog = false">取消</el-button>
                    <el-button type="primary" @click="editDepart()"> 确认修改 </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
import  {fetchBook} from '@/api/teacher/category'

export default {
    data() {
        return {
            showAddDialog: false,
            showEditDialog: false,
            departList: [
                {
                    "id": 1,
                    "name": "人工智能学院",
                    "add_time": "2023-03-15 10:00:00"
                }, {
                    "id": 2,
                    "name": "经济管理学院",
                    "add_time": "2022-09-01 14:30:00"
                }, {
                    "id": 3,
                    "name": "电子与通信学院",
                    "add_time": "2021-05-20 08:45:00"
                }, {
                    "id": 4,
                    "name": "医学与制药工程学院",
                    "add_time": "2020-12-10 12:15:00"
                }, {
                    "id": 5,
                    "name": "学前教育与艺术设计学院",
                    "add_time": "2019-07-25 16:30:00"
                }, {
                    "id": 6,
                    "name": "机电工程与交通运输学院",
                    "add_time": "2018-02-12 09:00:00"
                }
            ],
            departInfo: {
                id:'',
                name: '',
                add_time: this.getCurDateTime()
            }
        }
    },
    components: { BreadCrumb },
    methods: {
        // 添加院系
        addDepart() {
            this.departInfo.id = this.departList.length + 1;
            this.departList.unshift(this.departInfo)
            this.showAddDialog = false;
            // 重置表单信息
            this.resetForm();
        },
        // 表单信息重置
        resetForm(){
            this.departInfo ={
                name: '',
                add_time: ''
            }
        },
        // 修改信息表单
        editInfo(index) {
            this.showEditDialog = true;
            this.departInfo = this.departList[index];
            this.departInfo.key=index;
        },
        // 修改院系信息
        editDepart() {
            this.departList[this.departInfo.key] = this.departInfo;
            this.showEditDialog = false;
            // 重置表单信息
            this.resetForm();
        },
        // 删除信息
        deleteInfo(index) {
            this.departList.splice(index, 1);
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
      _fetchBook(){
        fetchBook().then(res => {

          console.log(res.data.rows);
          this.departList = res.data.rows
        })
      }
    },
    mounted() {
      this._fetchBook()
    }
}
</script>

<style scoped>
.add_btn {
    margin: 20px 0;
}
</style>