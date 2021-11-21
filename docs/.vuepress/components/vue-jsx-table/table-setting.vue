<script>
export default {
  name: "table-setting",
  data() {
    return {
      isIndeterminate: true,
      checkAll: false,
      checkedColumns: [],
      excludeHideColumns: [], // 排除需要隐藏的列
    };
  },
  props: {
    columnOptions: {
      type: Array,
      default: () => [],
    },
    hideColumns: {
      // 需要隐藏的列，label名称
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.initCheckedColumns();
  },
  watch: {
    hideColumns() {
      this.excludeHideColumns = this.columnOptions.filter(
        (column) => !this.hideColumns.includes(column.label)
      );
    },
  },
  methods: {
    initCheckedColumns() {
      this.checkAll = true;
      this.isIndeterminate = false;
      this.excludeHideColumns = this.columnOptions.filter(
        (column) => !this.hideColumns.includes(column.label)
      );
      this.checkedColumns = this.excludeHideColumns.map((item) => item.label);
    },
    handleCheckAllChange(val) {
      // console.log('handleCheckAllChange', val);
      if (val) {
        this.checkedColumns = this.columnOptions.map((item) => item.label);
      } else {
        this.checkedColumns = [];
      }
      this.isIndeterminate = false;
    },
    handleCheckedColumnChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.columnOptions.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.columnOptions.length;
    },
    handleConfirm() {
      this.$emit("confirm", this.checkedColumns);
    },
  },
  render() {
    return (
      <el-dialog
        title="表格设置"
        {...{ attrs: this.$attrs }}
        {...{ on: this.$listeners }}
      >
        <div class="table-setting-item">
          <p class="table-setting-item-title">字段显示设置</p>
          <div class="table-setting-item-content">
            <el-checkbox
              indeterminate={this.isIndeterminate}
              vModel={this.checkAll}
              on-change={this.handleCheckAllChange}
              style="margin-bottom:10px;"
            >
              全选
            </el-checkbox>

            <el-checkbox-group
              vModel={this.checkedColumns}
              on-change={this.handleCheckedColumnChange}
            >
              {this.excludeHideColumns.map((item) => {
                return item.label ? (
                  <el-checkbox
                    label={item.label}
                    key={item.label}
                    style="margin-bottom:10px;"
                  >
                    {item.label}
                  </el-checkbox>
                ) : null;
              })}
            </el-checkbox-group>
          </div>
        </div>
        <div slot="footer">
          <el-button on-click={this.handleConfirm} type="primary">
            确定
          </el-button>
        </div>
      </el-dialog>
    );
  },
};
</script>

<style lang="scss">
.table-setting-item-content {
  padding-top: 10px;
}
</style>
