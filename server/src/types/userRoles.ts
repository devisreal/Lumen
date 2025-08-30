export enum UserRoles {
  Admin = "admin",
  User = "user",
  Moderator = "moderator",
}

export type UserRole = keyof typeof UserRoles | `${UserRoles}`;
