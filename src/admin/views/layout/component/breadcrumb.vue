<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="index">
      <router-link :to="item.path" @click="cc(item.path)">{{item.meta.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import {Menu} from 'element-ui'

export default {
  created() {
    this.getBreadcrumb();
  },
  data() {
    return { levelList: null };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched;
      const first = matched[0];
      if (first && first.name == "admin.index") {
        this.levelList = [first];
        return;
      }else{
          matched=[{path:'/admin',meta:{title:'首页',name:'admin.index'}}].concat(matched);
      }
      this.levelList = matched;
    }
  },cc(path){
    console.log(path);
    Menu.open(path);
  }
};
</script>

<style scoped>
.el-breadcrumb {
  line-height: inherit;
}
</style>