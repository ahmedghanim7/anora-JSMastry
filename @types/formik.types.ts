export interface IFormField {
  label: string;
  name: string;
  value?: string;
  type?: InputTypes;
}

export type InputTypes = "PASSWORD" | "TEXT";
