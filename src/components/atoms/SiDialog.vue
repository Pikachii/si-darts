<template>
  <el-dialog :visible.sync="vmDialog" v-bind="vbDialog">
    <template #title>
      <slot name="title" />
    </template>
    <template #content>
      <slot />
    </template>
    <template #footer>
      <slot name="footer" />
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { Component, Vue, Model, Emit, Prop } from 'nuxt-property-decorator';
import { Dialog } from 'element-ui';

@Component
export default class SiDialog extends Vue {
  @Model('change') private readonly visible!: boolean;
  @Emit('change') private emChangeVisible(_: boolean) {}

  @Prop({ default: '' })
  public readonly title!: string;
  @Prop({ default: '' })
  public readonly width!: string;
  @Prop({ default: false })
  public readonly fullscreen!: boolean;
  @Prop({ default: '' })
  public readonly top!: string;
  @Prop({ default: true })
  public readonly modal!: boolean;
  @Prop({ default: true })
  public readonly modalAppendToBody!: boolean;
  @Prop({ default: true })
  public readonly lockScroll!: boolean;
  @Prop({ default: '' })
  public readonly customClass!: string;
  @Prop({ default: true })
  public readonly closeOnClickModal!: boolean;
  @Prop({ default: true })
  public readonly closeOnPressEscape!: boolean;
  @Prop({ default: true })
  public readonly showClose!: boolean;
  @Prop() public readonly beforeClose!: (handle) => void;
  @Prop({ default: false })
  public readonly center!: boolean;
  @Prop({ default: false })
  public readonly destroyOnClose!: boolean;

  private get vmDialog(): boolean {
    return this.visible;
  }

  private get vbDialog(): Partial<Dialog> {
    return {
      title: this.title,
      width: this.width,
      fullscreen: this.fullscreen,
      top: this.top,
      modal: this.modal,
      modalAppendToBody: this.modalAppendToBody,
      lockScroll: this.lockScroll,
      customClass: this.customClass,
      closeOnClickModal: this.closeOnClickModal,
      closeOnPressEscape: this.closeOnPressEscape,
      showClose: this.showClose,
      beforeClose: this.beforeClose,
      center: this.center,
      destroyOnClose: this.destroyOnClose,
    };
  }
}
</script>
