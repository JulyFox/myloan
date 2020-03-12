<template>
  <div>
    <el-menu
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    router >
      <el-menu-item index="/home">
        <i class="el-icon-menu"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/loan-input/index">
        <i class="el-icon-menu"></i>
        <span slot="title">贷款申请</span>
      </el-menu-item>
      <el-menu-item index="/input-manger/index">
        <i class="el-icon-document"></i>
        <span slot="title">申请管理</span>
      </el-menu-item>

      <el-submenu index="/loan-approve/first">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>贷款审批</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/loan-approve/first">初审</el-menu-item>
          <el-menu-item index="/loan-approve/end">终审</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/contract/index">
        <i class="el-icon-setting"></i>
        <span slot="title">标的管理</span>
      </el-menu-item>

      <el-submenu index="/permission/create">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>权限管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/permission/create">创建管理员</el-menu-item>
          <el-menu-item index="/permission/list">列表展示</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {
     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
};
</script>
<style scoped>
</style>