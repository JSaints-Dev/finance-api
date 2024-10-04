import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class ParseUUIDPipeOptional extends ParseUUIDPipe {
  override transform(value: string, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      return value;
    }

    return super.transform(value, metadata);
  }
}
