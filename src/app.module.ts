import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { AnimalModule } from './animal/animal.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    AuthModule,
    AnimalModule,
    ScheduleModule.forRoot()
  ],
})
export class AppModule {}
