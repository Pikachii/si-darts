<template>
  <el-row>
    <el-col :span="6" class="round num" :style="vbStyle"> R{{ round }} </el-col>
    <el-col :span="6" class="round detail" :style="vbStyle">
      {{ point1st }}
    </el-col>
    <el-col :span="6" class="round detail" :style="vbStyle">
      {{ point2nd }}
    </el-col>
    <el-col :span="6" class="round detail" :style="vbStyle">
      {{ point3rd }}
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiRoundThreeScore extends Vue {
  @Prop({ default: 0 })
  public readonly round!: number;

  @Prop({ default: '' })
  public readonly points!: string[];

  @Prop({ default: 'skyblue' })
  public readonly color!: string;

  private get vbStyle(): { [key: string]: string } {
    return {
      backgroundColor: this.color,
    };
  }

  private get point1st(): string {
    return this.points[0] || '';
  }

  private get point2nd(): string {
    return this.points[1] || '';
  }

  private get point3rd(): string {
    return this.points[2] || '';
  }
}
</script>
<style lang="scss" scoped>
.round {
  text-align: center;
  height: 50px;
  line-height: 50px;

  &.num {
    font-size: 1em;
  }

  &.detail {
    font-size: 2em;
  }
}
</style>
