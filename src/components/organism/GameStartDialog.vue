<template>
  <si-dialog v-model="vmDialog" v-bind="vbDialog"> </si-dialog>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

import { SiDialog } from '~/components/atomsCatalog';

@Component({ components: { SiDialog } })
export default class GameStartDialog extends Vue {
  @Prop({ default: '' })
  public readonly gameTitle!: string;

  private visible: boolean = false;

  private get vmDialog(): boolean {
    return this.visible;
  }
  private set vmDialog(visible: boolean) {
    this.visible = visible;
  }

  private get vbDialog(): Partial<SiDialog> {
    return {
      title: `${this.gameTitle} Game Start!!!`,
      center: true,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      top: '30vh',
      showClose: false,
      destroyOnClose: true,
    };
  }

  public show() {
    this.visible = true;
  }

  public hide() {
    this.visible = false;
  }
}
</script>
