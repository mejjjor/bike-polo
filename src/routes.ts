export const routes = {
  home: "/",
  signin: "/signin",
  signup: "/signup",
  dashboard: "/dashboard",
  stream: "/stream",
  referee: (groundId: string) => `${routes.dashboard}/referee/${groundId}`,
};
