import {SafeAreaView, StyleSheet, View, Alert} from 'react-native';
import {
  PaperProvider,
  useTheme,
  TextInputProps,
  Button,
  RadioButtonProps,
  CheckboxProps,
  Provider,
  Appbar,
} from 'react-native-paper';
import {HeadlessFormBuilder} from 'react-headless-form-builder';
import {useForm, FormProvider} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import FormBuilderProvider from './form-builder-provider';
import {useCallback, useMemo} from 'react';
import {DropdownProps} from 'react-native-paper-dropdown';

const SignupFormSchema = z.object({
  name: z.string().min(1, {message: 'Name is required'}),
  email: z
    .string()
    .min(1, {message: 'Email is required'})
    .email({message: 'Email is invalid'}),
  password: z
    .string()
    .min(6, {message: 'Password must be at least 6 characters'}),
  gender: z.enum(['male', 'female'], {message: 'Gender is required'}),
  role: z.string().min(1, {message: 'Role is required'}),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
});

function App() {
  const theme = useTheme();
  const form = useForm<z.infer<typeof SignupFormSchema>>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      gender: 'male',
      role: '',
      acceptTerms: false,
    },
    resolver: zodResolver(SignupFormSchema),
    mode: 'onChange',
  });

  const formItems: any[] = useMemo(
    () => [
      {
        name: 'name',
        type: 'text',
        props: {
          placeholder: 'Enter name',
          label: 'Name',
        } as TextInputProps,
      },
      {
        name: 'email',
        type: 'email',
        props: {
          placeholder: 'Enter email',
          label: 'Email',
        } as TextInputProps,
      },
      {
        name: 'password',
        type: 'password',
        props: {
          placeholder: 'Enter password',
          label: 'Password',
        } as TextInputProps,
      },
      {
        name: 'gender',
        type: 'radio',
        props: {
          options: [
            {value: 'male', label: 'Male'},
            {value: 'female', label: 'Female'},
          ],
          label: 'Gender',
        } as RadioButtonProps & {
          label: string;
          options: {value: string; label: string}[];
        },
      },
      {
        name: 'role',
        type: 'select',
        props: {
          options: [
            {value: 'user', label: 'User'},
            {value: 'admin', label: 'Admin'},
          ],
          label: 'Role',
        } as DropdownProps,
      },
      {
        name: 'acceptTerms',
        type: 'checkbox',
        props: {
          label: 'I accept the terms and conditions',
        } as CheckboxProps & {label: string},
      },
    ],
    [],
  );

  const Spacer = useCallback(() => <View style={{height: 16}} />, []);

  return (
    <View style={styles.container}>
      <Appbar.Header elevated>
        <Appbar.Content title={'RNP Form Demo'} />
      </Appbar.Header>
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.colors.background}]}>
        <View style={styles.formWrapper}>
          <FormProvider {...form}>
            <HeadlessFormBuilder<z.infer<typeof SignupFormSchema>>
              formItems={formItems}
              Spacer={Spacer}
            />
            <View style={{height: 16}} />
            <Button
              mode="contained"
              disabled={!form.formState.isValid}
              onPress={form.handleSubmit((data) => {
                Alert.alert('Form Data', JSON.stringify(data));
              })}>
              SUBMIT
            </Button>
          </FormProvider>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default () => (
  <PaperProvider>
    <Provider>
      <FormBuilderProvider>
        <App />
      </FormBuilderProvider>
    </Provider>
  </PaperProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formWrapper: {
    margin: 16,
  },
});
