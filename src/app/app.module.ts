import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataStoryModule } from 'src/dataStory/dataStory.module';

@Module({
  imports: [DataStoryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
