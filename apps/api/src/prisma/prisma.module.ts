import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [],
  imports: [],
  providers: [PrismaService],
  exports: [],
})
export class PrismaModule {}
