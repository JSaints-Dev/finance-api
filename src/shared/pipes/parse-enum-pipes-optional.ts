import { ArgumentMetadata, ParseEnumPipe } from '@nestjs/common';

export class ParseEnumPipeOptional<T = any> extends ParseEnumPipe<T> {
  override transform(value: T, metadata: ArgumentMetadata) {
    if (typeof value === 'undefined') {
      return value;
    }

    return super.transform(value, metadata);
  }
}
