type AsyncifyMethod<T> = T extends (...args: infer Args) => infer Return
  ? Return extends Promise<unknown>
    ? T
    : (...args: Args) => Promise<Return>
  : T;

export type AsyncClass<T> = {
  [K in keyof T]: AsyncifyMethod<T[K]>;
};

export enum Language {
  enUS = 'en-US',
  zhCN = 'zh-CN',
}
