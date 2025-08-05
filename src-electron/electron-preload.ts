import { contextBridge, ipcRenderer, webFrame } from 'electron';

import type { ServiceType } from 'src/types/service';

contextBridge.exposeInMainWorld('service', {
  invoke: <T extends ServiceType>(
    serviceName: T,
    functionName: string | symbol,
    ...args: never[]
  ) => ipcRenderer.invoke('service.invoke', serviceName, functionName, ...args),
});

webFrame.setZoomFactor(1);
webFrame.setVisualZoomLevelLimits(0, 0);
