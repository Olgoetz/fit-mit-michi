import type { NextAuthConfig } from "next-auth";
import { publicRoutes, protectedRoutes } from "@/routes";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
export const authConfig = {
  //adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
    // async redirect({ url, baseUrl }) {
    //   // After a successful login, redirect to the homepage
    //   return "/";
    // },
    // async jwt({ token, user }) {

    //   // When the user logs in, attach isAdmin to the JWT
    //   if (user) {
    //     const userFromDb = await prisma.user.findUnique({ where: { id: user.id } });
    //     token.isAdmin = userFromDb?.isAdmin || false;
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   // Attach isAdmin to the session object
    //   session.user.isAdmin = token.isAdmin;
    //   return session;
    // },
    authorized: async ({ auth, request: { nextUrl } }) => {
      console.log("authorized callback");
      console.log("auth", auth);

      const isLoggedIn = !!auth?.user;

      // Restrict access to /admin routes for non-admins
      const isOnAdminPage = nextUrl.pathname.startsWith("/admin");
      const isAdmin = auth?.user?.isAdmin || false;

      const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
      const isProtectedRoute = protectedRoutes.includes(nextUrl.pathname);

      if (isPublicRoute) {
        // Allow access to public routes
        return true;
      }

      if (isProtectedRoute && !isLoggedIn) {
        // Redirect unauthenticated users trying to access protected routes
        return false;
      }

      if (isOnAdminPage && !isLoggedIn) {
        // Redirect unauthenticated users trying to access protected routes
        return false;
      }

      if (isLoggedIn && nextUrl.pathname === "/auth/login") {
        console.log("isLoggedIn && /auth/login path", isLoggedIn);
        console.log(nextUrl);
        // Redirect logged in users trying to access the login page
        return Response.redirect(new URL("/", nextUrl));
      }

      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
