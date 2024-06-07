<template>
    <div>
        <!-- 面包屑导航 -->
        <bread-crumb>
            <template #level1>教学管理</template>
            <template #level2>学期管理</template>
        </bread-crumb>
        <!-- 添加按钮 -->
        <div class="add_btn">
            <el-button type="success" @click="showAddDialog = true">添加学期</el-button>
        </div>
        <!-- 添加表单 -->
        <el-dialog title="添加学期信息" width="50%" v-model="showAddDialog">
            <el-form :model="form" ref="formRef" label-width="120px">
                <el-form-item label="学期编号">
                    <el-input v-model="form.sid" placeholder="请输入学期编号"></el-input>
                </el-form-item>
                <el-form-item label="学期名称">
                    <el-input v-model="form.sname" placeholder="请输入学期名称"></el-input>
                </el-form-item>
                <el-form-item label="操作员">
                    <el-input v-model="form.operator" placeholder="请输入操作员"></el-input>
                </el-form-item>
            </el-form>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="resetForm">取消</el-button>
                    <el-button type="primary" @click="addSeser()"> 添加 </el-button>
                </div>
            </template>
        </el-dialog>
        <!-- 列表数据 -->
        <el-table :data="seserList" border>
            <el-table-column label="序号" width="70%">
                <template #default="scope">
                    <span>{{ scope.$index + 1 }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="sid" label="学期id" />
            <el-table-column prop="sname" label="学期名称" />
            <el-table-column prop="operator" label="操作员" />
            <!--  <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="editInfo(scope.$index)">编辑</el-button>
                    <el-button type="danger" size="small" @click="delClass(scope.$index)">删除</el-button>
                </template>
            </el-table-column> -->
        </el-table>
    </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
export default {
    components: { BreadCrumb },
    data() {
        return {
            showAddDialog: false,
            form:{
                sid: '',
                sname: '',
                operator: ''
            },
            seserList: [{
                sid: 1,
                sname: '2023-2024学年第一学期',
                operator: '张三'
            }, {
                sid: 2,
                sname: '2023-2024学年第二学期',
                operator: '张三'
            }, {
                sid: 2,
                sname: '2024-2025学年第一学期',
                operator: '张三'
            }
            ]
        }
    },
    methods: {
        // 添加方法
        addSeser() {
            this.seserList.unshift(this.form);
            this.resetForm();
        },
        // 重置表单
        resetForm() {
            this.showAddDialog = false;
            this.$refs.formRef.resetFields();
        }
    }
}
</script>

<style>
.add_btn {
    margin: 15px 0;
}
</style>