import { Length } from "class-validator";

export class CreateWorkspace {
  @Length(3, 64)
  name: string;
}
