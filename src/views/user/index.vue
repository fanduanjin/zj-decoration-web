<template>
  <div>
    <el-card>
        <template slot="header">fdfsd</template>
      <el-table :data="users" border>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="phoneNumber" label="手机号" />
        <el-table-column prop="headImageUrl" label="头像地址" />
      </el-table>
      <el-pagination class="card_footer"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="[15, 20,50, 100]"
        :page-size="15"
        :page-count="pageInfo.pageCount"
        layout="total,sizes, prev, pager, next, jumper"
        :total="300"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
import user from "@/api/user";

export default {
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 15
      },
      users: []
    };
  },

  created() {
    var that = this;
    user.list(this.pageInfo, data => {
      let page = data.data;
      that.users = page.data;
      console.log(that.users);
      that.pageInfo.pageCount = data.pageCount;
    });
  }
};
</script>