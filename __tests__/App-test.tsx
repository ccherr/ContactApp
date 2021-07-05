/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import { contactValidation } from '../src/validation/contactValidation';

it('renders correctly', () => {
  renderer.create(<App />);
});

test('Contact validation', () => {
  expect(contactValidation("test","test",20,"../src/assets/img/yoona.jpg")).toEqual("")
  expect(contactValidation("","",0,"")).toEqual("Data cannot be empty! please input form")
  expect(contactValidation("","last name",0,"")).toEqual("Data cannot be empty! please input form")
  expect(contactValidation("first name","",0,"")).toEqual("Data cannot be empty! please input form")
  expect(contactValidation("","",0,"../src/assets/img/yoona.jpg")).toEqual("Data cannot be empty! please input form")
  expect(contactValidation("","",30,"")).toEqual("Data cannot be empty! please input form")
  expect(contactValidation("a","asdaasd",20,"../src/assets/img/yoona.jpg")).toEqual("First name should be more than 3")
  expect(contactValidation("test","a",20,"../src/assets/img/yoona.jpg")).toEqual("Last name shoud be more than 3")
  expect(contactValidation("asdasd","asdasd",0,"photo")).toEqual("age cannot be more than 100 and cannot be less than 0")
  expect(contactValidation("asdasd","asdasd",200,"photo")).toEqual("age cannot be more than 100 and cannot be less than 0")
  })