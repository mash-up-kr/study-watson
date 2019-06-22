import * as React from 'react';

export const useInput = initValue => {
  const [value, setter] = React.useState(initValue);
  const handler = React.useCallback(e => {
    setter(e.target.value);
  }, []);
  return [value, handler];
};

export default useInput;
