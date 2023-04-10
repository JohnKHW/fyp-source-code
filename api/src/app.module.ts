import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MusicModule } from './modules/music/music.module';
import { UserModule } from './modules/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppConfig } from './app.config';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './modules/auth/auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot(AppConfig.getInitConfig()),
    TypeOrmModule.forRootAsync(AppConfig.getTypeOrmConfig()),
    AuthModule,
    MusicModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
