import { PartialType } from '@nestjs/mapped-types';
import { CreateBellAlertDto } from './create-bell-alert.dto';

export class UpdateBellAlertDto extends PartialType(CreateBellAlertDto) {}
