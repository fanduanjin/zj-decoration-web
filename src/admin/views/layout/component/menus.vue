<template>
  <el-menu background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" router
   :default-active="$route.path">
    <el-menu-item index="/admin">首页</el-menu-item>
    <el-submenu index="/admin/user">
      <template slot="title">用户管理</template>
      <el-menu-item index="/admin/user">用户列表</el-menu-item>
    </el-submenu>
    <el-submenu index="/admin/goods">
      <template slot="title">商品管理</template>
      <el-menu-item index="/admin/goods">商品列表</el-menu-item>
      <el-menu-item index="/admin/goods/category">商品分类</el-menu-item>
      <el-menu-item index="/admin/goods/type">商品类型</el-menu-item>
    </el-submenu>
  </el-menu>
</template>