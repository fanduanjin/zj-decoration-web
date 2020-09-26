<template>
  <div>
    <el-card>
      <template slot="header">
        <el-tag class="clear_tag">用户列表</el-tag>
        <!-- <el-button  type="primary" class="float_right" >添加</el-button> -->
      </template>
      <el-table :data="users" border>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="userName" label="用户名" />
        <el-table-column prop="password" label="密码" />
        <el-table-column prop="phoneNumber" label="手机号" />
        <el-table-column prop="headImageUrl" label="头像地址" />
      </el-table>
      <el-pagination
        class="card_footer"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="[15, 20,50, 100]"
        :page-size="pageInfo.pageSize"
        :total="pageInfo.total"
        layout="total,sizes, prev, pager, next, jumper"
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
    this.getUserList();
  },
  methods: {
    getUserList() {
      var that = this;
      user.list(this.pageInfo, data => {
        that;
        let page = data.data;
        this.users = page.data;
        this.pageInfo.pageCount = page.pageCount;
        this.pageInfo.total = page.total;
        console.log(this);
      });
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getUserList();
    },
    next() {
      this.currentPage++;
      this.getUserList();
    }
  }
};
</script>