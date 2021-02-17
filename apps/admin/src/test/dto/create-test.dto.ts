import { IsString, IsInt, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTestDto {
  @IsNotEmpty({ message: '请填写姓名' })
  @IsString({ message: '姓名必须为字符串' })
  name: string;

  // @Transform(value => Number(value))
  @Type(() => Number)
  @IsInt()
  @IsNotEmpty({ message: '请填写电话' })
  @IsOptional()
  // @IsDefined()
  phone: number;
}
