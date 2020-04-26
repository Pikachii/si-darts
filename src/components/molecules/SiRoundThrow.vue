<template>
  <el-row>
    <div class="wrapper" :style="vbStyle">Result</div>
    <div v-for="(item, index) in roundThrow" :key="index">
      <si-throw v-bind="vbThrow(item, index)" />
    </div>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiThrow } from '~/components/atomsCatalog';

@Component({ components: { SiThrow } })
export default class SiRoundThrow extends Vue {
  @Prop({ default: () => [] })
  public readonly roundThrow!: string[];

  @Prop({ default: 'skyblue' })
  public readonly color!: string;

  private get vbStyle(): { [key: string]: string } {
    return {
      backgroundColor: this.color,
    };
  }

  private vbThrow(item: string, index: number): Partial<SiThrow> {
    return {
      round: index + 1,
      result: item,
      color: this.color,
    };
  }
}
</script>
<style lang="scss" scoped>
.wrapper {
  text-align: center;
  font-size: 2em;
  height: 50px;
  line-height: 50px;
}
</style>
