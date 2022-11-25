import { LocalStorageService } from './LocalStorageService';

export class AuthService {
  static getUsername(): string {
    return LocalStorageService.get('username') || '';
  }

  static getPassword(): string {
    return LocalStorageService.get('password') || '';
  }

  static saveCredentials(username: string, password: string): void {
    LocalStorageService.save('username', username);
    LocalStorageService.save('password', password);
  }
}
