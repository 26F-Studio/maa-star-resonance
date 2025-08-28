import type { Workflow } from 'components/workflow/types';
import { AUTO_CASTING_AND_LANDING } from 'components/workflow/auto-fishing/auto-casting-and-landing';
import { CHECK_ACCESSORIES } from 'components/workflow/auto-fishing/check-accessories';
import { START_FISHING } from 'components/workflow/auto-fishing/start-fishing';

export const AUTO_FISHING: Workflow = {
  name: 'autoFishing',
  icon: 'set_meal',
  pipelines: [
    {
      name: 'startFishing',
      icon: 'start',
      data: START_FISHING,
      ignoreFailure: true,
    },
    {
      name: 'checkAccessories',
      icon: 'checklist',
      data: CHECK_ACCESSORIES,
      ignoreFailure: true,
    },
    {
      name: 'autoCastingAndLanding',
      icon: 'phishing',
      data: AUTO_CASTING_AND_LANDING,
      ignoreFailure: true,
    },
  ],
};
