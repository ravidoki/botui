export interface PermissionNode {
    moduleCode: string;
    accessTypeCode: string;
    surgeryId?: number;
    components?: PermissionNode[];
    expandable?:boolean;
    roleId?:number;
  }