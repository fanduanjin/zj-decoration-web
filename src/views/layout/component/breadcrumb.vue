<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="index">
      <router-link :to="item.path">{{item.meta.title}}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
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
  }
};
</script>

<style scoped>
.el-breadcrumb {
  line-height: inherit;
}
</style>