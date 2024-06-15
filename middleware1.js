// import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

// export function middleware(req, event) {
//   const { pathname, origin } = req.nextUrl;

//   console.log({
//     pathname,
//     origin
//   })

//   console.log('localstoreage', localStorage.getItem('key'))
//   if (pathname === '/auth/login') {
//     return NextResponse.rewrite(`${origin}${pathname}`); // redirect
//   } else {
//     console.log('In middleware');
//   }

//   const token = req.headers['Authorization']; // can get the token from localstorage or cookies too

//   // const isLoggedIn = validate(token) // an api to backend ,this will return true or false based on auth token.

//   // if (isLoggedIn) {

//   //   return new Response("Access granted");

//   // } else {

//     // return event.responseWith(NextResponse.redirect("/auth/login")); // redirect

//   // }
// }