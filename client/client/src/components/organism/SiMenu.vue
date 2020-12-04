<template>
  <el-menu v-bind="vbMenu" @open="handleOpen" @close="handleClose">
    <template v-for="key in childrenKeys">
      <si-sub-menu
        v-if="isSubMenu(children[key])"
        :key="key"
        v-bind="vbSubMenu(key, children[key])"
        @click="itemClicked"
      />
      <si-menu-item
        v-else
        :key="key"
        v-bind="vbMenuItem(key, children[key])"
        @click="itemClicked"
      />
    </template>
  </el-menu>
</template>
<script lang="ts">
import { Component, Vue, Emit, Prop } from 'nuxt-property-decorator';
import { Menu } from 'element-ui';

import { SiMenuItem } from '~/components/atomsCatalog';
import { SiSubMenu } from '~/components/moleculesCatalog';
import {
  SiMenuItemOption,
  SiSubMenuOption,
} from '~/components/interfaceManager';

@Component({
  components: {
    SiMenuItem,
    SiSubMenu,
  },
})
export default class SiMenu extends Vue {
  @Emit('open') private emOpen(_e: any) {}
  @Emit('close') private emClose(_e: any) {}
  @Emit('click') private emClick(_index: string) {}

  @Prop({ default: '' })
  public readonly defaultActive!: string;
  @Prop({ default: () => [] })
  public readonly defaultOpeneds!: string[];
  @Prop({ default: undefined })
  public readonly mode!: 'horizontal' | 'vertical' | undefined;
  @Prop({ default: false })
  public readonly collapse!: boolean;
  @Prop({ default: undefined })
  public readonly backgroundColor!: string;
  @Prop({ default: undefined })
  public readonly textColor!: string;
  @Prop({ default: undefined })
  public readonly activeTextColor!: string;
  @Prop({ default: false })
  public readonly uniqueOpened!: boolean;
  @Prop({ default: undefined })
  public readonly menuTrigger!: 'hover' | 'click' | undefined;

  @Prop({ default: () => ({}) })
  public readonly children!: {
    [index: string]: SiMenuItemOption | SiSubMenuOption;
  };

  private get vbMenu(): Partial<Menu> {
    return {
      defaultActive: this.defaultActive,
      defaultOpeneds: this.defaultOpeneds,
      mode: this.mode,
      collapse: this.mode === 'vertical' ? this.collapse : undefined,
      backgroundColor: this.backgroundColor,
      textColor: this.textColor,
      activeTextColor: this.activeTextColor,
      uniqueOpened: this.uniqueOpened,
      menuTrigger: this.mode === 'horizontal' ? this.menuTrigger : undefined,
    };
  }

  private get childrenKeys(): string[] {
    return Object.keys(this.children);
  }

  private handleOpen(index: string) {
    this.emOpen(index);
  }

  private handleClose(index: string) {
    this.emClose(index);
  }

  private isSubMenu(item: any): item is SiSubMenuOption {
    return typeof item.menuItems === 'object';
  }

  private vbSubMenu(index: string, item: SiSubMenuOption): Partial<SiSubMenu> {
    return {
      index,
      title: item.title,
      icon: item.icon,
      disabled: item.disabled,
      children: item.menuItems,
    };
  }

  private vbMenuItem(
    index: string,
    item: SiMenuItemOption
  ): Partial<SiMenuItem> {
    return {
      index,
      title: item.title,
      disabled: item.disabled,
      icon: item.icon,
    };
  }

  private itemClicked(index: string) {
    this.emClick(index);
  }
}
</script>
