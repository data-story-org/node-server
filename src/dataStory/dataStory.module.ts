import { Module } from '@nestjs/common';
import { DataStoryService } from './dataStory.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports: [ScheduleModule.forRoot()],
    exports: [DataStoryService],
    providers: [DataStoryService]
})
export class DataStoryModule {}
