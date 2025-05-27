import { Type } from "./facade/type";
import { InjectionToken } from "./injection_token";
import { Injector } from "./injector";


/**
 * Current injector value used by `inject`.
 * - `undefined`: it is an error to call `inject`
 * - Injector instance: Use the injector for resolution.
 */
let _currentInjector: Injector | undefined = undefined;

export function getCurrentInjector(): Injector | undefined {
  return _currentInjector;
}


export function setCurrentInjector(
  injector: Injector | undefined,
): Injector | undefined {
  const former = getCurrentInjector();
  _currentInjector = injector;
  return former;
}


export function inject<T>(token: Type<T> | InjectionToken<T>): T {
  const currentInjector = getCurrentInjector();
  if (currentInjector === undefined) {
    throw new Error(
      `inject() must be called from an injection context such as a constructor, a factory function, or a field initializer`,
    );
  } else {
    const value = currentInjector.get(token);
    return value;
  }
}
