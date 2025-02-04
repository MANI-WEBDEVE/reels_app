import withAuth from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next()
    },
    {
        callbacks:{
            authorized:({token, req})=>{
                const {pathname} = req.nextUrl
                // allowed auth related paths
                if (pathname.startsWith("/api/auth") || pathname === "/login" || pathname === "register") {
                    return true
                }

                // public route
                if(pathname === '/' || pathname.startsWith("/api/videos")){
                    return true
                }

                return !!token
            }
        }
    }
)

export const config = {
    matcher: ["/api/auth/:path*", "/login", "/register", "/"]
}