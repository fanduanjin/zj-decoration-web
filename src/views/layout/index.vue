<template>
  <div class="layout">
    <div class="aside">
      <menus></menus>
    </div>
    <div class="main">
      <div class="header">
        <breadcrumb />
      </div>

      <div class="body"><router-view/></div>
      <div class="footer">footer</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    menus: () => import("./component/menus"),
    breadcrumb: () => import("./component/breadcrumb")
  }
};
</script>

<style scoped>
.layout {
  display: flex;
}

.aside {
  flex: 1.5;
  height: 100vh;
  max-height: 100vh;
  background: #545c64;
}
.main {
  flex: 8.5;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}
.header,
.footer {
  line-height: 8vh;
  max-height: 8vh;
  background: #f2f6fc;
  flex: 1;
  padding-left: 2rem;
}
.body {
  flex: 1;
  margin: 1rem;
  background: #fff;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
body {
  margin: 0;
}
</style>