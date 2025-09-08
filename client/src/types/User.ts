export type UserRole = "user" | "moderator" | "admin";

export const UserStatus = {
  Active: "active",
  Suspended: "suspended",
  Banned: "banned",
  Deactivated: "deactivated",
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

export type User = {
  //   id: string;
  //   email: string;
  //   role: "user" | "moderator" | "admin";

  id?: number | undefined;
  sub?: string;
  username?: string;
  email: string;
  slug: string;
  password?: string;
  firstname?: string | null;
  lastname?: string | null;
  phone?: string | null;
  role: UserRole;
  status?: UserStatus;
  updated_at?: Date;
  created_at?: Date;
  deleted_at?: Date | null;
};
