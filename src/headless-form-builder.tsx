import React, {Fragment, ReactElement, useCallback, useContext} from 'react';
import {HeadlessFormBuilderContext} from './headless-form-builder-provider';
import {FormItem, FormInputs, FormItemWithRender, FormItemBase} from './types';

export interface HeadlessFormBuilderProps<FormSchema> {
  formItems: Array<FormItem<FormSchema>[]> | Array<FormItem<FormSchema>>;
  formInputs?: FormInputs;
  Spacer: () => ReactElement;
  RowWrapper?: ({children}) => ReactElement;
  ColumnWrapper?: ({children}) => ReactElement;
}

function HeadlessFormBuilder<FormSchema>(
  props: HeadlessFormBuilderProps<FormSchema>,
) {
  const {
    formItems,
    formInputs,
    Spacer,
    RowWrapper = ({children}) => <>{children}</>,
    ColumnWrapper = ({children}) => <>{children}</>,
  } = props;
  const formItemsLength = formItems.length;
  const contextFormInputs = useContext(HeadlessFormBuilderContext);
  const combinedFormInputs = {...formInputs, ...contextFormInputs};

  const renderFormBuilderItem = useCallback(
    (
      formItem: FormItem<FormSchema> | FormItem<FormSchema>[],
      index: number,
    ) => {
      const nextFormItem = formItems[index + 1];
      const checkIfNextFormItemArray = Array.isArray(nextFormItem);

      const nextFormItemName = checkIfNextFormItemArray
        ? (nextFormItem[0] as FormItemBase<FormSchema>)?.name
        : (nextFormItem as FormItemBase<FormSchema>)?.name;

      const renderFormInput = (
        formInputItem: FormItem<FormSchema>,
        itemsLength: number,
        itemIndex: number,
        nextItemName?: string,
      ) => {
        if ((formInputItem as FormItemWithRender)?.render) {
          return (
            <Fragment key={itemIndex + index}>
              {(formInputItem as FormItemWithRender).render()}
            </Fragment>
          );
        }

        const {name, type, props, innerFormItem} =
          formInputItem as FormItemBase<FormSchema>;
        const FormInputItem = combinedFormInputs[type as string] ?? undefined;

        return (
          <Fragment key={name as string}>
            {FormInputItem ? (
              <FormInputItem
                name={name as string}
                props={props}
                nextFormItemName={nextItemName}
                InnerFormItem={innerFormItem}
              />
            ) : (
              <></>
            )}
            {itemsLength > itemIndex - 1 ? <Spacer /> : <></>}
          </Fragment>
        );
      };

      return Array.isArray(formItem) ? (
        <RowWrapper>
          {formItem.map((element, innerIndex) => {
            return (
              <ColumnWrapper
                key={(element as FormItemBase<FormSchema>).name as string}>
                {renderFormInput(
                  element,
                  formItem.length,
                  innerIndex,
                  ((formItem[innerIndex + 1] as FormItemBase<FormSchema>)
                    .name as string) ?? nextFormItemName,
                )}
              </ColumnWrapper>
            );
          })}
        </RowWrapper>
      ) : (
        renderFormInput(
          formItem,
          formItemsLength,
          index,
          nextFormItemName as string,
        )
      );
    },
    [formItemsLength, combinedFormInputs],
  );

  return <>{formItems.map(renderFormBuilderItem)}</>;
}

export default HeadlessFormBuilder;
