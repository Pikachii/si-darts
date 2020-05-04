import {
  SiMenuItemOption,
  SiSubMenuOption,
} from '~/components/interfaceManager';

export const BULL_INDEX = 21;

export const keyBind: { [key: string]: string } = {
  1: 'Double 20',
  q: 'Single 20 Outer',
  a: 'Triple 20',
  z: 'Single 20 Inner',
  2: 'Double 19',
  w: 'Single 19 Outer',
  s: 'Triple 19',
  x: 'Single 19 Inner',
  3: 'Double 18',
  e: 'Single 18 Outer',
  d: 'Triple 18',
  c: 'Single 18 Inner',
  4: 'Double 17',
  r: 'Single 17 Outer',
  f: 'Triple 17',
  v: 'Single 17 Inner',
  5: 'Double 16',
  t: 'Single 16 Outer',
  g: 'Triple 16',
  b: 'Single 16 Inner',
  6: 'Double 15',
  y: 'Single 15 Outer',
  h: 'Triple 15',
  n: 'Single 15 Inner',
  7: 'Double 14',
  u: 'Single 14 Outer',
  j: 'Triple 14',
  m: 'Single 14 Inner',
  8: 'Double 13',
  i: 'Single 13 Outer',
  k: 'Triple 13',
  ',': 'Single 13 Inner',
  9: 'Double 12',
  o: 'Single 12 Outer',
  l: 'Triple 12',
  '.': 'Single 12 Inner',
  0: 'Double 11',
  p: 'Single 11 Outer',
  ';': 'Triple 11',
  '/': 'Single 11 Inner',
  '!': 'Double 10',
  Q: 'Single 10 Outer',
  A: 'Triple 10',
  Z: 'Single 10 Inner',
  '"': 'Double 9',
  W: 'Single 9 Outer',
  S: 'Triple 9',
  X: 'Single 9 Inner',
  '#': 'Double 8',
  E: 'Single 8 Outer',
  D: 'Triple 8',
  C: 'Single 8 Inner',
  $: 'Double 7',
  R: 'Single 7 Outer',
  F: 'Triple 7',
  V: 'Single 7 Inner',
  '%': 'Double 6',
  T: 'Single 6 Outer',
  G: 'Triple 6',
  B: 'Single 6 Inner',
  '&': 'Double 5',
  Y: 'Single 5 Outer',
  H: 'Triple 5',
  N: 'Single 5 Inner',
  "'": 'Double 4',
  U: 'Single 4 Outer',
  J: 'Triple 4',
  M: 'Single 4 Inner',
  '(': 'Double 3',
  I: 'Single 3 Outer',
  K: 'Triple 3',
  '<': 'Single 3 Inner',
  ')': 'Double 2',
  O: 'Single 2 Outer',
  L: 'Triple 2',
  '>': 'Single 2 Inner',
  '-': 'Double 1',
  P: 'Single 1 Outer',
  '+': 'Triple 1',
  '?': 'Single 1 Inner',
  '=': 'Single Bull',
  '@': 'Double Bull',
  Enter: 'Enter',
  Tab: 'Tab',
};

export const menu: {
  [index: string]: SiMenuItemOption | SiSubMenuOption;
} = {
  Training: {
    title: 'Training',
    menuItems: {
      CountUp: {
        title: 'Count Up',
        menuItems: {
          'count-up': {
            title: 'Count Up',
          },
          'cricket-count-up': {
            title: 'Cricket Count Up',
            disabled: true,
          },
        },
      },
      Other: {
        title: 'Other',
        menuItems: {
          'shoot-out': {
            title: 'Shoot Out',
          },
        },
      },
    },
  },
  '01': {
    title: '01',
    menuItems: {
      '301': {
        title: '301',
      },
      '501': {
        title: '501',
      },
      '701': {
        title: '701',
      },
      '901': {
        title: '901',
      },
      '1101': {
        title: '1101',
      },
      '1501': {
        title: '1501',
      },
    },
  },
  Cricket: {
    title: 'Cricket',
    menuItems: {
      'standard-cricket': {
        title: 'Standard Cricket',
      },
      'random-number-cricket': {
        title: 'Random Number Cricket',
      },
      'hidden-cricket': {
        title: 'Hidden Cricket',
      },
    },
  },
  Party: {
    title: 'Party',
    disabled: true,
  },
};
