<template>
  <el-card>
    <template slot="header">
      <el-tag class="clear_tag">商品类型属性</el-tag>
      <el-button class="float_right" type="primary" size="small" @click="insert"
        >添加</el-button
      >
    </template>
    <el-table :data="attributes">
      <el-table-column label="类型名称" prop="name"></el-table-column>
      <el-table-column
        label="输入方式"
        prop="inputMode"
        :formatter="formatterInputMode"
      ></el-table-column>
      <el-table-column label="属性值" prop="value"></el-table-column>
      <el-table-column
        label="选择方式"
        prop="selectMode"
        :formatter="formatterSelectMode"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="small" @click="modify(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="del(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :total="pageInfo.total"
      :page-count="5"
      :page-sizes="[15, 20, 50, 100]"
      layout="total,sizes, prev, pager, next, jumper"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
    <el-dialog
      :title="title"
      :before-close="closeDialog"
      :visible.sync="showDialog"
    >
      <el-form
        :model="actionModel"
        :rules="rules"
        ref="attribute"
        label-width="5rem"
      >
        <el-form-item label="属性名称" prop="name">
          <el-input v-model="actionModel.name"></el-input>
        </el-form-item>
        <el-form-item label="输入方式" prop="inputMode">
          <el-select v-model="actionModel.inputMode">
            <el-option
              v-for="item in inputModes"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="属性值" prop="value">
          <el-input v-model="actionModel.value"></el-input>
        </el-form-item>
        <el-form-item label="选择方式" prop="selectMode">
          <el-select v-model="actionModel.selectMode">
            <el-option
              v-for="item in selectModes"
              :key="item.value"
              :label="item.text"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="medium" @click="submit"
            >确定</el-button
          >
          <el-button size="medium" @click="closeDialog">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import enumGoodsTypeAttribute from "@/util/enumGoodsTypeAttribute";
import goodsTypeAttributeApi from "@/admin/api/goodsTypeAttribute";
export default {
  created() {
    this.init();
  },
  data() {
    return {
      goodsTypeId: this.$route.query.typeId,
      attributes: [],
      pageInfo: {
        total: 0,
        currentPage: 1,
        pageSize: 15,
        goodsTypeId: this.$route.query.typeId,
      },
      title: "",
      actionModel: {},
      actionType: 0,
      rules: {
        name: [{ required: true, message: "请输入属性名称", trigger: "blur" }],
        inputMode: [
          { required: true, message: "请选择输入类型", trigger: "blur" },
        ],
        value: [
          {
            validator: (rule, value, callback) => {
              var mode = enumGoodsTypeAttribute.getInputModeByText("手工输入");
              if (this.actionModel.inputMode == mode.value) {
                //手工输入 不需要此属性必填
                this.actionModel.value = "";
                callback();
                return;
              } else {
                if (!value) callback(new Error("请输入属性值"));
                else callback();
              }
            },
            trigger: "blur",
          },
        ],
        selectMode: [
          { required: true, message: "请选择选择类型", trigger: "blur" },
        ],
      },
      showDialog: false,
      inputModes: enumGoodsTypeAttribute.getInputModes(),
      selectModes: enumGoodsTypeAttribute.getSelectModes(),
    };
  },
  methods: {
    init() {
      goodsTypeAttributeApi.list(this.pageInfo, (res) => {
        let attributes = res.data.data;
        this.attributes = attributes;
        this.pageInfo.total = res.data.total;
      });
    },
    insert() {
      this.title = "添加";
      this.showDialog = true;
      this.actionType = 1;
      this.actionModel = { goodsTypeId: this.goodsTypeId };
    },
    modify(row) {
      this.title = "编辑";
      this.showDialog = true;
      this.actionType = 2;
      row;
      this.actionModel = JSON.parse(JSON.stringify(row));
    },
    del(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          goodsTypeAttributeApi.delete(id, () => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleSizeChange(size) {
      this.pageInfo.pageSize = size;
      this.init();
    },
    handleCurrentChange(currentPage) {
      this.pageInfo.currentPage = currentPage;
      this.init();
    },
    submit() {
      this.$refs.attribute.validate((valid) => {
        if (valid) {
          switch (this.actionType) {
            case 1:
              //插入
              goodsTypeAttributeApi.insert(this.actionModel, () => {
                this.$message({
                  type: "success",
                  message: "添加成功!",
                });
                this.showDialog = false;
                this.init();
              });
              break;
            case 2:
              goodsTypeAttributeApi.modify(this.actionModel, () => {
                this.$message({
                  type: "success",
                  message: "修改成功!",
                });
                this.showDialog = false;
                this.init();
              });
              break;
          }
        }
      });
    },
    closeDialog() {
      this.showDialog = false;
    },
    formatterInputMode(row, column, cellValue, index) {
      (index,column)
      let mode=enumGoodsTypeAttribute.getInputModeByEumn(cellValue);
      row.inputMode=mode.value;
      return mode.text;
    },
    formatterSelectMode(row, column, cellValue, index) {
      (index,column)
      let mode=enumGoodsTypeAttribute.getSelectModeByEnum(cellValue);
      row.selectMode=mode.value;
      return mode.text;
    },
  },
};
</script>