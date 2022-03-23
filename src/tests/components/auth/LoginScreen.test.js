import React from "react";
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import { LoginScreen } from "../../../components/auth/LoginScreen"

describe('Pruebas en <LoginScreen/>', () => { 

  const wrapper = mount( 
    <Provider>
      <LoginScreen /> 
    </Provider>
  );

  expect( wrapper ).toMatchSnapshot();

 })