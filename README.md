[![atomable](https://img.shields.io/badge/atomable.io--blue.svg)](http://atomable.io)
[![Build Status](https://travis-ci.org/atomable/runtime.svg?branch=master)](https://travis-ci.org/atomable/runtime)

## atomable runtime

This is the runtime for the atomable serverless microservices framework. Our goal is to make your serverless life easier!

The best way to use this runtime is by using our insanely powerful [atomable cli.](https://github.com/atomable/atomable)

If using command line tools is not your thing, well we still got your covered! Check out the code examples below to get started!

## issues & documentation
https://github.com/atomable/atomable

## Installation

### [npm](https://www.npmjs.com/package/atomable-runtime)
```
npm install atomable-runtime
```
### [yarn](https://yarnpkg.com/)
```
yarn add atomable-runtime
```

## Importing

```javascript
const runtime = require('atomable-runtime');

import { register, handle } from 'atomable-runtime';
```

## Usage

To use the runtime you need to create an AWS lambda that will be the main entry point of your project. Once this is done, you never have to think about configuring more lambdas.

`handler.js`

```javascript
const runtime = require('atomable-runtime');

/**
 * () registers the function and the
 * callback to handle the aws event
 */
(() => {
  const protonHandler = require('./proton/proton.js').proton;
  const protonConf = { name: 'proton', https: { path: 'proton', method: 'get', parameters: [{ in: 'query', name: 'firstName' }, { in: 'query', name: 'lastName', required: false }] }};
  runtime.register(protonHandler, protonConf);

  const electronHandler = require('./electron/electron.js').electron;
  const electronConf = { name: 'electron', https: { path: 'electron', method: 'post', parameters: [{ in: 'body', name: '*' }, { in: 'headers', name: 'authorization' }] }};
  runtime.register(electronHandler, electronConf);
})();


/**
 * handler() handles aws lambda events
 */
export const handler = runtime.handle;
```

`proton.js`

```javascript
// firstName is guaranteed not to be null since it is required by default
// since we configured lastName to not be required, it may be undefined here
module.exports.proton = (firstName, lastName) {
  // you can also return a promise, we will handle the result correctly.
  return { statusCode : 200, body: `Hello ${firstName} ${lastName}` };
};
```

## Tests

To run the tests, simply checkout the code and run `npm test`.

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request!

If you find issues with the runtime, log them here in our [issues.](https://github.com/atomable/runtime/issues)

If you feel like contributing, one thing you have to know is we hate classes, the keyword `new` and we like to use our Monad library, [lift.js](https://github.com/atomable/lift.js), as often as possible :)

## Roadmap

Here is a list of things we want to do in this project, feel free to help us out!
- Add parameter validators (stringNotEmpty, stringLength, intBetween, etc. That sort of thing...)
- Better error messages when things are not configured as they should.
- Support multiple cloud providers

## Links
- [atomable.io](atomable.io)
- [npm](https://www.npmjs.com/package/atomable-runtime)

## License

MIT
