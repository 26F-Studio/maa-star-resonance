import type { AdbDevice, Pipeline } from 'src/types/service/maa/types';

export interface MaaServiceTrait {
  listDevices(): Promise<AdbDevice[]>;

  connect(device: AdbDevice): Promise<boolean>;

  disconnect(): boolean;

  runExistPipeline(pipelineName: string): Promise<boolean>;

  runNewPipeline(pipeline: Pipeline): Promise<boolean>;
}
