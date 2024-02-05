import { Controller,Post,Get,Body,UseGuards,Patch,Param } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guards';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dto/user.dto';
import { ApproveReportDto } from './dto/approvedReport.dto';
import { AdminGuard } from 'src/guards/admin.guard';
@Controller('reports')
export class ReportsController {

  constructor(private reportesService:ReportsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user:User) {
    return this.reportesService.create(body,user)
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  approvedReport(@Param('id') id:string, @Body() body:ApproveReportDto){
    return this.reportesService.changeApprovel(id,body.approved)
  }
}
