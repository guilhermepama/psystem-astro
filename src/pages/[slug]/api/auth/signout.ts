import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params, cookies, redirect }) => {
  const { slug } = params; // extrai o slug da rota
  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  return redirect(`/${slug}/signin`);
};
