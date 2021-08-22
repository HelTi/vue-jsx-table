<template>
  <div>
    <z-card title="表格1">
      <z-render-table
        :columns="columns"
        :tableData="tableData"
        border
        @page-change="pageChangeHandle"
        :currentPage.sync="paginationParams.pageNo"
        :total="100"
      >
        <!-- expand 插槽 -->
        <template v-slot:expand>
          <z-render-table
            :columns="columns2"
            :tableData="tableData"
            border
            style="width: 700px"
            :showPagination="false"
            @selection-change="selectionChange"
          />
        </template>
        <!-- 自定义插槽 -->
        <template v-slot:edit="{ row }">
          <el-button type="text" @click="editHandle(row)"> 编辑</el-button>
          <br />
          <el-input v-model="row.name"></el-input>
        </template>
        <!-- 插槽表头 -->
        <template v-slot:slotHeader="{ column }">
          <!-- {{ scope.column.label }} -->
          <span>插槽表头： {{ column.label }}</span>
        </template>
      </z-render-table>
    </z-card>
    <z-card title="设置展示字段">
      <el-button type="primary" @click="showGrate"> 展示年级 </el-button>
      <el-button type="primary" @click="hideGrate"> 隐藏年级 </el-button>
      <z-render-table
        :columns="columns3"
        :tableData="tableData"
        border
        :showPagination="false"
        showTableSetting
        :hideColumns="hideColumns"
      />
    </z-card>
  </div>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      columns: [
        {
          type: "expand",
          slot: "expand",
        },
        {
          label: "姓名+表头红星",
          prop: "name1",
          width: 160,
          cellredstar: true,
        },
        {
          label: "自定义表头",
          prop: "name2",
          width: 120,
          sortable: true,
          renderHeader: (column, scope) => {
            console.log("scope", scope);
            return <span class="cell-header-red-star">{column.label}</span>;
          },
        },
        {
          label: "姓名",
          prop: "name3",
          slotHeader: "slotHeader",
        },
        {
          label: "年龄",
          prop: "age",
          sortable: true,
        },
        {
          label: "多级表头",
          children: [
            {
              label: "年级",
              prop: "grade",
              width: 120,
            },
            {
              label: "班级",
              prop: "class",
              formatter: (row) => {
                return `${row.grade}:${row.class}`;
              },
            },
          ],
        },
        {
          label: "render",
          prop: "render",
          width: 200,
          cellredstar: true,
          render: (row, column, $index) => {
            return (
              <div onClick={() => this.cellClick(row, column, $index)}>
                测试render
              </div>
            );
          },
        },
        {
          label: "学校",
          prop: "school",
          width: 200,
          showHeaderTooltip: true,
          headerTooltipText: "学校tooltipText",
        },
        {
          label: "学费",
          prop: "fee",
          width: 200,
        },

        {
          label: "编辑",
          prop: "edit",
          slot: "edit",
          fixed: "right",
          width: 200,
        },
      ],
      columns2: [
        {
          type: "selection",
          fixed: "left",
          selectable: this.rowSelectableHandle,
        },
        {
          type: "expand",
          render: () => {
            return <div>通过render 函数自定义内容</div>;
          },
        },
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "年龄",
          prop: "age",
        },
      ],
      tableData: [
        {
          name: "张三",
          name1: "张三",
          name2: "张三",
          name3: "张三",
          age: 18,
          id: 1,
          school: "一中",
          fee: 2000,
          grade: "高一",
          class: "一班",
        },
        {
          name: "李四",
          name1: "李四",
          name2: "李四",
          name3: "李四",
          age: 19,
          id: 2,
          school: "二中",
          fee: 1000,
          grade: "高二",
          class: "三班",
        },
      ],
      columns3: [
        {
          label: "姓名",
          prop: "name",
        },
        {
          label: "年龄",
          prop: "age",
        },
        {
          label: "学校",
          prop: "school",
        },
        {
          label: "学费",
          prop: "fee",
        },
        {
          label: "年级",
          prop: "grade",
        },
        {
          label: "班级",
          prop: "class",
        },
      ],
      paginationParams: {
        pageNo: 1,
        pageSize: 10,
      },
      hideColumns: [],
    };
  },
  methods: {
    selectionChange(val) {
      console.log("val", val);
    },
    cellClick(row, column, index) {
      console.log("cellClick", row, column, index);
    },
    rowSelectableHandle(row) {
      return row.id === 2;
    },
    editHandle(row) {
      console.log("editHandle:row", row);
    },
    pageChangeHandle(val) {
      this.paginationParams.pageNo = val.currentPage;
      this.paginationParams.pageSize = val.pageSize;
    },
    showGrate() {
      this.hideColumns = [];
    },
    hideGrate() {
      this.hideColumns = ["年级"];
    },
  },
};
</script>

<style lang="scss" scoped></style>
