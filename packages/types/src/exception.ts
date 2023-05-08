export type ApiExceptionParams = {
  message?: string;
  statusCode?: number;
  code?: string;
}

export type ValidationExceptionParams = {
  message?: string;
  statusCode?: number;
  errors?: string[];
  target?: any;
}

export type PermissionExceptionparams = {
  permissions: string[];
}

export class ApiException extends Error {

  public readonly statusCode: number;
  public readonly code: string;

  constructor(params?: ApiExceptionParams) {
    super(params?.message ?? "An api exception occurred !");
    this.statusCode = params?.statusCode ?? 500;
    this.code = params?.code ?? 'PIT_5000';
  }

}

export class ValidationException extends Error {
  public readonly statusCode: number;
  public readonly errors: string[];
  public readonly target: any;

  constructor(params?: ValidationExceptionParams) {
    super(params?.message ?? "An api exception occurred !");
    this.statusCode = params?.statusCode ?? 500;
    this.errors = params?.errors ?? [];
    this.target = params?.target ?? {};
  }
}

export class PermissionException extends Error {
  public readonly statusCode: number;
  public readonly permissions: string[];

  constructor(params?: PermissionExceptionparams) {
    super("You don`t have enough privileges to do that !");
    this.statusCode = 403;
    this.permissions = params.permissions;
  }

}