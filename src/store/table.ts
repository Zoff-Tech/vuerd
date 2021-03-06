import Vue from "vue";
import Vuex from "vuex";
import {
  tableAdd,
  tableMove,
  tableRemove,
  tableRemoveAll,
  tableSelect,
  tableSelectAll,
  tableSelectAllEnd,
  tableMultipleSelect,
  tableFocusStart,
  tableFocusEnd,
  tableFocus,
  tableFocusMove,
  tableEditStart,
  tableEditEnd,
  tableOrderByNameASC,
  tableSort
} from "./table/tableController";
import {
  columnAdd,
  columnAddAll,
  columnFocus,
  columnRemove,
  columnRemoveAll,
  columnPrimaryKey,
  columnCopy,
  columnPaste,
  columnDraggableStart,
  columnDraggableEnd,
  columnMove,
  columnActive,
  columnActiveEnd,
  columnDataTypeSync
} from "./table/columnController";
import TableFocusModel, {
  TableFocus,
  FocusType
} from "@/models/TableFocusModel";
import { dataInit } from "@/data/table";
import TableModel from "@/models/TableModel";

import StoreManagement from "@/store/StoreManagement";
import { getData } from "@/ts/util";

Vue.use(Vuex);

export interface State {
  tables: Table[];
  tableFocus: TableFocus | null;
  edit: Edit | null;
  copyColumns: Column[];
  columnDraggable: ColumnTable | null;
}

export interface ColumnTable {
  table: Table;
  column: Column;
}

export interface Edit {
  id: string;
  focusType: FocusType;
}

export interface Table {
  id: string;
  name: string;
  comment: string;
  columns: Column[];
  ui: TableUI;

  width(): number;
  height(): number;
  maxWidthColumn(): ColumnWidth;
}

export interface ColumnWidth {
  width: number;
  name: number;
  comment: number;
  dataType: number;
  default: number;
  notNull: number;
}

export interface TableUI {
  active: boolean;
  top: number;
  left: number;
  widthName: number;
  widthComment: number;
  zIndex: number;
}

export interface Column {
  id: string;
  name: string;
  comment: string;
  dataType: string;
  default: string;
  option: ColumnOption;
  ui: ColumnUI;
}

export interface ColumnOption {
  autoIncrement: boolean;
  primaryKey: boolean;
  unique: boolean;
  notNull: boolean;
}

export interface ColumnUI {
  active: boolean;
  pk: boolean;
  fk: boolean;
  pfk: boolean;
  widthName: number;
  widthComment: number;
  widthDataType: number;
  widthDefault: number;
}

export const enum Commit {
  init = "init",
  load = "load",
  tableAdd = "tableAdd",
  tableMove = "tableMove",
  tableRemove = "tableRemove",
  tableRemoveAll = "tableRemoveAll",
  tableSelect = "tableSelect",
  tableSelectAll = "tableSelectAll",
  tableSelectAllEnd = "tableSelectAllEnd",
  tableMultipleSelect = "tableMultipleSelect",
  tableFocusStart = "tableFocusStart",
  tableFocusEnd = "tableFocusEnd",
  tableFocus = "tableFocus",
  tableFocusMove = "tableFocusMove",
  tableEditStart = "tableEditStart",
  tableEditEnd = "tableEditEnd",
  tableOrderByNameASC = "tableOrderByNameASC",
  tableSort = "tableSort",
  columnAdd = "columnAdd",
  columnAddAll = "columnAddAll",
  columnFocus = "columnFocus",
  columnRemove = "columnRemove",
  columnRemoveAll = "columnRemoveAll",
  columnPrimaryKey = "columnPrimaryKey",
  columnCopy = "columnCopy",
  columnPaste = "columnPaste",
  columnDraggableStart = "columnDraggableStart",
  columnDraggableEnd = "columnDraggableEnd",
  columnMove = "columnMove",
  columnActive = "columnActive",
  columnActiveEnd = "columnActiveEnd",
  columnDataTypeSync = "columnDataTypeSync"
}

export function createStore() {
  return new Vuex.Store<State>({
    state: {
      tables: [],
      tableFocus: null,
      edit: null,
      copyColumns: [],
      columnDraggable: null
    },
    mutations: {
      init(state: State) {
        const initData = dataInit() as any;
        const data = state as any;
        Object.keys(state).forEach(key => {
          data[key] = initData[key];
        });
      },
      load(state: State, payload: { load: State; store: StoreManagement }) {
        const { load, store } = payload;
        state.edit = load.edit;
        state.copyColumns = load.copyColumns;
        state.columnDraggable = null;
        state.tables = [];
        load.tables.forEach(table =>
          state.tables.push(new TableModel(store, table))
        );
        if (load.tableFocus) {
          const reTableFocus = load.tableFocus as any;
          const table = getData(state.tables, reTableFocus.table.id);
          if (table) {
            state.tableFocus = new TableFocusModel(store, table, reTableFocus);
          }
        } else {
          state.tableFocus = null;
        }
      },
      tableAdd,
      tableMove,
      tableRemove,
      tableRemoveAll,
      tableSelect,
      tableSelectAll,
      tableSelectAllEnd,
      tableMultipleSelect,
      tableFocusStart,
      tableFocusEnd,
      tableFocus,
      tableFocusMove,
      tableEditStart,
      tableEditEnd,
      tableOrderByNameASC,
      tableSort,
      columnAdd,
      columnAddAll,
      columnFocus,
      columnRemove,
      columnRemoveAll,
      columnPrimaryKey,
      columnCopy,
      columnPaste,
      columnDraggableStart,
      columnDraggableEnd,
      columnMove,
      columnActive,
      columnActiveEnd,
      columnDataTypeSync
    }
  });
}
