<template>
  <el-container>
    <el-main class="main box_404">
      <div class="box">
        <div class="box_404">
          <span class="four"></span>
          <span class="zero"></span>
          <span class="four"></span>
        </div>
       
      </div>
       <div class="body">/(ㄒoㄒ)/~~ 页面走丢了</div>
    </el-main>
  </el-container>
</template>

<style scoped>
.main {
  position: absolute;
  top: 0%;
  bottom: 0%;
  left: 0;
  right: 0;
  /* background-image: url("../assets/background_404.webp"); */
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  color: seashell;
}

.box {
  position: absolute;
  top: 15%;
  bottom: 25%;
  left: 20%;
  right: 20%;
}

.box_404 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20%;
  background: white;
}

.four,
.zero,
.four::before,
.four::after {
  background: linear-gradient(45deg, #F5DEB3 ,#F0FFF0);
}
.four,
.four::after,
.four::before {
  border-radius: 999px;
}

.four,
.zero {
  display: inline-block;
  height: 2rem;
  width: 10rem;
}
.four::before,
.four::after {
  content: "";
  height: 2rem;
  width: 10rem;
  display: inline-block;
}
.zero {
  height: 10rem;
  width: 10rem;
  border-radius: 100%;
  position: relative;
}

.four::before {
  transform: rotate(-45deg) translate(1rem, -3rem);
}
.four::after {
  transform: rotate(-90deg) translate(3rem, 1.5rem);
}

.zero::before {
  content: "";
  display: inline-block;
  position: absolute;
  top: 20%;
  left: 20%;
  right: 20%;
  bottom: 20%;
  border-radius: 100%;
  background: white;
}
.body{
  color:#F5DEB3 ;
  font-size: 3rem;
}

</style>

<script>
export default {
  created() {}
};
</script>