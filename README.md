# react-error-reporter

[![npm](https://img.shields.io/npm/v/react-apollo-graphql.svg)](https://www.npmjs.com/package/react-error-reporter)
[![CircleCI](https://circleci.com/gh/michalkvasnicak/react-error-reporter.svg?style=svg)](https://circleci.com/gh/michalkvasnicak/react-error-reporter)

![gzip size](http://img.badgesize.io/https://unpkg.com/react-apollo-graphql/dist/react-error-reporter.min.js?compression=gzip&label=gzip%20size)
![size](http://img.badgesize.io/https://unpkg.com/react-apollo-graphql/dist/react-error-reporter.min.js?label=size)
![module formats: umd, cjs, esm](https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20esm-green.svg)

Simple error reporting using React components.

`npm install --save react-error-reporter`

## Example

```js
import ErrorReporter, { CaptureException } from 'react-error-reporter';

<ErrorReporter captureException={(error, ...args) => console.error(error, ...args)}>
  <CaptureException error={new Error('Test Error')} extra={[{ contextToError: true }]} />
</ErrorReporter>
```

## Advanced Example

```js
import GraphQL from 'react-apollo-graphql';
import ErrorReporter, { CaptureException } from 'react-error-reporter';

<ErrorReporter captureException={console.error}>
  <GraphQL queries={{ projects: ... }} render={(queries) => {
    if (queries.projects.error) {
      return <CaptureException error={queries.projects.error} />;
    }

    if (queries.projects.loading) {
      return <Loading />;
    }

    return queries.projects.data.projects.map(
      project => <div key={project.id}>{project.title}</div>
    );
  }} />
</ErrorReporter>
```

## API

### `<ErrorReporter />`

Provides `captureException` to the `context`. Your app must be wrapped using this component.

```js
type Props = {
  captureException(error: Error, ...args: any): void,
}
```

### `<CaptureException />`

Captures exception, passing `error` and `extra` to `captureException` handler. This components renders `null`.

Captures exception on `componentWillMount()` if the `error` prop is set and `componentDidUpdate()` if the `error` props has changed and is set.

```js
type Props = {
  // optional error
  // will be passed to captureException() as the first argument.
  error: ?Error,

  // passes extra data to captureException()
  // each item in array is passed to captureException(error, item0, item1) as respective argument after the error
  // for example extra={[{ test: 1 }, { test: 2 }]}
  // will call captureException(error, { test: 1 }, { test: 2 })
  extra: ?Array<any>,
}
```
