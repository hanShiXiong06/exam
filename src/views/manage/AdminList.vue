<template>
  <div>
    <!-- 面包屑导航 -->
    <bread-crumb1>
        <template #level1>管理员管理</template>
        <template #level2>管理员列表</template>
    </bread-crumb1>
    <div class="add_btn">
        <el-button type="success">添加管理员</el-button>
    </div>
    <el-table :data="adminList" border>
        <el-table-column label="序号">
            <template #default="scope">
                <span>{{ scope.$index +1 }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="用户名"  />
        <el-table-column prop="type" label="类别" />
        <el-table-column prop="date" label="添加时间"/>
        <el-table-column label="操作">
            <template #default="scope">
                <el-button type="primary" @click="editInfo(scope.$index)">编辑</el-button>
                <el-button type="danger">删除</el-button>
            </template>
        </el-table-column>
  </el-table>
  </div>
</template>

<script>
import BreadCrumb1 from "@/components/BreadCrumb"
export default {
name:"adminList",
components:{BreadCrumb1},
data(){
    return {
       adminList: [
            {   
                uid:1,
                date: '2024-05-01',
                name: 'admin',
                pwd:'admin',
                type: '超级管理员',
            },{
                uid:2,
                date: '2024-05-01',
                name: 'rengong',
                pwd:'123456',
                type: '人工智能学院',
            }
        ]
    }
},
methods:{
    editInfo(key){
        console.log(key);
    }
}
}
</script>

<style scoped>
.add_btn{
    margin: 1rem 0;
}
</style>