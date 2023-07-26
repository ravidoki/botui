export interface UserAyuv {
    ayvuId?: string;
    userFirstName?: string;
    userLastName?: string;
    nhsEmailId?: string;
    phoneNumber?: string;
    active?: boolean;
    username: string;
    roleId: number;
    roleName: string;
    verificationCode?: string;
    cnfPassword?: string;
    privacyPolicyAgreed?: boolean;
    termsAndConditionsAgreed?: boolean;
    subscribedToNewsletter?: boolean;
    countryCode?: string;
    gpMappings?: any;
    token?: string;
    practice?: string;
    surgeryId?: string;
    password?: string;
}
export interface RegisterUser {
    ayvuId?: string;
    firstName: string;
    lastName: string;
    nhsEmailId: string;
    phoneNumber: string;
    practice?: string;
    username: string;
    password: string;
    surgeryId?: number;
    roleId: number;
    registrationStatus?: string;
    verificationCode?: string;
    active: boolean;
    cnfPassword: string;
    privacyPolicyAgreed: boolean;
    termsAndConditionsAgreed: boolean;
    subscribedToNewsletter: boolean;
    surgery: any;
    country: any;
    countryCode: string;
}
export interface UserAyuvCreate {
    userFirstName: string;
    userLastName: string;
    nhsEmailId: string;
    phoneNumber: string;
    practice: string;
    active: boolean;
    username: string;
    password: string;
    registrationStatus: string;
    surgeryId: number;
    roleId: number;
}
export interface Password {
    ayvuId: string;
    password: string;
    newPassword: string;
    confPassword: string;
}

export interface ForgotPassword {
   emailId: any;
}
export interface FilterOption {
    id: string;
    name: string;
 }
export interface UserAudit {
    data: [{
    id: string;
    gpid: string;
    loginDate: number;
    logoutDate: number;
    userName: string;
    }],
    totalElement: number;
}

export interface MessagesAudit {
    fromDate: string;
    toDate: string;
    userName: string;
    totalSmsSent: number;
    smsStatusDto: [
        {
            id: number,
            smsSid: string,
            smsStatus: string,
            messageStatus: string,
            smsTo: string,
            messageSid: string,
            smsFrom: string,
            apiVersion: string,
            accountSid: string,
            message: string,
            senderUserName: string,
            dateCreated: string,
            dateSent: string,
            dateUpdated: string,
            errorMessage: string,
            errorCode: number,
            nhsNumber: string,
            templateId: string,
            templateType: string,
            templateUrl: string,
            roomURL: string,
            imageName: string,
            allowResponse: boolean,
            responded: boolean
        }
    ];
}
