export interface User {
    data: UserModel[],
    totalPages: number;  
    totalElement: number;      
}

export interface UserModel {
    username: string;
    emailId: string;
    firstName: string;
    roleName: string;
    lastName: string;
    userId: string;
    roleId: number;
    phoneNumber: string;
    surgerId: number;
    surgeryName: string; 
}