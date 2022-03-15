import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from "@nestjs/swagger"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  
  @ApiResponse({status: 200, description: 'App is working now.'})
  @Get()
  index(): string {
    return this.appService.index();
  }
}
