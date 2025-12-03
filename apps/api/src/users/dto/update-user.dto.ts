export class UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: 'ADMIN' | 'RECEPTION';
  active?: boolean;
}
