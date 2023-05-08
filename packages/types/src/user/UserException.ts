import { ApiException } from "../exception";

export class UserNotFoundException extends ApiException {
  constructor() {
    super({ code: "PIT_402001", statusCode: 400, message: "User not found !" });
  }
}
