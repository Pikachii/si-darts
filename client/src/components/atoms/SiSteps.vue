<template>
  <el-steps v-bind="vbSteps">
    <el-step v-for="step in steps" :key="step.title" v-bind="vbStep(step)" />
  </el-steps>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { Steps, Step } from 'element-ui';

import { SiStepOption } from '~/components/interfaceManager';
import { StepStatus } from '~/components/typeManager';

@Component
export default class SiSteps extends Vue {
  @Prop({ default: 0 })
  public readonly space!: string | number;
  @Prop({ default: 'horizontal' })
  public readonly direction!: 'vertical' | 'horizontal';
  @Prop({ default: 0 })
  public readonly active!: number;
  @Prop({ default: undefined })
  public readonly processStatus!: StepStatus;
  @Prop({ default: undefined })
  public readonly finishStatus!: StepStatus;
  @Prop({ default: false })
  public readonly alignCenter!: boolean;
  @Prop({ default: false })
  public readonly simple!: boolean;
  @Prop({ default: () => [] })
  public readonly steps!: SiStepOption[];

  private get vbSteps(): Partial<Steps> {
    return {
      space: this.space,
      direction: this.direction,
      active: this.active,
      processStatus: this.processStatus,
      finishStatus: this.finishStatus,
      alignCenter: this.alignCenter,
      simple: this.simple,
    };
  }

  private vbStep(step: SiStepOption): Partial<Step> {
    return {
      title: step.title,
      description: step.description,
      icon: step.icon ? `el-icon-${step.icon}` : undefined,
      status: step.status,
    };
  }
}
</script>
