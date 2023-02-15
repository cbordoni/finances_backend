import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsController } from './accounts/accounts.controller';
import { AccountsModule } from './accounts/accounts.module';
import { AccountsService } from './accounts/accounts.service';
import { Account } from './accounts/entities/account.entity';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Income } from './incomes/entities/income.entity';
import { IncomesModule } from './incomes/incomes.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT as unknown as number,
      database: process.env.MYSQL_NAME,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_USER_PASS,
      entities: [Account, Income],
      synchronize: process.env.NODE_ENV === 'development',
    }),
    TypeOrmModule.forFeature([Account, Income]),
    AccountsModule,
    IncomesModule,
  ],
  controllers: [AppController, AccountsController],
  providers: [AppService, AccountsService],
})
export class AppModule {}
