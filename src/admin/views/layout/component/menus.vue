<template>
  <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router>
    <el-menu-item index="/admin">首页</el-menu-item>
    <el-submenu index="none">
      <template slot="title">用户管理</template>
      <el-menu-item index="/admin/user">用户列表</el-menu-item>
    </el-submenu>
    <el-submenu>
      <template slot="title">商品管理</template>
      <el-menu-item>商品列表</el-menu-item>
      <el-menu-item>商品分类</el-menu-item>
      <el-menu-item>商品类型</el-menu-item>
    </el-submenu>
  </el-menu>
</template>