import { Module } from '@nestjs/common';
import { CommercialToolsController } from './commercialtools.controller';
import { ClientService } from './client-service';

@Module({
  imports: [],
  providers: [ClientService],
  exports: [],
  controllers: [CommercialToolsController],
})
export class CommercialToolsModule {}
