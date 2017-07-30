export interface IBrandRequestInput {
  phoneNumber: string;
  message: string;
  brand: string;
  typeUrl?: boolean;
  realTime?: boolean;
  username?: string;
  password?: string;
}

export interface IBrandRequest {
  UserID: string;
  Message: string;
  Brand: string;
  TypeURL: boolean;
  RealTime: boolean;
  Username: string;
  Password: string;
}

export interface ISMSClientSetting {
  url?: string;
  username: string;
  password: string;
  brand?: string;
}

export function BrandRequest(data: IBrandRequestInput): IBrandRequest {

  return {
    UserID: data.phoneNumber,
    Message: data.message,
    Brand: data.brand,
    TypeURL: data.typeUrl,
    RealTime: data.realTime,
    Username: data.username,
    Password: data.password,
  };
}
