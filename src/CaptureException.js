// @flow

import React from 'react';

import contextTypes from './contextTypes';
import { type Context } from './';

type Props = {
  error?: ?Error,
  extra?: ?Array<any>,
};

export default class CaptureException extends React.Component<void, Props, void> {
  static contextTypes = contextTypes;

  context: Context;

  processException = (e: Error, extra: ?Array<any>) => {
    const extraData = Array.isArray(extra) ? extra : [];

    this.context.captureException(e, ...extraData);
  };

  componentWillMount() {
    const { error, extra } = this.props;

    if (error != null) {
      this.processException(error, extra);
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.error !== prevProps.error && this.props.error != null) {
      this.processException(this.props.error, this.props.extra);
    }
  }

  render() {
    return null;
  }
}
