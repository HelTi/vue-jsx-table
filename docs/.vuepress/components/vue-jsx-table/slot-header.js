export default {
  name: "TableSlotHeader",
  functional: true,
  inject: ["tableRoot"],
  props: {
    column: {
      type: Object,
      default: null,
    },
    scope: {
      type: Object,
      default: null,
    },
  },
  render: (h, ctx) => {
    return h(
      "span",
      {},
      ctx.injections.tableRoot.$scopedSlots[ctx.props.column.slotHeader]({
        column: ctx.props.column,
        scope: ctx.props.scope,
      })
    );
  },
};
