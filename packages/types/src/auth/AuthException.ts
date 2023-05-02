import { ApiException } from "../exception";

export class AuthWrongPasswordException extends ApiException {
  constructor() {
    super({ code: "PIT_401001", statusCode: 400, message: "Invalid password" });
  }
}

export class AuthInvalidTokenException extends ApiException {
  constructor() {
    super({ code: "PIT_401002", statusCode: 403, message: "Invalid api token !" });
  }
}

export class AuthUserAlreadyExistException extends ApiException {
  constructor() {
    super({ code: "PIT_401003", statusCode: 400, message: "User already exists !" });
  }
}
