import { BadGatewayException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { MailService } from 'src/common/sendmail';
import { Connection, getRepository } from 'typeorm';
import { BellAlertDto, CreateBellAlertDto } from './dto/create-bell-alert.dto';
import { UpdateBellAlertDto } from './dto/update-bell-alert.dto';
import { BellAlert } from './entities/bell-alert.entity';

@Injectable()
export class BellAlertService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    private readonly mail: MailService,
  ) { }
  async create(createBellAlertDto: CreateBellAlertDto): Promise<any> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const check = await this.findByJobTitleId(createBellAlertDto.jobTitle,createBellAlertDto.email);
      if(check){
        return 'you already selected'
      }
      const bellRepo = await queryRunner.manager.getRepository(BellAlert)
      const bellData = await bellRepo.save({ ...createBellAlertDto })
      await queryRunner.commitTransaction();
      return bellData;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(error);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    try {
      const bellRepo = await getRepository(BellAlert)
      const bellalerts = await bellRepo.find({})
      return bellalerts;
    } catch (error) {
      throw new InternalServerErrorException(error);

    }
  }

  async findOne(id: number) {
    try {
      const bellRepo = await getRepository(BellAlert)
      const bellalerts = await bellRepo.findOne({ id })
      return bellalerts;
    } catch (error) {
      throw new InternalServerErrorException(error);

    }
  }

  async findByJobTitleId(jobTitle: string,email:string) {
    try {
      const bellRepo = await getRepository(BellAlert)
      const bellalert = await bellRepo.createQueryBuilder('ba')
      .where('ba.jobTitle ILIKE :title',{title:jobTitle})
      .andWhere('ba.email ILIKE :email',{email})
      .getOne()
      return bellalert;
    } catch (error) {
      throw new InternalServerErrorException(error);

    }
  }

  update(id: number, updateBellAlertDto: UpdateBellAlertDto) {
    return `This action updates a #${id} bellAlert`;
  }

  remove(id: number) {
    return `This action removes a #${id} bellAlert`;
  }

  async senntEmail(data: { jobTitleId: number, jobId: number }) {
    try {
      const bellRepo = await getRepository(BellAlert)
      const bellalerts = await bellRepo.find({ jobTitleId: data.jobTitleId })
      bellalerts.forEach(element => {
        const obj: BellAlertDto = {
          jobId: data.jobId,
          userId: element.userId,
          jobTitleId: element.jobTitleId,
          jobTitle: element.jobTitle,
          companyName: element.companyName,
          detail: element.detail,
          email: element.email,
          originLink: element.originLink
        }
        this.mail.BellAlertEmail(obj)
      });
      console.log(bellalerts)
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
