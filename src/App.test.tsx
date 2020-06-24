import React from 'react'
import App from './App'
import { mount } from 'enzyme'
import toJson from 'enzyme-to-json'

test('shold app (main) render correctly', () => {
  const app = mount(<App />)
  expect(toJson(app)).toMatchSnapshot()
})
