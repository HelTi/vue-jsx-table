<script>
import TableSlot from "./slot";
import TableSlotHeader from "./slot-header";

export default {
  name: "render-column",
  data() {
    return {};
  },
  components: { TableSlot, TableSlotHeader },
  props: {
    column: {
      type: Object,
      default: () => {},
    },
    align: {
      //对齐方式
      type: String,
      default: "left",
    },
    showOverflowTooltip: {
      // 全局行配置，内容过多是否展示省略
      type: Boolean,
      default: true,
    },
  },
  render() {
    const that = this;
    const align = this.align;
    const showOverflowTooltip = this.showOverflowTooltip;
    // 渲染表头，用于渲染表头红星，不常用
    const renderHeader = (configColumn) => {
      if (configColumn.showHeaderTooltip) {
        return (
          <el-tooltip
            placement="top"
            effect="light"
            content={configColumn.headerTooltipText}
          >
            <span
              class={configColumn.cellredstar ? "cell-header-red-star" : ""}
            >
              {configColumn.label}
              <i class="table-header-tip-icon el-icon-question"></i>
            </span>
          </el-tooltip>
        );
      } else {
        return (
          <span class={configColumn.cellredstar ? "cell-header-red-star" : ""}>
            {configColumn.label}
          </span>
        );
      }
    };

    // 官方不推荐使用column上的render-header函数，推荐使用插槽 ！！
    const columnRenderHeaderSlot = (column) => (scope) => {
      if (column.renderHeader) {
        // scope为  Table-column Scoped Slot 自定义表头的内容. 参数为 { column, $index }
        return column.renderHeader(column, scope);
      } else {
        if (column.slotHeader) {
          return (
            <table-slot-header
              column={column}
              scope={scope}
            ></table-slot-header>
          );
        }
        return renderHeader(column);
      }
    };

    // 自定义渲染
    function genRender(column) {
      return (
        <el-table-column
          label={column.label}
          prop={column.prop}
          width={column.width}
          fixed={column.fixed}
          align={align}
          showOverflowTooltip={
            column.showOverflowTooltip == undefined
              ? showOverflowTooltip
              : column.showOverflowTooltip
          }
          scopedSlots={{
            default: ({ row, $index }) => {
              return column.render(row, column, $index);
            },
            header: columnRenderHeaderSlot(column),
          }}
        ></el-table-column>
      );
    }

    //   插槽
    function genSlot(column) {
      return (
        <el-table-column
          label={column.label}
          prop={column.prop}
          label={column.label}
          prop={column.prop}
          width={column.width}
          fixed={column.fixed}
          sortable={column.sortable}
          align={align}
          showOverflowTooltip={
            column.showOverflowTooltip == undefined
              ? showOverflowTooltip
              : column.showOverflowTooltip
          }
          scopedSlots={{
            default: ({ row, $index }) => {
              return (
                <table-slot
                  row={row}
                  column={column}
                  $index={$index}
                  parent={that}
                ></table-slot>
              );
            },
            header: columnRenderHeaderSlot(column),
          }}
        ></el-table-column>
      );
    }

    //   渲染多级表头
    function genChildren(column) {
      let childrenColumn = column.children;
      return (
        <el-table-column
          label={column.label}
          align={align}
          scopedSlots={{
            header: columnRenderHeaderSlot(column),
          }}
        >
          {childrenColumn.map((column) => renderColumn(column))}
        </el-table-column>
      );
    }

    // 渲染展开项
    function genExpand(column) {
      // 展开项可以使用render函数，也可以使用插槽，使用插槽需声明 slot: 'expand',
      return (
        <el-table-column
          label={column.label}
          type="expand"
          scopedSlots={{
            default: ({ row, $index }) => {
              if (column.render) {
                // 渲染函数
                return column.render(row, column, $index);
              } else {
                // 通过插槽渲染展开项
                return (
                  <table-slot
                    row={row}
                    column={column}
                    $index={$index}
                  ></table-slot>
                );
              }
            },
            header: columnRenderHeaderSlot(column),
          }}
        ></el-table-column>
      );
    }

    // 普通的表格
    function genCommonColumn(column) {
      return (
        <el-table-column
          label={column.label}
          prop={column.prop}
          type={column.type}
          width={column.width}
          fixed={column.fixed}
          sortable={column.sortable}
          align={align}
          // selectable 只对仅对 type=selection 的列有效
          selectable={column.selectable}
          showOverflowTooltip={
            column.showOverflowTooltip == undefined
              ? showOverflowTooltip
              : column.showOverflowTooltip
          }
          formatter={column.formatter}
          scopedSlots={{
            header: columnRenderHeaderSlot(column),
          }}
        ></el-table-column>
      );
    }

    function renderColumn(column) {
      if (column.render && column.type !== "expand") {
        return genRender(column);
      } else if (column.slot && column.type !== "expand") {
        return genSlot(column);
      } else if (column.children) {
        return genChildren(column);
      } else if (column.type === "expand") {
        return genExpand(column);
      } else {
        return genCommonColumn(column);
      }
    }

    const column = this.column;
    return renderColumn(column);
  },
};
</script>

<style lang="scss">
.vue-jsx-table-wrapper {
  .table-header-tip-icon {
    margin-left: 6px;
    font-size: 13px;
  }
}
</style>
