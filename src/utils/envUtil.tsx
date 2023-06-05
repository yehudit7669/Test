export const getWSEnv = () => {
  let env = import.meta.env.VITE_REACT_APP_ENV;
  const WS_URL =
    env === "prod"
      ? import.meta.env.VITE_SECURE_WS_URL
      : import.meta.env.VITE_WS_URL;
  return WS_URL;
};
