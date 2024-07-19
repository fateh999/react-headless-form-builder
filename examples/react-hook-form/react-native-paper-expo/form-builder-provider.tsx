import {ReactNode, useState} from 'react';
import {
  FormInputItemProps,
  FormInputs,
  HeadlessFormBuilderProvider,
} from 'react-headless-form-builder';
import {useFormContext, Controller} from 'react-hook-form';
import {View} from 'react-native';
import {
  TextInput,
  TextInputProps,
  HelperText,
  RadioButtonProps,
  Paragraph,
  RadioButton,
  Checkbox,
} from 'react-native-paper';
import DropDown, {DropDownPropsInterface} from 'react-native-paper-dropdown';

const FormTextInput = ({name, props, nextFormItemName}: FormInputItemProps) => {
  const {control, setFocus} = useFormContext();
  const onSubmitEditing = nextFormItemName
    ? () => {
        setFocus(nextFormItemName);
      }
    : undefined;

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => {
        const message = fieldState.error?.message;

        return (
          <>
            <TextInput
              ref={field.ref}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
              onSubmitEditing={onSubmitEditing}
              error={!!message}
              {...props}
            />
            {!!message && <HelperText type={'error'}>{message}</HelperText>}
          </>
        );
      }}
    />
  );
};

const FormEmailInput = (formInputItemProps: FormInputItemProps) => {
  return (
    <FormTextInput
      {...formInputItemProps}
      props={
        {
          ...formInputItemProps.props,
          keyboardType: 'email-address',
        } as TextInputProps
      }
    />
  );
};

const FormPasswordInput = (formInputItemProps: FormInputItemProps) => {
  return (
    <FormTextInput
      {...formInputItemProps}
      props={
        {
          ...formInputItemProps.props,
          secureTextEntry: true,
        } as TextInputProps
      }
    />
  );
};

const FormRadioInput = ({name, props}: FormInputItemProps) => {
  const {control} = useFormContext();
  const {
    options = [],
    label,
    ...radioButtonGroupProps
  } = props as RadioButtonProps & {
    options: {label: string; value: string}[];
    label: string;
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => {
        const message = fieldState.error?.message;

        return (
          <>
            {label ? <Paragraph>{label}</Paragraph> : <></>}
            <RadioButton.Group
              {...radioButtonGroupProps}
              onValueChange={field.onChange}
              value={field.value}>
              {options.map((option) => (
                <View
                  key={option.value}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton.Android value={option.value} />
                  <Paragraph>{option.label}</Paragraph>
                </View>
              ))}
              {!!message && <HelperText type={'error'}>{message}</HelperText>}
            </RadioButton.Group>
          </>
        );
      }}
    />
  );
};

const FormCheckboxInput = ({name, props}: FormInputItemProps) => {
  const {control} = useFormContext();
  const {label, ...checkboxProps} = props;

  return (
    <Controller
      control={control}
      name={name}
      render={({field, fieldState}) => {
        const message = fieldState.error?.message;
        return (
          <>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Checkbox.Android
                {...checkboxProps}
                status={field.value ? 'checked' : 'unchecked'}
                onPress={() => field.onChange(!field.value)}
              />
              {label ? <Paragraph style={{flex: 1}}>{label}</Paragraph> : <></>}
            </View>
            {!!message && <HelperText type={'error'}>{message}</HelperText>}
          </>
        );
      }}
    />
  );
};

const FormSelectInput = ({name, props}: FormInputItemProps) => {
  const {control} = useFormContext();
  const {label, list} = props as DropDownPropsInterface;
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({field, fieldState}) => {
        const message = fieldState.error?.message;

        return (
          <>
            <DropDown
              label={label}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={field.value}
              setValue={field.onChange}
              list={list}
              inputProps={{
                right: (
                  <TextInput.Icon
                    icon={showDropDown ? 'menu-up' : 'menu-down'}
                  />
                ),
              }}
            />
            {!!message && <HelperText type={'error'}>{message}</HelperText>}
          </>
        );
      }}
    />
  );
};

const formInputs: FormInputs = {
  text: FormTextInput,
  email: FormEmailInput,
  password: FormPasswordInput,
  radio: FormRadioInput,
  checkbox: FormCheckboxInput,
  select: FormSelectInput,
};

function FormBuilderProvider({children}: {children: ReactNode}) {
  return (
    <HeadlessFormBuilderProvider formInputs={formInputs}>
      {children}
    </HeadlessFormBuilderProvider>
  );
}

export default FormBuilderProvider;
