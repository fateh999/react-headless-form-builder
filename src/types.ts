import {ReactElement} from 'react';

export interface InnerFormItem {
  name: string;
  props?: any;
}

export type FormInputItemProps = {
  name: string;
  props: any;
  InnerFormItem?: InnerFormItem;
  nextFormItemName?: string;
};

export type FormInputItem = (
  props: FormInputItemProps,
) => ReactElement<FormInputItemProps>;

export interface FormInputs {
  [type: string]: FormInputItem;
}

export interface FormItemBase<FormSchema> {
  name: keyof FormSchema;
  type: string;
  props?: any;
  innerFormItem?: InnerFormItem;
}

export interface FormItemWithRender {
  render: () => ReactElement;
}

export type FormItem<FormSchema> =
  | FormItemBase<FormSchema>
  | FormItemWithRender;
