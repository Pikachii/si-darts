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

export interface SiCricketNumberStatus {
  readonly number: string;
  isClose: boolean;
}

export interface RoundInfo {
  round: number;
  point: string;
}

export interface RoundMultiInfo {
  round: number;
  points: string[];
}

export interface CricketRoundInfo {
  cricketNumber: string;
  point: string;
}

export interface KeyDownCallbacks {
  readonly showDialog: () => void;
  readonly hideDialog: () => void;
  readonly onChangeRound: (nextRound: number, nextPlayer: number) => void;
  readonly onSingleBull: (key: string) => DartResultProperty;
  readonly onDoubleBull: (key: string) => DartResultProperty;
  readonly onTriple: (key: string, point: number) => DartResultProperty;
  readonly onDouble: (key: string, point: number) => DartResultProperty;
  readonly onOuterSingle: (key: string, point: number) => DartResultProperty;
  readonly onInnerSingle: (key: string, point: number) => DartResultProperty;
}

export interface DartResultProperty {
  readonly sound: any;
  readonly soundTimes?: number;
  readonly soundSpanMs?: number;
  readonly result: string;
  readonly isNextTurn?: boolean;
  readonly isEnd?: boolean;
}

export interface AreaInfo {
  readonly number: number;
  readonly startRadian: number;
  doubleColor: string;
  outerColor: string;
  tripleColor: string;
  innerColor: string;
}

export interface AreaColorInfo {
  number: number;
  doubleColor?: string;
  outerColor?: string;
  tripleColor?: string;
  innerColor?: string;
}
