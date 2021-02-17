import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty({ message: '请填写用户名' })
  @IsString({ message: '姓名必须为字符串' })
  username: string;

  @IsNotEmpty({ message: '请填写密码' })
  password: string;

  @IsNotEmpty({ message: '请填写邮箱' })
  email: string;
}
