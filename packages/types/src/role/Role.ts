export type Role = {
  user: User,
  workspace: Workspace
  workspaceStatus: WorkspaceStatus,
  workspaceLabel: WorkspaceLabel,
  directory: Directory,
  document: Document,
  library: Library,
  attachment: Attachment,
  team: Team,
  template: Template,
  teamPolicy: TeamPolicy,
  sprint: Sprint,
  epic: Epic,
  userStory: UserStory,
  workingTime: WorkingTime,
  role: RolePolicy,
}

type User = {
  view: boolean;
  update: boolean;
  delete: boolean;

  viewMyAccount: boolean;
  updateMyAccount: boolean;
  deleteMyAccount: boolean;
}

type Workspace = {
  view: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;

  viewOwned: boolean;
  deleteOwned: boolean;
  updateOwned: boolean;
}

type WorkspaceStatus = {

}

type WorkspaceLabel = {

}

type Directory = {

}

type Document = {

}

type Library = {

}

type Attachment = {

}

type Template = {

}

type TeamPolicy = {

}

type Team = {

}

type Sprint = {

}

type Epic = {

}

type UserStory = {

}

type WorkingTime = {

}

type RolePolicy = {

}

export type NestedKeyOf<ObjectType extends object> =
  {[Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}` | `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`
  }[keyof ObjectType & (string | number)];

export type AllPermissions = NestedKeyOf<Role>;