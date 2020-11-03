export default class ServiceLocator {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private static instances: {[key: string]: any} = {};

  public static set<T>(serviceId: string, instance: T) {
    if (!this.instances[serviceId]) {
      this.instances[serviceId] = instance;
    }
  }

  public static get<T>(serviceId: string): T {
    const instance = this.instances[serviceId];
    // ... error handling ...
    return instance;
  }
}
