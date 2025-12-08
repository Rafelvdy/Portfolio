declare module 'speakeasy' {
    export interface GenerateSecretOptions {
      name: string;
      issuer?: string;
      length?: number;
    }
  
    export interface GenerateSecretResult {
      otpauth_url?: string;
      base32: string;
      hex?: string;
      qr_code_url?: string;
    }
  
    export interface TotpVerifyOptions {
      secret: string;
      encoding: 'ascii' | 'hex' | 'base32' | 'base64';
      token: string;
      window?: number;
      time?: number;
      step?: number;
      counter?: number;
    }
  
    export function generateSecret(options: GenerateSecretOptions): GenerateSecretResult;
  
    export namespace totp {
      function verify(options: TotpVerifyOptions): boolean;
    }
  }