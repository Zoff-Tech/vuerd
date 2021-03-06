import StoreManagement from "@/store/StoreManagement";
import { Table, Column } from "@/store/table";
import { getPrimitiveType, getNameCase } from "../GeneratorCodeHelper";
import { Database } from "@/data/DataType";
import { Case } from "@/ts/GeneratorCode";

const typescriptType: { [key: string]: string } = {
  int: "Integer",
  long: "Long",
  float: "Float",
  double: "Double",
  decimal: "BigDecimal",
  boolean: "Boolean",
  string: "String",
  lob: "String",
  date: "LocalDate",
  dateTime: "LocalDateTime",
  time: "LocalTime"
};

class java {
  public toCode(store: StoreManagement): string {
    const stringBuffer: string[] = [];
    const tables = store.tableStore.state.tables;
    const database = store.canvasStore.state.database;
    const tableCase = store.canvasStore.state.tableCase;
    const columnCase = store.canvasStore.state.columnCase;

    tables.forEach(table => {
      this.formatTable(table, stringBuffer, database, tableCase, columnCase);
      stringBuffer.push("");
    });

    return stringBuffer.join("\n");
  }

  private formatTable(
    table: Table,
    buffer: string[],
    database: Database,
    tableCase: Case,
    columnCase: Case
  ) {
    const tableName = getNameCase(table.name, tableCase);
    if (table.comment.trim() !== "") {
      buffer.push(`// ${table.comment}`);
    }
    buffer.push(`@Data`);
    buffer.push(`public class ${tableName} {`);
    table.columns.forEach(column => {
      this.formatColumn(column, buffer, database, columnCase);
    });
    buffer.push(`}`);
  }

  private formatColumn(
    column: Column,
    buffer: string[],
    database: Database,
    columnCase: Case
  ) {
    const columnName = getNameCase(column.name, columnCase);
    const primitiveType = getPrimitiveType(column.dataType, database);
    if (column.comment.trim() !== "") {
      buffer.push(`  // ${column.comment}`);
    }
    buffer.push(`  private ${typescriptType[primitiveType]} ${columnName};`);
  }
}

export default new java();
