// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import { NextResponse } from "next/server";

// export default NextAuth(authConfig).auth;

// const { auth } = NextAuth(authConfig);

// export default auth((req) => {
//   const isLoggedIn = !!req.auth?.user;
//   const { nextUrl } = req;
//   const pathname = req.nextUrl.pathname;
//   console.log("req", req.auth);

//   // If trying to access the admin page and not logged in, redirect to login
//   if (pathname.startsWith("/admin") && !isLoggedIn) {
//     return NextResponse.redirect(new URL("/auth/login", nextUrl.origin));
//   }

//   // If logged in and trying to access login page, redirect to home
//   if (isLoggedIn && pathname === "/auth/login") {
//     return NextResponse.redirect(new URL("/", nextUrl.origin));
//   }

//   return NextResponse.next();
// });

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   // matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)", "/"],
//   // matcher: ["/admin", "/auth/login"],
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//     "/",
//   ],
// };

// export const config = {
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
//   matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
// };

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/api/webhooks/(.*)",
]);

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export default clerkMiddleware(async (auth, request) => {
  // if (!isPublicRoute(request)) {
  //   await auth.protect();
  // }

  // Protect all routes starting with `/admin`
  if (
    isAdminRoute(request) &&
    (await auth()).sessionClaims?.metadata?.role !== "admin"
  ) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
