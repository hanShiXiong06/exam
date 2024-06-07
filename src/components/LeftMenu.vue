<template>
    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo" default-active="2"
        text-color="#fff">
        <el-sub-menu index="1">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>管理员管理</span>
            </template>
            <el-menu-item-group>
                <router-link to="/adminlist" tag="span"><el-menu-item index="1-1">管理员列表</el-menu-item></router-link>
                <router-link to="/adminadd" tag="span"><el-menu-item index="1-2">添加管理员</el-menu-item></router-link>
                <router-link to="/departlist" tag="span"><el-menu-item index="1-3">院系管理</el-menu-item></router-link>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="2">
            <template #title>
                <el-icon>
                    <location />
                </el-icon>
                <span>教师管理</span>
            </template>
            <el-menu-item-group>
                <router-link to="/teacherlist"><el-menu-item index="2-1">教师列表</el-menu-item></router-link>
                <!-- <el-menu-item index="2-2">添加教师</el-menu-item> -->
                <router-link to="/changepwd"><el-menu-item index="2-2">修改密码</el-menu-item></router-link>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="3">
            <template #title>
                <el-icon>
                    <document />
                </el-icon>
                <span>学生管理</span>
            </template>
            <el-menu-item-group>
                <router-link to="/classlist"><el-menu-item index="3-1">班级列表</el-menu-item></router-link>
                <router-link to="/stulist"><el-menu-item index="3-2">学生列表</el-menu-item></router-link>
                <router-link to="/stupwdchange"><el-menu-item index="3-3">密码修改</el-menu-item></router-link>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="4">
            <template #title>
                <el-icon>
                    <setting />
                </el-icon>
                <span>教学管理</span>
            </template>
            <el-menu-item-group>
                <router-link to="/senserlist"><el-menu-item index="4-1">学期管理</el-menu-item></router-link>
                <router-link to="/subjectlist"><el-menu-item index="4-2">课程管理</el-menu-item></router-link>
                <router-link to="/senserlist"><el-menu-item index="4-3">教学任务</el-menu-item></router-link>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="5">
            <template #title>
                <el-icon>
                    <setting />
                </el-icon>
                <span>题库管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="5-1">题目录入</el-menu-item>
                <el-menu-item index="5-2">题目审核</el-menu-item>
                <el-menu-item index="5-3">题目列表</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="6">
            <template #title>
                <el-icon>
                    <setting />
                </el-icon>
                <span>考试管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="6-1">创建考试</el-menu-item>
                <el-menu-item index="6-2">手动组卷</el-menu-item>
                <el-menu-item index="6-3">随机组卷</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
        <el-sub-menu index="7">
            <template #title>
                <el-icon>
                    <setting />
                </el-icon>
                <span>阅卷管理</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="7-1">考试列表</el-menu-item>
                <el-menu-item index="7-2">成绩查询</el-menu-item>
            </el-menu-item-group>
        </el-sub-menu>
    </el-menu>
</template>

<script>
export default {

}
</script>

<style scoped>

.el-menu {
    height: 100%;
}

.el-menu--vertical:not(.el-menu--collapse):not(.el-menu--popup-container) .el-sub-menu__title {
    padding: 0;
}
.el-sub-menu__title{
    padding: 0;
}
.el-menu a{
    text-decoration: none;
    color:#fff;
}
</style>