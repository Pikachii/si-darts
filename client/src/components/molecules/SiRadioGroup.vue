<template>
  <el-radio-group v-model="vmRadioGroup" v-bind="vbRadioGroup">
    <si-radio-button
      v-for="option in radioOptions"
      :key="option.label"
      v-bind="vbRadioButton(option)"
    />
  </el-radio-group>
</template>
<script lang="ts">
import { Component, Vue, Model, Emit, Prop } from 'nuxt-property-decorator';
import { RadioGroup } from 'element-ui';

import { SiRadioOption } from '~/components/interfaceManager';
import { RadioButtonValue } from '~/components/typeManager';
import { SiRadioButton } from '~/components/atomsCatalog';

@Component({ components: { SiRadioButton } })
export default class SiRadioGroup<T extends RadioButtonValue> extends Vue {
  @Model('change') private readonly value!: T;
  @Emit('change') private emChange(_: T) {}

  @Prop({ default: () => [] })
  public readonly radioOptions!: SiRadioOption<T>[];
  @Prop({ default: undefined })
  public readonly size!: 'large' | 'small' | undefined;
  @Prop({ default: false })
  public readonly disabled!: boolean;
  @Prop({ default: undefined })
  public readonly fill!: string | undefined;
  @Prop({ default: undefined })
  public readonly textColor!: string | undefined;

  private get vmRadioGroup(): T {
    return this.value;
  }
  private set vmRadioGroup(value: T) {
    this.emChange(value);
  }

  private get vbRadioGroup(): Partial<RadioGroup> {
    return {
      size: this.size,
      fill: this.fill,
      disabled: this.disabled,
      textColor: this.textColor,
    };
  }

  private vbRadioButton(option: SiRadioOption<T>): Partial<SiRadioButton<T>> {
    return {
      label: option.label,
      disabled: this.disabled || option.disabled,
    };
  }
}
</script>
