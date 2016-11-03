import { Monad } from 'liftjs';

const isNone =
  value =>
    value === null || value === undefined;

export const Result = Monad((monad, value) => {
  const resultHasStatus = !isNone(value) && value.status !== undefined;
  monad.bind = resultHasStatus ? () => monad : monad.bind;
  monad.map = resultHasStatus ? () => monad : monad.map;
  const run = monad.run;
  monad.run = (func) => { (resultHasStatus ? () => { } : run)(value, func); return monad; };
});