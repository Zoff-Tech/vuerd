import StoreManagement from "@/store/StoreManagement";
import { Column } from "@/store/table";

export type Group = "table" | "column" | "pk" | "fk" | "pfk";

export interface Node {
  id: string;
  group: Group;
  name: string;
  tableId?: string;
}

export interface Link {
  source: string;
  target: string;
}

export interface Visualization {
  nodes: Node[];
  links: Link[];
}

class ConvertERDToVisualization {
  public toVisualization(store: StoreManagement): Visualization {
    const data: Visualization = {
      nodes: [],
      links: []
    };
    const tables = store.tableStore.state.tables;
    const relationships = store.relationshipStore.state.relationships;

    tables.forEach(table => {
      data.nodes.push({
        id: table.id,
        name: table.name,
        group: "table"
      });
      table.columns.forEach(column => {
        data.nodes.push({
          id: column.id,
          name: column.name,
          group: "column",
          tableId: table.id
        });
        data.links.push({
          source: table.id,
          target: column.id
        });
      });
    });

    relationships.forEach(relationship => {
      if (
        relationship.start.tableId !== relationship.end.tableId &&
        this.isLink(
          data.links,
          relationship.start.tableId,
          relationship.end.tableId
        )
      ) {
        data.links.push({
          source: relationship.start.tableId,
          target: relationship.end.tableId
        });
      }
    });

    return data;
  }

  private getGroup(column: Column): Group {
    if (column.ui.pk) {
      return "pk";
    } else if (column.ui.fk) {
      return "fk";
    } else if (column.ui.pfk) {
      return "pfk";
    }
    return "column";
  }

  private isLink(
    links: Link[],
    startTableId: string,
    endTableId: string
  ): boolean {
    let result = true;
    for (const link of links) {
      if (link.source === startTableId && link.target === endTableId) {
        result = false;
        break;
      }
    }
    return result;
  }
}

export default new ConvertERDToVisualization();
