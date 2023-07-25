import { Injectable } from '@angular/core';
import { AuthenticationTokenData } from '../models';
import { StorageService } from './storage.service';
import { StorageKey } from '../enums';

@Injectable({ providedIn: 'root' })
export class AuthenticationStorageService {

  constructor(protected storageService: StorageService) {}

  /**
   * Save info about Authentication token
   * @param data New authentication token data to set in session storage
   */
  public setAuthenticationTokenData(data: AuthenticationTokenData): void {
    this.storageService.setSessionStorage(
      StorageKey.AuthenticationTokenData,
      data
    );
  }

  /**
   * Get authentication data from storage. Enforce Date properties as dates are retrieved as strings from storage
   */
  public getAuthenticationTokenData(): AuthenticationTokenData {
    const data: AuthenticationTokenData = this.storageService.getSessionStorage(
      StorageKey.AuthenticationTokenData
    );
    return data;
  }

  /**
   * Clean Authentication token data from session storage
   */
  public removeAuthenticationTokenData(): void {
    this.storageService.removeSessionStorage(
      StorageKey.AuthenticationTokenData
    );
  }
}
