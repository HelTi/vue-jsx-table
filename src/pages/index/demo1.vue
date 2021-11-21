<template>
  <vue-jsx-table
    :columns="columns"
    :show-pagination="false"
    :tableData="tableData"
  >
  </vue-jsx-table>
</template>

<script>
export default {
  name: "demo-1",
  data() {
    return {
      columns: [
        {
          label: "姓名",
          prop: "name3",
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
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
