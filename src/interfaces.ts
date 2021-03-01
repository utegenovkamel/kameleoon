enum Type {
    CLASSIC = "CLASSIC",
    SERVER_SIDE = "SERVER_SIDE",
    MVT = "MVT",
}

enum Status {
    DRAFT = "DRAFT",
    ONLINE = "ONLINE",
    PAUSED = "PAUSED",
    STOPPED = "STOPPED",
}

export type TableColumn = "Name" | "Type" | "Status" | "Site";

export interface SiteI {
    id: number;
    url: string;
}

export interface TestI {
    id: number;
    name: string;
    type: Type;
    status: Status;
    siteId: number;
    site: string;
}

export interface SortStatusI {
    type: "ASC" | "DESC";
    column: TableColumn;
}
