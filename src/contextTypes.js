// @flow

import PropTypes from 'prop-types';

export type Context = {
  captureException(e: Error, ...args: any): void,
};

export default {
  captureException: PropTypes.func.isRequired,
};
