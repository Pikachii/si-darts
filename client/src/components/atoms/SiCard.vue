<template>
  <el-card v-bind="vbCard">
    <template #header>
      <slot name="header"></slot>
    </template>
    <slot></slot>
  </el-card>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { Card } from 'element-ui';

@Component
export default class SiCard extends Vue {
  @Prop({ default: '' })
  public readonly header!: string;
  @Prop({ default: undefined })
  public readonly bodyStyle!: { [style: string]: string } | undefined;
  @Prop({ default: undefined })
  public readonly shadow!: 'always' | 'hover' | 'never' | undefined;

  private get vbCard(): Partial<Card> {
    return {
      header: this.header,
      bodyStyle: this.bodyStyle,
      shadow: this.shadow,
    };
  }
}
</script>
