interface User {
  id: string;
  name: string;
}

interface AuthRequest {
  name: string;
  password: string;
}

// interface RegisterRequest {
//   name: string;
//   surname: string;
//   email: string;
//   password: string;
// }

// interface VerifyEmailRequest {
//   email: string;
//   code: string;
// }

// interface SendVerificationEmailRequest {
//   email: string;
// }

// interface ChangePasswordRequest {
//   email: string;
//   newPassword: string;
//   token: string;
// }

// interface SendResetPasswordEmailRequest {
//   email: string;
// }

// user service
interface GetUserResponse {
  user: User;
}

interface GetUsersResponse {
  users: User[];
}

// interface UpdateUserRequest {
//   name: string;
//   surname: string;
// }
