import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Brain Agriculture Example')
    .setDescription('Brain Agriculture API contract')
    .setVersion('1.0')
    .build();

  const documentFactory = () => {
    return SwaggerModule.createDocument(app, config);
  };

  SwaggerModule.setup('api', app, documentFactory);
}
