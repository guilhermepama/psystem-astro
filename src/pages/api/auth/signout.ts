import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ request, cookies, redirect }) => {
  // Extrai o slug da query string
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug") || "";

  cookies.delete("sb-access-token", { path: "/" });
  cookies.delete("sb-refresh-token", { path: "/" });
  
  // Se o slug estiver definido, redirecione para /{slug}/signin, caso contrário, para /signin
  return redirect(slug ? `/${slug}/signin` : "/signin");
};
