<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>
                <slot name="level1"></slot>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
            <slot name="level2"></slot>
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
   
}
</script>

<style scoped>
.el-breadcrumb {
    margin: 1rem 0px;
}
</style>