export interface UserPermissions {
    'COMPONENT': Component[],
    'MENU':Menu[]
}

export interface Component {
    'accessTypeCode':string,
    'moduleCode': string,
    'id'? : number,
    'surgeryId'? : number,
    'roleId'? : number
}

export interface Menu {
    'accessTypeCode':string,
    'moduleCode': string,
    'id'? : number,
    'surgeryId'? : number,
    'roleId'? : number
}