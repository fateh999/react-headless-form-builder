import React from 'react';
import {ReactNode, createContext} from 'react';
import {FormInputs} from './types';

export interface HeadlessFormBuilderProviderProps {
  formInputs: FormInputs;
  children: ReactNode;
}

export const HeadlessFormBuilderContext = createContext<FormInputs>({});

function HeadlessFormBuilderProvider(props: HeadlessFormBuilderProviderProps) {
  const {formInputs, children} = props;

  return (
    <HeadlessFormBuilderContext.Provider value={formInputs}>
      {children}
    </HeadlessFormBuilderContext.Provider>
  );
}
export default HeadlessFormBuilderProvider;
