<template>
  <el-row>
    <el-col :span="6" class="round num" :style="vbStyle"> R{{ round }} </el-col>
    <el-col :span="18" class="round detail" :style="vbStyle">
      {{ point }}
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class SiRoundScore extends Vue {
  @Prop({ default: 0 })
  public readonly round!: number;

  @Prop({ default: '' })
  public readonly point!: string;

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
