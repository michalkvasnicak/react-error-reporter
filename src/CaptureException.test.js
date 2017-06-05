// @flow

import React from 'react';
import { mount } from 'enzyme';

import ErrorReporter, { CaptureException, contextTypes, type Context } from './';

function Test(props: any) {
  return props.render(props.error, props.extra);
}

describe('CaptureException', () => {
  describe('reports error on mount', () => {
    it('reports only if error is set', () => {
      const captureException = jest.fn();
      mount(
        <ErrorReporter captureException={captureException}>
          <CaptureException />
        </ErrorReporter>,
      );

      expect(captureException).not.toHaveBeenCalled();
    });

    it('reports if error is set', () => {
      const captureException = jest.fn();
      const error = new Error('Test error');
      mount(
        <ErrorReporter captureException={captureException}>
          <CaptureException error={error} />
        </ErrorReporter>,
      );

      expect(captureException).toHaveBeenCalledTimes(1);
      expect(captureException).toHaveBeenCalledWith(error);
    });
  });

  describe('reports error on update', () => {
    it('reports only if error has changed', () => {
      const captureException = jest.fn();
      const error = new Error('Test error');
      const wrapper = mount(
        <Test
          error={error}
          render={(err, extra) =>
            <ErrorReporter captureException={captureException}>
              <CaptureException error={err} extra={extra} />
            </ErrorReporter>}
        />,
      );

      // on mount
      expect(captureException).toHaveBeenCalledTimes(1);
      expect(captureException).toHaveBeenCalledWith(error);

      wrapper.setProps({ test: true });

      expect(captureException).toHaveBeenCalledTimes(1);
      expect(captureException).toHaveBeenCalledWith(error);

      const err = new Error('New');
      wrapper.setProps({ error: err, extra: [{ test: 1 }, { test: 2 }] });

      expect(captureException).toHaveBeenCalledTimes(2);
      expect(captureException).toHaveBeenCalledWith(err, { test: 1 }, { test: 2 });
    });
  });
});
