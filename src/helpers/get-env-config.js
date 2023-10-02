export const getEnvConfig = () => {
  import.meta.env;

  return {
    ...import.meta.env,
  };
};
