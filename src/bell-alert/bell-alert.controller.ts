import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { BellAlertService } from './bell-alert.service';
import { CreateBellAlertDto } from './dto/create-bell-alert.dto';
import { UpdateBellAlertDto } from './dto/update-bell-alert.dto';

@Controller('bell-alert')
export class BellAlertController {
  constructor(private readonly bellAlertService: BellAlertService) {}

  @MessagePattern('bell-alert-add')
  async create(createBellAlertDto: CreateBellAlertDto) {
    return await this.bellAlertService.create(createBellAlertDto);
  }

  @MessagePattern('bell-alert-email-sent')
  senntEmail(data:{jobTitleId:number,jobId:number}) {
    console.log("testOk")
    this.bellAlertService.senntEmail(data);
  }

  @MessagePattern('bell-alert-get')
  findAll() {
    return this.bellAlertService.findAll();
  }

  @MessagePattern('bell-alert-getOne')
  findOne(id: number) {
    return this.bellAlertService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBellAlertDto: UpdateBellAlertDto) {
  //   return this.bellAlertService.update(+id, updateBellAlertDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bellAlertService.remove(+id);
  // }
}
