<template>
  <div :class="vbClass" :style="vbStyle">
    <si-cricket-mark
      v-for="(mark, index) in playerMarks"
      :key="index"
      v-bind="vbCricketMark(mark)"
    />
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiCricketMark } from '~/components/atomsCatalog';

@Component({ components: { SiCricketMark } })
export default class SiPlayerCricketMarks extends Vue {
  @Prop({ default: () => [] })
  public readonly playerMarks!: number[];

  @Prop({ default: '#000000' })
  public readonly color!: string;

  private get vbClass(): string[] {
    const classes = ['wrapper'];
    if (!this.playerMarks.length) classes.push('transparent');
    return classes;
  }

  private get vbStyle(): { [key: string]: string } {
    return {
      borderColor: this.color,
      color: this.color,
    };
  }

  private vbCricketMark(mark: number): Partial<SiCricketMark> {
    return {
      mark,
    };
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  height: 100%;
  width: 14%;
  max-width: 100px;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 3px solid;
  border-radius: 10px;

  &.transparent {
    background-color: transparent;
    border: none;
  }
}
</style>
