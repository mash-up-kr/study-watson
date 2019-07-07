export const cleanNullArgs = args => {
  const notNull = {};
  Object.keys(args).forEach(key => {
    if (args[key] !== null && args[key] !== '') {
      notNull[key] = args[key];
    }
  });
  return notNull;
};

export default cleanNullArgs;
