<script>
import RenderColumn from "./render-column";
import TableSetting from "./table-setting.vue";
let COLUMN_KEY_ID = 1;

export default {
  name: "vue-jsx-table",
  components: { RenderColumn, TableSetting },
  data() {
    return {
      page: {
        // 当前页改变和页面size改变
        pageSize: 10,
        currentPage: 1,
      },
      tableSettingDialogVisible: false,
      selectedShowColumns: [], // 选择展示的列
    };
  },
  provide() {
    return {
      tableRoot: this,
    };
  },
  props: {
    columns: {
      type: Array,
      default: () => [],
    },
    hideColumns: {
      // 需要隐藏的列，label名称
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    columnsKeyName: null,
    align: {
      type: String,
      default: "left",
    },
    showPagination: {
      // 是否展示分页控件
      type: Boolean,
      default: true,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 30, 50],
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    layout: {
      type: String,
      default: "sizes, prev, pager, next,total",
    },
    total: {
      type: Number,
      default: 0,
    },
    paginationStyle: {
      type: Object,
      default() {
        return {
          "margin-top": "15px",
        };
      },
    },
    selectable: {
      // 单选按钮是否可勾选
      type: Function,
      default: () => true,
    },
    showOverflowTooltip: {
      // 全局行配置，内容过多是否展示省略
      type: Boolean,
      default: true,
    },
    showTableSetting: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: Array,
      default: () => ["vue-jsx-table-wrapper"],
    },
  },
  mounted() {
    this.initSelectedShowColumns();
  },
  watch: {
    currentPage(val) {
      // 当前currentPage 需是data属性
      this.page.currentPage = val;
    },
    hideColumns() {
      this.initSelectedShowColumns();
    },
  },
  methods: {
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.$emit("size-change", val);
      // 当前页改变和页面size改变
      this.$emit("page-change", this.page);
    },
    handleCurrentChange(val) {
      this.$emit("current-change", val);
      this.page.currentPage = val;
      // 当前页改变和页面size改变
      this.$emit("page-change", this.page);
    },
    openColumnSettingDialog() {
      this.tableSettingDialogVisible = true;
    },
    initSelectedShowColumns() {
      this.selectedShowColumns = this.columns.filter(
        (column) => !this.hideColumns.includes(column.label)
      );
    },
    confirmTableSetting(checkedColumns) {
      this.selectedShowColumns.forEach((item) => {
        if (checkedColumns.includes(item.label)) {
          item.hide = false;
        } else {
          if (item.label) {
            item.hide = true;
          }
        }
      });
      this.tableSettingDialogVisible = false;
    },
  },
  render() {
    const that = this;
    return (
      <div class="vue-jsx-table-wrapper" class={that.customClass}>
        {that.showTableSetting && (
          <div class="table-setting" on-click={that.openColumnSettingDialog}>
            <i class="el-icon-setting"></i>
          </div>
        )}
        <el-table
          highlight-current-row
          header-row-class-name="vue-jsx-table-header"
          data={this.tableData}
          ref="table"
          {...{
            props: this.$attrs,
            on: this.$listeners,
          }}
        >
          {this.selectedShowColumns.map((column) => {
            return column.hide ? null : (
              <RenderColumn
                key={column.prop ? column.prop : ++COLUMN_KEY_ID}
                column={column}
                align={this.align}
                showOverflowTooltip={this.showOverflowTooltip}
              />
            );
          })}
        </el-table>

        {that.showPagination && (
          // 分页组件
          <div class="vue-jsx-table-pagination" style={that.paginationStyle}>
            <el-pagination
              background
              vOn:size-change={that.handleSizeChange}
              vOn:current-change={that.handleCurrentChange}
              {...{
                on: {
                  "update:currentPage": (val) => (that.page.currentPage = val),
                },
              }}
              pageSizes={that.pageSizes}
              pageSize={that.pageSize}
              layout={that.layout}
              total={that.total}
            ></el-pagination>
          </div>
        )}

        <table-setting
          visible={that.tableSettingDialogVisible}
          columnOptions={that.columns}
          hideColumns={that.hideColumns}
          {...{
            on: {
              "update:visible": (val) => (that.tableSettingDialogVisible = val),
              confirm: that.confirmTableSetting,
            },
          }}
        />
      </div>
    );
  },
};
</script>

<style lang="scss">
.vue-jsx-table-wrapper {
  position: relative;

  .vue-jsx-table-pagination {
    margin-top: 15px;
  }

  .vue-jsx-table-header {
    th {
      background-color: #fafafa !important;
    }
  }

  .table-setting {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 10;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    > i {
      font-size: 18px;
    }
  }

  // el-dialog 样式
  .el-dialog__header {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    min-height: 16px;
  }

  .el-dialog__title {
    font-size: 16px;
  }

  .el-dialog__headerbtn {
    top: 16px;
  }

  // 修复表头标线错位的问题
  .el-table--border th.gutter:last-of-type {
    display: block !important;
  }
}
</style>
