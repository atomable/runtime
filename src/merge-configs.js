export const mergeConfigs = (configs) => {
  return configs.reduce((a, b) => {
    return a.concat(b);
  }, []);
};