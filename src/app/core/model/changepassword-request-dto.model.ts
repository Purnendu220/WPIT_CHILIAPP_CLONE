export class ChangePasswordRequestDto {
  userId: number;
  password: string;
  newPassword: string;
  confirmPassword: string;
}
