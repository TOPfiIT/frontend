export enum ApiRoutes {
  // AUTH
  LOGIN = "/login",
  REGISTER = "/register",
  REFRESH_TOKEN = "/refresh",
  LOGOUT = "/logout",
  GET_SESSION = "/session",
  //   VERIFY_EMAIL = "/auth/verifyEmail",
  //   SEND_VERIFICATION_EMAIL = "/auth/sendVerificationEmail",
  //   CHANGE_PASSWORD = "/auth/changePassword",
  //   SEND_RESET_PASSWORD_EMAIL = "/auth/sendResetPasswordEmail",

  // COMPANY
  GET_COMPANY = "/company",

  // USERS
  GET_USERS = "/users",
  GET_USER = "/users/:id",
  UPDATE_USER = "/users",
  DELETE_USER = "/users",
}
