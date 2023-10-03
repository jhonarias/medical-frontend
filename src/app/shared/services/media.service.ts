import { Injectable } from '@angular/core';
import { MediaType } from '../enums';

@Injectable({ providedIn: 'root' })
export class MediaService {
  constructor() {}

  public getMediaTypeFromBase64(base64: string): MediaType {
    if (base64.startsWith('data:image')) {
      return MediaType.IMAGE;
    } else if (base64.startsWith('data:video')) {
      return MediaType.VIDEO;
    } else {
      return MediaType.UNKNOWN;
    }
  }
}
