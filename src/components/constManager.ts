import {
  SiMenuItemOption,
  SiSubMenuOption,
} from '~/components/interfaceManager';

export const keyBind: { [key: string]: string } = {
  1: 'Double 20',
  q: 'Single 20',
  a: 'Triple 20',
  z: 'Single 20',
  2: 'Double 19',
  w: 'Single 19',
  s: 'Triple 19',
  x: 'Single 19',
  3: 'Double 18',
  e: 'Single 18',
  d: 'Triple 18',
  c: 'Single 18',
  4: 'Double 17',
  r: 'Single 17',
  f: 'Triple 17',
  v: 'Single 17',
  5: 'Double 16',
  t: 'Single 16',
  g: 'Triple 16',
  b: 'Single 16',
  6: 'Double 15',
  y: 'Single 15',
  h: 'Triple 15',
  n: 'Single 15',
  7: 'Double 14',
  u: 'Single 14',
  j: 'Triple 14',
  m: 'Single 14',
  8: 'Double 13',
  i: 'Single 13',
  k: 'Triple 13',
  ',': 'Single 13',
  9: 'Double 12',
  o: 'Single 12',
  l: 'Triple 12',
  '.': 'Single 12',
  0: 'Double 11',
  p: 'Single 11',
  ';': 'Triple 11',
  '/': 'Single 11',
  '!': 'Double 10',
  Q: 'Single 10',
  A: 'Triple 10',
  Z: 'Single 10',
  '"': 'Double 9',
  W: 'Single 9',
  S: 'Triple 9',
  X: 'Single 9',
  '#': 'Double 8',
  E: 'Single 8',
  D: 'Triple 8',
  C: 'Single 8',
  $: 'Double 7',
  R: 'Single 7',
  F: 'Triple 7',
  V: 'Single 7',
  '%': 'Double 6',
  T: 'Single 6',
  G: 'Triple 6',
  B: 'Single 6',
  '&': 'Double 5',
  Y: 'Single 5',
  H: 'Triple 5',
  N: 'Single 5',
  "'": 'Double 4',
  U: 'Single 4',
  J: 'Triple 4',
  M: 'Single 4',
  '(': 'Double 3',
  I: 'Single 3',
  K: 'Triple 3',
  '<': 'Single 3',
  ')': 'Double 2',
  O: 'Single 2',
  L: 'Triple 2',
  '>': 'Single 2',
  '-': 'Double 1',
  P: 'Single 1',
  '+': 'Triple 1',
  '?': 'Single 1',
  '=': 'Single Bull',
  '@': 'Double Bull',
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
        disabled: true,
      },
    },
  },
  Party: {
    title: 'Party',
    disabled: true,
  },
};
