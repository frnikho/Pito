import {ValidationError} from "class-validator";
import {ValidationException} from "@pito/types";

export const validationService = (validationErrors: ValidationError[] = []) => {
  const message = validationErrors.map((error) => Object.values(error.constraints ?? {})).flat();
  return new ValidationException({
    message: 'Wrong or missing request body',
    errors: message,
    target: validationErrors[0].target,
  });
}