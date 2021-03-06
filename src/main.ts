import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger"

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Trello API')
  .setDescription('Swagger for the Trello API')
  .setVersion('1.0')
  .build();
  const doc = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('showapi', app, doc);

  await app.listen(3000);
}
bootstrap();
