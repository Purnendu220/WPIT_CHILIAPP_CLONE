import { environment } from './../../environments/environment';
import { Constants } from './constants';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  static getToken(): any {
    return localStorage.getItem(Constants.authToken);
  }
  static setToken(token: any): void {
    localStorage.setItem(Constants.authToken, token.toString());
  }
  static getDefaultLanguage(): any {
    return localStorage.getItem(Constants.defaultLanguage) != null ? localStorage.getItem(Constants.defaultLanguage) : '';
  }

  static setDefaultLanguage(language: any): void {
    if (language) {
      localStorage.setItem(Constants.defaultLanguage, language.toString());
    }
  }

  static deleteToken(): void {
    localStorage.removeItem(Constants.authToken);
  }

  static setUser(user: any): void {
    localStorage.setItem(Constants.userDataKey, JSON.stringify(user));
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(Constants.userDataKey));
  }

  static deleteUser(): void {
    localStorage.removeItem(Constants.userDataKey);

  }

  static getUserId(): number {
    const user: any = StorageService.getUser();
    if (user) {
      return user.id;
    } else {
      return 0;
    }


  }

  static setUserType(type: string): void {
    localStorage.setItem(Constants.usetType, type);
  }

  static getUserTypeString(): string {
    if (localStorage.getItem(Constants.usetType)) {
      return localStorage.getItem(Constants.usetType).toLowerCase();
    }
  }

  static setIsLoggedIn(isLogin: boolean): void {
    localStorage.setItem(Constants.isLoggedInKey, String(isLogin));
  }

  static getIsLoggedIn(): boolean {
    if (localStorage.getItem(Constants.userDataKey)) {
      return Boolean(localStorage.getItem(Constants.userDataKey));
    } else {
      return false;
    }
  }


  static setData(key, data) {
    localStorage.setItem(key, data);
  }

  static getData(key): any {
    return localStorage.getItem(key);
  }

  static clearStorage(): void {
    localStorage.removeItem(Constants.userDataKey);
    localStorage.removeItem(Constants.authToken);
    localStorage.removeItem(Constants.usetType);
    localStorage.removeItem(Constants.isLoggedInKey);

  }
  getLocalStorage(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      alert('please allow   for ' + environment.hostURL + ' ')
    }
  }

}
