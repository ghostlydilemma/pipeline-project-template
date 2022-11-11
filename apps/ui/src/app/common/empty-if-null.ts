import { EMPTY, OperatorFunction, mergeMap, of } from 'rxjs'

export const emptyIfNull = <T>(): OperatorFunction<T | null, T> => {
  return (obs) => obs.pipe(mergeMap((value) => (value ? of(value) : EMPTY)))
}
