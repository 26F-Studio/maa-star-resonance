import { i18nGlobal } from 'boot/i18n';
import type { ServiceTrait, ServiceType } from 'src/types/service';
import type { AsyncClass } from 'src/types/common';

export const i18nSubPath =
  (baseName: string) => (relativePath: string, data?: Record<string, unknown>) => {
    if (data) {
      return i18nGlobal.t(`${baseName}.${relativePath}`, data);
    } else {
      return i18nGlobal.t(`${baseName}.${relativePath}`);
    }
  };

export const isValidIpPort = (input: string) => {
  const regex =
    /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?):(?:6553[0-5]|655[0-2][0-9]|65[0-4][0-9]{2}|6[0-4][0-9]{3}|[1-5][0-9]{4}|[1-9][0-9]{0,3}|0)$/;
  return regex.test(input);
};

export const useService = <T extends ServiceType>(serviceName: T) =>
  new Proxy(
    {},
    {
      get:
        (_, functionName) =>
        (...payloads: never[]) =>
          window.service.invoke(serviceName, functionName, ...payloads),
    },
  ) as AsyncClass<ServiceTrait<T>>;

export const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
