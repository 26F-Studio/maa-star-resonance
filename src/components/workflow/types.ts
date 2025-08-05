import type { Pipeline } from 'src/types/service/maa/types';

export interface Workflow {
  name: string;
  description?: string;
  icon?: string;
  pipelines: {
    name: string;
    description?: string;
    icon?: string;
    ignoreFailure?: boolean;
    data: Pipeline;
  }[];
}
