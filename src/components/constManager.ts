import {
  SiMenuItemOption,
  SiSubMenuOption,
} from '~/components/interfaceManager';

export const BULL_INDEX = 21;

export const keyBind: { [key: string]: string } = {
  1: 'Double 1',
  q: 'Single 1 Outer',
  a: 'Triple 1',
  z: 'Single 1 Inner',
  2: 'Double 2',
  w: 'Single 2 Outer',
  s: 'Triple 2',
  x: 'Single 2 Inner',
  3: 'Double 3',
  e: 'Single 3 Outer',
  d: 'Triple 3',
  c: 'Single 3 Inner',
  4: 'Double 4',
  r: 'Single 4 Outer',
  f: 'Triple 4',
  v: 'Single 4 Inner',
  5: 'Double 5',
  t: 'Single 5 Outer',
  g: 'Triple 5',
  b: 'Single 5 Inner',
  6: 'Double 6',
  y: 'Single 6 Outer',
  h: 'Triple 6',
  n: 'Single 6 Inner',
  7: 'Double 7',
  u: 'Single 7 Outer',
  j: 'Triple 7',
  m: 'Single 7 Inner',
  8: 'Double 8',
  i: 'Single 8 Outer',
  k: 'Triple 8',
  ',': 'Single 8 Inner',
  9: 'Double 9',
  o: 'Single 9 Outer',
  l: 'Triple 9',
  '.': 'Single 9 Inner',
  0: 'Double 10',
  p: 'Single 10 Outer',
  ';': 'Triple 10',
  '/': 'Single 10 Inner',
  '!': 'Double 11',
  Q: 'Single 11 Outer',
  A: 'Triple 11',
  Z: 'Single 11 Inner',
  '"': 'Double 12',
  W: 'Single 12 Outer',
  S: 'Triple 12',
  X: 'Single 12 Inner',
  '#': 'Double 13',
  E: 'Single 13 Outer',
  D: 'Triple 13',
  C: 'Single 13 Inner',
  $: 'Double 14',
  R: 'Single 14 Outer',
  F: 'Triple 14',
  V: 'Single 14 Inner',
  '%': 'Double 15',
  T: 'Single 15 Outer',
  G: 'Triple 15',
  B: 'Single 15 Inner',
  '&': 'Double 16',
  Y: 'Single 16 Outer',
  H: 'Triple 16',
  N: 'Single 16 Inner',
  "'": 'Double 17',
  U: 'Single 17 Outer',
  J: 'Triple 17',
  M: 'Single 17 Inner',
  '(': 'Double 18',
  I: 'Single 18 Outer',
  K: 'Triple 18',
  '<': 'Single 18 Inner',
  ')': 'Double 19',
  O: 'Single 19 Outer',
  L: 'Triple 19',
  '>': 'Single 19 Inner',
  '-': 'Double 20',
  P: 'Single 20 Outer',
  '+': 'Triple 20',
  '?': 'Single 20 Inner',
  '@': 'Single Bull',
  '`': 'Double Bull',
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
