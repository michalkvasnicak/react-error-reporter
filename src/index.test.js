// @flow

import React from 'react';
import { mount } from 'enzyme';

import ErrorReporter, { contextTypes, type Context } from './';

function Test(props: any, context: Context) {
  expect(context).toHaveProperty('captureException');
  expect(typeof context.captureException).toBe('function');

  return <div />;
}

Test.contextTypes = contextTypes;

describe('ErrorReporter', () => {
  it('provides captureException to context', () => {
    const wrapper = mount(
      <ErrorReporter captureException={() => {}}>
        <Test />
      </ErrorReporter>,
    );
  });

  it('renders all children', () => {
    const wrapper = mount(
      <ErrorReporter captureException={() => {}}>
        <Test />
      </ErrorReporter>,
    );

    expect(wrapper.find('div').length).toBe(1);
  });
});
