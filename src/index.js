// @flow

import React from 'react';
import CaptureException from './CaptureException';
import contextTypes, { type Context } from './contextTypes';

type Props = {
  captureException: $PropertyType<Context, 'captureException'>,
  children?: any,
};

export type { Context };
export { CaptureException, contextTypes };

export default class ErrorReporter extends React.Component<void, Props, void> {
  static childContextTypes = contextTypes;

  getChildContext = () => ({
    captureException: (e: Error, ...args: any) => {
      this.props.captureException(e, ...args);
    },
  });

  render() {
    return this.props.children;
  }
}
