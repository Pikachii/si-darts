<template>
  <el-menu-item v-bind="vbMenuItem" @click="itemClicked">
    <i v-if="icon" :class="`el-icon-${icon}`" />
    {{ title }}
  </el-menu-item>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator';
import { MenuItem } from 'element-ui';

@Component
export default class SiMenuItem extends Vue {
  @Emit('click') emClick(_index: string) {}

  /** メニューアイテムのインデックス */
  @Prop({ required: true })
  public readonly index!: string;
  /** メニュー表示名称 */
  @Prop({ default: '' })
  public readonly title!: string;
  /** 非活性の場合はTrue */
  @Prop({ default: false })
  public readonly disabled!: boolean;
  /** icon名（el-icon-xxxのxxxを指定すること） */
  @Prop({ default: '' })
  public readonly icon!: string;

  private get vbMenuItem(): Partial<MenuItem> | { disabled: boolean } {
    return {
      index: this.index,
      disabled: this.disabled,
    };
  }

  private itemClicked(sender: MenuItem) {
    this.emClick(sender.index);
  }
}
</script>
