export type RadioButtonValue = string | number;

export type StepStatus =
  | 'wait'
  | 'process'
  | 'finish'
  | 'error'
  | 'success'
  | undefined;
