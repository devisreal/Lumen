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
  firstname?: string | null | undefined;
  lastname?: string | null | undefined;
  phone?: string | null | undefined;
  role?: "user" | "admin" | "moderator" | undefined;
  status?: "active" | "banned" | "suspended" | "deactivated" | undefined;
  updated_at?: Date;
  created_at?: Date | undefined;
  deleted_at?: Date | null | undefined;
};
