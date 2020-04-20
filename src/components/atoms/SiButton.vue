<template>
  <el-button v-bind="vbButton" @click="buttonClicked">
    {{ buttonText }}
  </el-button>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator';
import { Button } from 'element-ui';

import { soundButton } from '~/assets/soundCatalog';

@Component
export default class GameMenu extends Vue {
  @Emit('click') private emClick() {}

  @Prop({ default: '' })
  public readonly buttonText!: string;
  @Prop({ default: undefined })
  public readonly type!:
    | 'primary'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'text'
    | undefined;
  @Prop({ default: 'default' })
  public readonly shape!: 'default' | 'plain' | 'round';
  @Prop({ default: undefined })
  public readonly size!: 'medium' | 'small' | 'mini' | undefined;
  @Prop({ default: false })
  public readonly disabled!: boolean;
  @Prop({ default: '' })
  public readonly icon!: string;
  @Prop({ default: false })
  public readonly loading!: boolean;
  @Prop({ default: soundButton })
  public readonly soundUrl!: string;

  private get vbButton(): Partial<Button> {
    return {
      plain: this.shape === 'plain',
      round: this.shape === 'round',
      disabled: this.disabled,
      icon: this.icon ? `el-icon-${this.icon}` : undefined,
      loading: this.loading,
      size: this.size,
      type: this.type,
    };
  }

  private buttonClicked() {
    const audio = new Audio(this.soundUrl);
    audio.play();
    this.emClick();
  }
}
</script>
