<template>
  <el-card>
    <template slot="header">
      <el-tag class="clear_tag">商品类型</el-tag>
      <el-button class="float_right" type="primary" size="small" @click="insert">添加</el-button>
    </template>
    <el-table :data="types">
      <el-table-column label="属性名称" prop="name"></el-table-column>
      <el-table-column label="属性个数">
        <template slot-scope="scope">{{attributeSize(scope.row)}}</template>
      </el-table-column>
      <el-table-column label="参数个数">
        <template slot-scope="scope">{{parameterSize(scope.row)}}</template>
      </el-table-column>
      <el-table-column label="设置" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="(scope.row)">属性设置</el-button>
          <el-button size="small">参数设置</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="modify(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="pageInfo.total"
      :page-count="5"
      :page-sizes="[15,20,50,100]"
      layout="total,sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-dialog :title="title" :before-close="closeDialog" :visible.sync="showDialog">
      <el-form :model="actionModel" :rules="rules" ref="goodsType" label-width="5rem">
        <el-form-item label="属性名称" prop="name">
          <el-input v-model="actionModel.name"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" @click="submit">确定</el-button>
          <el-button size="medium" @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import goodsTypeApi from "@/admin/api/goodsType";

export default {
  data() {
    return {
      types: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 15
      },
      showDialog: false,
      title: "",
      // actionType 1 增加 2 编辑
      actionType: 1,
      actionModel: { name: "fds" },
      rules: {
        name: [{ required: true, message: "请输入属性名称", trigger: "blur" }]
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      goodsTypeApi.list(this.pageInfo, res => {
        let data = res.data.data;
        this.types = data;
        this.pageInfo.total = res.data.total;
      });
      console.log("init");
    },
    attributeSize(row) {
      return row.attributes ? row.attributes.length : 0;
    },
    parameterSize(row) {
      return row.parameters ? row.parameters.length : 0;
    },
    handleSizeChange(size) {
      this.pageInfo.pageSize = size;
      this.init();
    },
    handleCurrentChange(currentPage) {
      this.pageInfo.currentPage = currentPage;
      this.init();
    },
    insert() {
      this.title = "添加";
      this.showDialog = true;
      this.actionType = 1;
      this.actionModel = { id: 1 };
    },
    closeDialog(done) {
      this.showDialog = false;
      done && done();
    },
    del(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          goodsTypeApi.delete(id, () => {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    modify(row) {
      this.title = "编辑";
      this.showDialog = true;
      this.actionType = 2;
      row;
      this.actionModel = JSON.parse(JSON.stringify(row));
    },
    submit() {
      this.$refs["goodsType"].validate(valid => {
        if (valid) {
          switch (this.actionType) {
            case 1:
              console.log("submit");
              goodsTypeApi.insert(this.actionModel, () => {
                this.$message({ message: "添加成功", type: "success" });
                this.closeDialog();
                this.init();
                console.log("fdsfs");
              });
              break;
            case 2:
              goodsTypeApi.modify(this.actionModel, () => {
                this.$message({ message: "修改成功", type: "success" });
                this.closeDialog();
                this.init();
              });
              break;
          }
        }
      });
    }
  }
};
</script>