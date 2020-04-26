<template>
  <div :class="vbClass">
    {{ number }}
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiCricketNumber extends Vue {
  @Prop({ default: '0' })
  public readonly number!: string;

  @Prop({ default: false })
  public readonly isClose!: boolean;

  private get vbClass(): string[] {
    const classes = ['number'];
    if (this.isClose) classes.push('close');
    return classes;
  }
}
</script>
<style lang="scss" scoped>
.number {
  font-size: 2.4em;
  text-align: center;
  height: 14%;
  display: flex;
  justify-content: center;
  align-items: center;
  &.close {
    text-decoration: line-through;
  }
}
</style>
