import { Monad } from 'liftjs'; // eslint-disable-line

const isNone =
  value =>
    value === null || value === undefined;

export const Result = Monad((monad, value) => { // eslint-disable-line
  const resultHasStatus = !isNone(value) && value.statusCode !== undefined;
  monad.bind = resultHasStatus ? () => monad : monad.bind; // eslint-disable-line
  monad.map = resultHasStatus ? () => monad : monad.map; // eslint-disable-line
  const run = monad.run;
  value.headers = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' };
  monad.run = (func) => { (resultHasStatus ? () => { } : run)(value, func); return monad; }; // eslint-disable-line
});
