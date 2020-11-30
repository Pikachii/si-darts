<template>
  <div>
    <si-game-description v-bind="vbGameDescription" />
    <div style="text-align: center; margin-top: 20px; height: 60px">
      <si-radio-group v-model="vmRadioGroup" v-bind="vbRadioGroup" />
    </div>
    <div style="text-align: center; margin-top: 20px">
      <si-button style="width: 100px" v-bind="vbButton" @click="clicked" />
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Model, Emit, Prop } from 'nuxt-property-decorator';

import { SiButton } from '~/components/atomsCatalog';
import { SiGameDescription, SiRadioGroup } from '~/components/moleculesCatalog';

@Component({
  components: {
    SiButton,
    SiGameDescription,
    SiRadioGroup,
  },
})
export default class PlayerSelect extends Vue {
  @Model('change') private readonly playerNum!: number;
  @Emit('change') private emChangePlayerNum(_: number) {}

  @Emit('next') private emNext() {}

  @Prop({ default: '' })
  public readonly imgSrc!: string;

  @Prop({ default: '' })
  public readonly titleLabel!: string;

  private get vmRadioGroup(): string {
    return `${this.playerNum} Player`;
  }
  private set vmRadioGroup(player: string) {
    const playerNum = Number(player.split(' ')[0]);
    this.emChangePlayerNum(playerNum);
  }

  private get vbGameDescription(): Partial<SiGameDescription> {
    return {
      imgSrc: this.imgSrc,
      titleLabel: this.titleLabel,
      description: 'プレイヤー人数を選択してください。',
    };
  }

  private get vbRadioGroup(): Partial<SiRadioGroup<string>> {
    return {
      radioOptions: [
        { label: '1 Player' },
        { label: '2 Player' },
        { label: '3 Player' },
        { label: '4 Player' },
      ],
    };
  }

  private get vbButton(): Partial<SiButton> {
    return {
      type: 'primary',
      icon: 'right',
      disabled: this.playerNum === 0,
    };
  }

  private clicked() {
    this.emNext();
  }
}
</script>
<style lang="scss" scoped>
.inline {
  display: inline-block;
  vertical-align: top;
}
</style>
