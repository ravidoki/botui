export class UserLogin {
    username: string;
    password: string;
    role?: string;
}


export class UserLog {
    ayvuId: string;
    surgeryId: string;
    accountNonExpired: boolean;
    accountNonLocked: boolean;
    authorities: Authorities[];
    credentialsNonExpired: boolean;
    enabled: boolean;
    fullName: string;
    password: string;
    user: User;
    username: string;
}

export class Authorities {
    authority: string;
}

export class User {
    practise: string[];
    icon: boolean;
    id: string;
    userFirstName: string;
    userLastName: string;
    active: boolean;
    cnfPassword: string;
    countryCode: string;
    nhsEmailId: string;
    phoneNumber: string;
    privacyPolicyAgreed: boolean;
    registrationStatus: string;
    roleId: number;
    roleName: string;
    subscribedToNewsletter: boolean;
    termsAndConditionsAgreed: boolean;
    username: string;
    verificationCode: string;
    surgeryMappings: SurgeryMappings[];
}

export class SurgeryMappings {
    surgery: Surgery;
    registrationStatus: string;
}

export class Surgery {
    code: string;
    name: string;
    id: number;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    addressLine4?: string;
    addressLine5?: string;
    aliasName?: string;
    contactTelephone?: string;
    postcode?: string;
    openDate?: string;
}
export class ProfileDetails{
    firstName:string;
    lastName:string;
    userId:string;
    profileImage:any;
    emailId:any;
    phoneNumber:string;
}
export interface LoggedInUserDetails{
    userToken:string;
    token:string;
    user:any;
    webLogin:boolean;
    quickLogin:boolean;
}
