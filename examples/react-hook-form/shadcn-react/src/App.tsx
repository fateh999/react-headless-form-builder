import {FormProvider, useForm} from 'react-hook-form';
import {HeadlessFormBuilder} from 'react-headless-form-builder';
import {InputProps} from './components/ui/input';
import {Form} from './components/ui/form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from './components/ui/button';
import {RadioGroupProps} from '@radix-ui/react-radio-group';
import {SelectGroupProps} from '@radix-ui/react-select';

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

type SignupFormSchemaType = z.infer<typeof SignupFormSchema>;

function App() {
  const form = useForm<SignupFormSchemaType>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      gender: 'male',
      role: '',
      acceptTerms: false,
    },
    mode: 'onChange',
    resolver: zodResolver(SignupFormSchema),
  });

  return (
    <div className="h-lvh w-lvw lg:w-[600px] flex flex-col flex-1 mx-auto">
      <div className="px-8 pt-8">
        <h2 className="text-center text-lg">Shadcn Form Builder Demo</h2>
      </div>
      <Form {...form}>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((data) => {
              alert(JSON.stringify(data));
            })}
            className="my-8 mx-4">
            <HeadlessFormBuilder<SignupFormSchemaType>
              formItems={[
                {
                  name: 'name',
                  type: 'text',
                  props: {
                    label: 'Name',
                    placeholder: 'Enter Name',
                  } as InputProps & {label: string},
                },
                {
                  name: 'email',
                  type: 'email',
                  props: {
                    label: 'Email',
                    placeholder: 'Enter Email',
                  } as InputProps & {label: string},
                },
                {
                  name: 'password',
                  type: 'password',
                  props: {
                    label: 'Password',
                    placeholder: 'Enter Password',
                  } as InputProps & {label: string},
                },
                {
                  name: 'gender',
                  type: 'radio',
                  props: {
                    label: 'Gender',
                    options: [
                      {value: 'male', label: 'Male'},
                      {value: 'female', label: 'Female'},
                    ],
                  } as RadioGroupProps & {
                    label: string;
                    options: {value: string | number; label: string}[];
                  },
                },
                {
                  name: 'role',
                  type: 'select',
                  props: {
                    label: 'Role',
                    options: [
                      {value: 'user', label: 'User'},
                      {value: 'admin', label: 'Admin'},
                    ],
                  } as SelectGroupProps & {
                    label: string;
                    options: {value: string | number; label: string}[];
                  },
                },
                {
                  name: 'acceptTerms',
                  type: 'checkbox',
                  props: {
                    label: 'I accept the terms and conditions',
                  } as RadioGroupProps & {label: string},
                },
              ]}
              Spacer={() => <div className="h-4" />}
            />
            <div className="h-4" />
            <Button className="w-full" disabled={!form.formState.isValid}>
              Signup
            </Button>
            <div className="h-4" />
          </form>
        </FormProvider>
      </Form>
    </div>
  );
}

export default App;
