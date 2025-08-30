export type UserStatus = "active" | "banned" | "suspended" | "deactivated";

export const userStatusMessages: Record<string, string> = {
  banned: "Your account has been banned. Please contact support.",
  deactivated: "Your account is deactivated. Reactivate to continue.",
  suspended: "Your account is suspended temporarily. Try again later.",
};
