<template>
    <div>
        <!-- 面包屑 -->
        <bread-crumb>
            <template #level1>教学管理</template>
            <template #level2>课程管理</template>
        </bread-crumb>
        <!-- 课程添加 -->
        <div class="add-subject">
            <el-form :inline="true" :model="search" ref="search" class="demo-form-inline">
                <el-form-item label="开课学院">
                    <el-select v-model="search.collage" placeholder="请选择开课学院">
                        <el-option label="人工智能学院" value="1"></el-option>
                        <el-option label="电子通信学院" value="2"></el-option>
                        <el-option label="学前教育" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="课程名">
                    <el-input v-model="search.name" placeholder="请输入课程名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-button type="success" @click="addFormVisible = true">添加课程</el-button>
            <!-- 添加课程表单 -->
            <el-dialog :title="formTitle" :visible.sync="addFormVisible">
                <el-form :model="formData" ref="formData">
                    <el-form-item label="课程编号">
                        <el-input v-model="formData.sid" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="课程名称">
                        <el-input v-model="formData.sub_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="开课学院">
                        <el-select v-model="formData.collage" placeholder="请选择开课学院">
                            <el-option label="人工智能学院" value="1"></el-option>
                            <el-option label="学前教育" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="学分">
                        <el-input v-model="formData.credit" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="学时">
                        <el-input v-model="formData.lesson" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleSubmit()">确 定</el-button>
                </div>
            </el-dialog>
        </div>

        <!-- 课程列表 -->
        <el-table :data="subList" border style="width: 100%">
            <el-table-column label="序号">
                <template #default="scope">
                    <span>{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sid" label="课程ID">
            </el-table-column>
            <el-table-column prop="collage" label="开课学院">
            </el-table-column>
            <el-table-column prop="sub_name" label="课程名称">
            </el-table-column>
            <el-table-column prop="credit" label="学分">
            </el-table-column>
            <el-table-column prop="lesson" label="学时">
            </el-table-column>
            <el-table-column prop="operator" label="操作人"></el-table-column>
            <el-table-column label="操作" #default="scope">
                <el-button type="primary">编辑</el-button>
                <el-button type="danger" @click="deleteInfo(scope.$index)">删除</el-button>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
export default {
    components: { BreadCrumb },
    data() {
        return {
            addFormVisible: true, // 添加课程表单是否显示
            search: { // 搜索框表单对象
                name: '',
                collage: ''
            },
            formTitle: '添加课程',
            formData: {
                sub_name: '',
                collage: '',
                credit: '',
            },
            subList: [// 课程列表
                {
                    sid: "C1001",
                    collage: "计算机科学学院",
                    sub_name: "计算机科学导论",
                    credit: 3,
                    lesson: 48,
                    operator: "管理员A"
                },
                {
                    sid: "E2002",
                    collage: "电子工程学院",
                    sub_name: "电路基础",
                    credit: 4,
                    lesson: 64,
                    operator: "管理员B"
                },
                {
                    sid: "M3003",
                    collage: "数学学院",
                    sub_name: "高等数学",
                    credit: 3,
                    lesson: 48,
                    operator: "管理员C"
                },
                {
                    sid: "B4004",
                    collage: "商学院",
                    sub_name: "管理学原理",
                    credit: 2,
                    lesson: 32,
                    operator: "管理员D"
                },
                {
                    sid: "P5005",
                    collage: "物理学院",
                    sub_name: "大学物理",
                    credit: 4,
                    lesson: 64,
                    operator: "管理员E"
                },
                {
                    sid: "C6006",
                    collage: "化学学院",
                    sub_name: "无机化学",
                    credit: 3,
                    lesson: 48,
                    operator: "管理员F"
                },
                {
                    sid: "L7007",
                    collage: "法学院",
                    sub_name: "法律基础",
                    credit: 2,
                    lesson: 32,
                    operator: "管理员G"
                },
                {
                    sid: "H8008",
                    collage: "人文学院",
                    sub_name: "中国文学史",
                    credit: 3,
                    lesson: 48,
                    operator: "管理员H"
                },
                {
                    sid: "A9009",
                    collage: "艺术学院",
                    sub_name: "艺术概论",
                    credit: 2,
                    lesson: 32,
                    operator: "管理员I"
                },
                {
                    sid: "F1010",
                    collage: "外国语学院",
                    sub_name: "英语精读",
                    credit: 3,
                    lesson: 48,
                    operator: "管理员J"
                }
            ]
        }
    },
    methods: {
        // 课程表单操作
        handleSubmit() {
            this.addFormVisible = true;
            if (this.formTitle == '添加课程') {

            }
        },

        // 删除课程
        deleteInfo(key) {
            this.$confirm('此操作将永久删除该课程, 是否继续?', '提示消息', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then((res) => {
                this.subList.splice(key, 1);
            }).catch(() => {
            })
        }
    }
}
</script>

<style scoped>
.add-subject {
    display: flex;
    justify-content: space-between;
    padding-right: 3rem;
}

.el-select {
    min-width: 10rem;
}
</style>