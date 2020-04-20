<template>
  <el-radio-button v-model="vmRadioButton" v-bind="vbRadioButton" />
</template>
<script lang="ts">
import { Component, Vue, Model, Emit, Prop } from 'nuxt-property-decorator';
import { RadioButton } from 'element-ui';

import { RadioButtonValue } from '~/components/typeManager';

@Component
export default class SiRadioButton<T extends RadioButtonValue> extends Vue {
  @Model('change') private readonly value!: T;
  @Emit('change') private emChange(_: T) {}

  @Prop({ default: '' })
  public readonly label!: T;
  @Prop({ default: false })
  public readonly disabled!: boolean;
  @Prop({ default: false })
  public readonly border!: boolean;

  private get vmRadioButton(): T {
    return this.value;
  }
  private set vmRadioButton(value: T) {
    this.emChange(value);
  }

  private get vbRadioButton(): Partial<RadioButton> {
    return {
      label: this.label,
      disabled: this.disabled,
    };
  }
}
</script>
