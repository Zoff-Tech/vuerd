<template lang="pug">
  .preview-table(:style="tableStyle")
</template>

<script lang="ts">
import { Table as TableModel } from "@/store/table";
import StoreManagement from "@/store/StoreManagement";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Table extends Vue {
  @Prop({ type: Object, default: () => ({}) })
  private store!: StoreManagement;
  @Prop({ type: Object, default: () => ({}) })
  private table!: TableModel;

  get tableStyle(): string {
    return `
        top: ${this.table.ui.top}px;
        left: ${this.table.ui.left}px;
        width: ${this.table.width()}px;
        height: ${this.table.height()}px;
        z-index: ${this.table.ui.zIndex};
      `;
  }
}
</script>

<style scoped lang="scss">
.preview-table {
  position: absolute;
  background-color: $color-table;
  opacity: 0.9;
  padding: $size-table-padding;
  font-size: $size-font + 2;
  cursor: default;
}

ul,
ol {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
