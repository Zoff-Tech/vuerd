import {
  SIZE_MIN_WIDTH,
  SIZE_MARGIN_RIGHT,
  SIZE_TABLE_HEIGHT,
  SIZE_COLUMN_HEIGHT,
  SIZE_COLUMN_OPTION_NN,
  SIZE_COLUMN_CLOSE,
  SIZE_COLUMN_KEY
} from "@/ts/layout";
import { Table, Column, TableUI, ColumnWidth } from "@/store/table";
import { uuid } from "@/ts/util";
import { zIndexNext, pointNext } from "@/store/table/tableHelper";
import ColumnModel from "@/models/ColumnModel";
import StoreManagement from "@/store/StoreManagement";

export default class TableModel implements Table {
  public id: string;
  public name: string = "";
  public comment: string = "";
  public columns: Column[] = [];
  public ui: TableUI;
  private store: StoreManagement;

  constructor(store: StoreManagement, table?: Table) {
    this.store = store;
    if (table) {
      this.id = table.id;
      this.name = `${table.name}`;
      this.comment = `${table.comment}`;
      this.ui = table.ui;
      table.columns.forEach(column =>
        this.columns.push(
          new ColumnModel(store, {
            load: column
          })
        )
      );
    } else {
      this.id = uuid();
      const point = pointNext(
        store,
        store.tableStore.state.tables,
        store.memoStore.state.memos
      );
      this.ui = {
        active: true,
        top: point.top,
        left: point.left,
        widthName: SIZE_MIN_WIDTH,
        widthComment: SIZE_MIN_WIDTH,
        zIndex: zIndexNext(
          store.tableStore.state.tables,
          store.memoStore.state.memos
        )
      };
    }
  }

  public width(): number {
    let width = this.ui.widthName + SIZE_MARGIN_RIGHT;
    if (this.store.canvasStore.state.show.tableComment) {
      width += this.ui.widthComment + SIZE_MARGIN_RIGHT;
    }
    const defaultColumnWidth =
      this.defaultColumnWidth() +
      SIZE_COLUMN_CLOSE +
      SIZE_COLUMN_KEY +
      SIZE_MARGIN_RIGHT;
    if (width < defaultColumnWidth) {
      width = defaultColumnWidth;
    }
    const columnWidth =
      this.maxWidthColumn().width +
      SIZE_COLUMN_CLOSE +
      SIZE_COLUMN_KEY +
      SIZE_MARGIN_RIGHT;
    if (width < columnWidth) {
      width = columnWidth;
    }
    return width;
  }

  public height(): number {
    return SIZE_TABLE_HEIGHT + this.columns.length * SIZE_COLUMN_HEIGHT;
  }

  public maxWidthColumn(): ColumnWidth {
    const columnWidth = {
      width: 0,
      name: 0,
      comment: 0,
      dataType: 0,
      default: 0,
      notNull: 0
    };
    this.columns.forEach(column => {
      if (columnWidth.name < column.ui.widthName) {
        columnWidth.name = column.ui.widthName;
      }
      if (
        this.store.canvasStore.state.show.columnComment &&
        columnWidth.comment < column.ui.widthComment
      ) {
        columnWidth.comment = column.ui.widthComment;
      }
      if (
        this.store.canvasStore.state.show.columnDataType &&
        columnWidth.dataType < column.ui.widthDataType
      ) {
        columnWidth.dataType = column.ui.widthDataType;
      }
      if (
        this.store.canvasStore.state.show.columnDefault &&
        columnWidth.default < column.ui.widthDefault
      ) {
        columnWidth.default = column.ui.widthDefault;
      }
    });
    if (this.store.canvasStore.state.show.columnNotNull) {
      columnWidth.notNull = SIZE_COLUMN_OPTION_NN;
    }
    if (columnWidth.name !== 0) {
      columnWidth.width += columnWidth.name + SIZE_MARGIN_RIGHT;
    }
    if (columnWidth.comment !== 0) {
      columnWidth.width += columnWidth.comment + SIZE_MARGIN_RIGHT;
    }
    if (columnWidth.dataType !== 0) {
      columnWidth.width += columnWidth.dataType + SIZE_MARGIN_RIGHT;
    }
    if (columnWidth.default !== 0) {
      columnWidth.width += columnWidth.default + SIZE_MARGIN_RIGHT;
    }
    if (columnWidth.notNull !== 0) {
      columnWidth.width += columnWidth.notNull + SIZE_MARGIN_RIGHT;
    }
    return columnWidth;
  }

  private defaultColumnWidth(): number {
    let width = SIZE_MIN_WIDTH + SIZE_MARGIN_RIGHT;
    if (this.store.canvasStore.state.show.columnComment) {
      width += SIZE_MIN_WIDTH + SIZE_MARGIN_RIGHT;
    }
    if (this.store.canvasStore.state.show.columnDataType) {
      width += SIZE_MIN_WIDTH + SIZE_MARGIN_RIGHT;
    }
    if (this.store.canvasStore.state.show.columnDefault) {
      width += SIZE_MIN_WIDTH + SIZE_MARGIN_RIGHT;
    }
    if (this.store.canvasStore.state.show.columnNotNull) {
      width += SIZE_COLUMN_OPTION_NN + SIZE_MARGIN_RIGHT;
    }
    return width;
  }
}
