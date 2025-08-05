<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref, toRaw } from 'vue';

import { BUILTIN_WORKFLOWS } from 'components/workflow';
import type { Workflow } from 'components/workflow/types';

import { ServiceType } from 'src/types/service';
import { i18nSubPath, useService } from 'src/utils/common';

const i18n = i18nSubPath('components.WorkflowCard');
const { notify } = useQuasar();
const maaService = useService(ServiceType.maa);

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
  }>(),
  {
    disabled: false,
  },
);

const isError = ref(false);
const isInterrupted = ref(false);
const isRunning = ref(false);
const roundsFinished = ref(0);
const roundsTotal = ref(1);
const selectedWorkflow = ref<Workflow>();
const splitterRatio = ref(25);
const stepIndex = ref(-1);

const runWorkflow = async () => {
  if (props.disabled || !selectedWorkflow.value) {
    return;
  }

  isInterrupted.value = false;
  isRunning.value = true;
  for (
    roundsFinished.value = 0;
    roundsFinished.value < roundsTotal.value || roundsTotal.value <= 0;
    roundsFinished.value++
  ) {
    const workflowName = i18n(`workflows.${selectedWorkflow.value.name}.name`);
    isError.value = false;
    stepIndex.value = -1;

    for (const pipeline of selectedWorkflow.value.pipelines) {
      stepIndex.value++;
      if (isInterrupted.value) {
        stepIndex.value += 0.5;
        isRunning.value = false;
        notify({
          type: 'info',
          message: i18n('notifications.workflowInterrupted', { name: workflowName }),
        });
        return;
      }
      try {
        isError.value = !(await maaService.runNewPipeline(toRaw(pipeline.data)));
      } catch (error) {
        isError.value = true;
        notify({
          type: 'negative',
          message: i18n('notifications.pipelineError', {
            name: i18n(`pipelines.${pipeline.name}.name`),
          }),
          caption: (error as Error).message,
        });
      }
      if (pipeline.ignoreFailure) {
        isError.value = false;
      }
      if (isError.value) {
        stepIndex.value += 0.5;
        break;
      }
    }
    notify({
      type: isError.value ? 'negative' : 'positive',
      message: i18n(`notifications.workflow${isError.value ? 'Failure' : 'Success'}`, {
        name: workflowName,
      }),
    });
    stepIndex.value++;
    if (isError.value) {
      break;
    }
  }
  roundsFinished.value++;
  isRunning.value = false;
};

const selectWorkflow = (pipeline: Workflow) => {
  if (isRunning.value || selectedWorkflow.value?.name === pipeline.name) {
    return;
  }
  isError.value = false;
  selectedWorkflow.value = pipeline;
  splitterRatio.value = 25;
  stepIndex.value = -1;
};
</script>

<template>
  <q-card bordered flat class="column">
    <q-splitter class="col-grow" v-model="splitterRatio">
      <template v-slot:before>
        <div class="column full-height">
          <q-card-section>
            <div class="text-weight-medium text-center">
              {{ i18n('labels.title') }}
            </div>
          </q-card-section>
          <q-separator />
          <q-scroll-area class="col-grow">
            <q-list separator>
              <q-item
                v-for="workflow in BUILTIN_WORKFLOWS"
                :key="workflow.name"
                :active="selectedWorkflow?.name === workflow.name"
                :clickable="!isRunning"
                :disable="isRunning"
                @click="selectWorkflow(workflow)"
              >
                <q-item-section avatar class="q-pr-none q-mr-none">
                  <q-avatar :icon="workflow.icon ?? 'auto_awesome_motion'" />
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ i18n(`workflows.${workflow.name}.name`) }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-scroll-area>
        </div>
      </template>
      <template v-slot:after>
        <div class="column full-height">
          <q-card-section class="col-grow column">
            <div v-if="!selectedWorkflow" class="text-center text-h4 text-grey text-italic">
              {{ i18n('labels.noWorkflow') }}
            </div>
            <q-stepper
              v-else
              active-icon="play_arrow"
              animated
              bordered
              error-icon="warning"
              flat
              vertical
              v-model="stepIndex"
            >
              <q-step
                v-for="(pipeline, index) in selectedWorkflow.pipelines"
                :key="index"
                :done="stepIndex > index"
                :error="(isError || isInterrupted) && Math.floor(stepIndex) === index"
                :error-color="isError ? 'negative' : 'warning'"
                :error-icon="isError ? 'error' : 'block'"
                :icon="pipeline.icon ?? 'schema'"
                :name="index"
                :title="i18n(`pipelines.${pipeline.name}.name`)"
              >
                <div>
                  {{ pipeline.description ?? i18n(`pipelines.${pipeline.name}.description`) }}
                </div>
              </q-step>
            </q-stepper>
          </q-card-section>
          <q-separator />
          <q-card-actions class="q-gutter-x-md text-right">
            <q-input
              class="self-center"
              dense
              :disable="disabled || !selectedWorkflow"
              :label="i18n('labels.runRounds')"
              min="0"
              name="run_rounds_input"
              outlined
              type="number"
              v-model.number="roundsTotal"
            />
            <q-checkbox
              class="self-center"
              dense
              :disable="disabled || !selectedWorkflow"
              :label="i18n('labels.runIndefinitely')"
              name="run_indefinitely_checkbox"
              :model-value="roundsTotal === 0"
              @update:model-value="roundsTotal ? (roundsTotal = 0) : (roundsTotal = 1)"
            />
            <q-space />
            <div
              class="text-weight-medium"
              :class="{
                'text-grey': disabled || !selectedWorkflow,
              }"
            >
              {{ i18n('labels.roundsFinished', { value: roundsFinished }) }}
            </div>
            <q-btn
              v-if="!isRunning"
              color="primary"
              :disable="disabled || !selectedWorkflow"
              :label="i18n('labels.runWorkflow')"
              no-caps
              @click="runWorkflow"
            />
            <q-btn
              v-else
              color="negative"
              :label="i18n('labels.stopWorkflow')"
              :loading="isInterrupted"
              no-caps
              @click="isInterrupted = true"
            />
          </q-card-actions>
        </div>
      </template>
    </q-splitter>
  </q-card>
</template>

<style scoped></style>
