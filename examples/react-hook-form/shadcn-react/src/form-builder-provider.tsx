import {ReactNode} from 'react';
import {HeadlessFormBuilderProvider} from 'react-headless-form-builder';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './components/ui/form';
import {Input} from './components/ui/input';
import {Checkbox} from './components/ui/checkbox';
import {useFormContext} from 'react-hook-form';
import {
  FormInputItem,
  FormInputs,
} from 'react-headless-form-builder/dist/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './components/ui/select';
import {RadioGroup, RadioGroupItem} from './components/ui/radio-group';
import {Label} from './components/ui/label';

const FormTextInput: FormInputItem = ({name, props}) => {
  const {control} = useFormContext();
  const {label, ...innerProps} = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : <></>}
          <FormControl>
            <Input placeholder="shadcn" {...field} {...innerProps} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormEmailInput: FormInputItem = ({name, props}) => {
  return <FormTextInput name={name} props={{...props, type: 'email'}} />;
};

const FormPasswordInput: FormInputItem = ({name, props}) => {
  return <FormTextInput name={name} props={{...props, type: 'password'}} />;
};

const FormCheckboxInput: FormInputItem = ({name, props}) => {
  const {control} = useFormContext();
  const {label, ...innerProps} = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormControl>
            <label className="flex items-center space-x-2">
              <Checkbox
                ref={field.ref}
                value={field.value}
                onCheckedChange={field.onChange}
                {...innerProps}
              />
              <span>{label}</span>
            </label>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormSelectInput: FormInputItem = ({name, props}) => {
  const {control} = useFormContext();
  const {label, options, ...innerProps} = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : <></>}
          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              disabled={field.disabled}
              {...innerProps}>
              <SelectTrigger ref={field.ref}>
                <SelectValue placeholder={label} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {label ? <SelectLabel>{label}</SelectLabel> : null}
                  {options.map((option: {value: string; label: string}) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormRadioInput: FormInputItem = ({name, props}) => {
  const {control} = useFormContext();
  const {label, options, ...innerProps} = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          {label ? <FormLabel>{label}</FormLabel> : <></>}
          <FormControl>
            <RadioGroup
              {...field}
              onValueChange={field.onChange}
              {...innerProps}>
              {options.map(
                (option: {value: string; label: string}, index: number) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`r${index}`} />
                    <Label htmlFor={`r${index}`}>{option.label}</Label>
                  </div>
                ),
              )}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const formInputs: FormInputs = {
  text: FormTextInput,
  email: FormEmailInput,
  password: FormPasswordInput,
  select: FormSelectInput,
  checkbox: FormCheckboxInput,
  radio: FormRadioInput,
};

function FormBuilderProvider({children}: {children: ReactNode}) {
  return (
    <HeadlessFormBuilderProvider formInputs={formInputs}>
      {children}
    </HeadlessFormBuilderProvider>
  );
}

export default FormBuilderProvider;
