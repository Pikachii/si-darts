<template>
  <el-row>
    <el-col :span="4" class="throw num" :style="vbStyle"> {{ round }} </el-col>
    <el-col :span="20" class="throw detail" :style="vbStyle">
      {{ result }}
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiThrow extends Vue {
  @Prop({ default: 0 })
  public readonly round!: number;

  @Prop({ default: '' })
  public readonly result!: string;

  @Prop({ default: 'skyblue' })
  public readonly color!: string;

  private get vbStyle(): { [key: string]: string } {
    return {
      backgroundColor: this.color,
    };
  }
}
</script>
<style lang="scss" scoped>
.throw {
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
