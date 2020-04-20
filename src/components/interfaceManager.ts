import { RadioButtonValue, StepStatus } from '~/components/typeManager';

export interface SiCascaderOption<T> {
  readonly label: string;
  readonly value: T;
}

export interface SiMenuItemOption {
  readonly title: string;
  readonly disabled?: boolean;
  readonly icon?: string;
}

export interface SiGroupMenuOption {
  readonly title: string;
  readonly menuItems: { [index: string]: SiMenuItemOption };
}

export interface SiSubMenuOption {
  readonly title: string;
  readonly disabled?: boolean;
  readonly icon?: string;
  readonly menuItems: {
    [index: string]: SiGroupMenuOption | SiMenuItemOption;
  };
}

export interface SiRadioOption<T extends RadioButtonValue> {
  readonly label: T;
  readonly disabled?: boolean;
}

export interface SiStepOption {
  readonly title: string;
  readonly description?: string;
  readonly icon?: string;
  readonly status?: StepStatus;
}

export interface SiCarouselItemOption {
  readonly name: string;
  readonly label?: string;
}
