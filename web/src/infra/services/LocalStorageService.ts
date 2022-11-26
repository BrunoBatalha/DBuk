export class LocalStorageService {
  static save(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  static get<TResponse>(key: string): TResponse | null {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    return JSON.parse(JSON.stringify(value)) as TResponse;
  }
}
