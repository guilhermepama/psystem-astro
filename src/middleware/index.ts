import { defineMiddleware } from "astro:middleware";
import { supabase } from "../lib/supabase";
import micromatch from "micromatch";

export const onRequest = defineMiddleware(
  async ({ locals, url, cookies, redirect }, next) => {
    // Extraímos o slug assumindo que ele é a primeira parte do pathname
    const pathnameParts = url.pathname.split("/");
    const slug = pathnameParts[1] || "";

    const protectedRoutes = ["/dashboard/**", "/protected/**", "**/dashboard/**"];
    const redirectRoutes = [`/${slug}/signin(|/)", "/register(|/)`];
    const protectedAPIRoutes = ["/api/getClientes(|/)"];

    if (micromatch.isMatch(url.pathname, protectedRoutes)) {
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");

      if (!accessToken || !refreshToken) {
        return redirect(`/${slug}/signin`);
      }

      const { data, error } = await supabase.auth.setSession({
        refresh_token: refreshToken.value,
        access_token: accessToken.value,
      });

      if (error) {
        cookies.delete("sb-access-token", { path: "/" });
        cookies.delete("sb-refresh-token", { path: "/" });
        return redirect("/signin");
      }

      locals.email = data.user?.email;
      locals.id = data.user?.id;

      cookies.set("sb-access-token", data?.session?.access_token, {
        sameSite: "strict",
        path: "/",
        secure: true,
      });
      cookies.set("sb-refresh-token", data?.session?.refresh_token, {
        sameSite: "strict",
        path: "/",
        secure: true,
      });
    }

    if (micromatch.isMatch(url.pathname, redirectRoutes)) {
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");

      if (accessToken && refreshToken) {
        // Redireciona usando o slug extraído
        return redirect(`/${slug}/dashboard`);
      }
    }

    if (micromatch.isMatch(url.pathname, protectedAPIRoutes)) {
      const accessToken = cookies.get("sb-access-token");
      const refreshToken = cookies.get("sb-refresh-token");

      // Checa se os tokens existem
      if (!accessToken || !refreshToken) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken.value,
        refresh_token: refreshToken.value,
      });

      if (error) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
      }
    }

    return next();
  }
);
