import type { ServiceType } from 'src/types/service';

declare global {
  // noinspection JSUnusedGlobalSymbols
  interface Window {
    service: {
      invoke: <T extends ServiceType>(
        serviceName: T,
        functionName: string | symbol,
        ...args: never[]
      ) => Promise<never>;
    };
  }
}

export {};
