import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const statusId = searchParams.get("status_id"); // 1: Success, 2: Pending, 3: Failed
    const billcode = searchParams.get("billcode") || "";
    const orderId = searchParams.get("order_id") || searchParams.get("orderId") || "";
    const userId = searchParams.get("userId") || "";
    const email = searchParams.get("email") || "";

    const origin = req.nextUrl.origin || "https://physflix.vercel.app";

    if (statusId === "1") {
      // Payment Successful!
      if (isSupabaseConfigured) {
        try {
          const now = new Date();
          const oneYearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

          if (userId) {
            await supabase
              .from("profiles")
              .update({
                is_premium: true,
                premium_activated_at: now.toISOString(),
                premium_expires_at: oneYearLater.toISOString(),
                premium_billcode: billcode,
                premium_order_id: orderId,
              })
              .eq("id", userId);
          } else if (email) {
            await supabase
              .from("profiles")
              .update({
                is_premium: true,
                premium_activated_at: now.toISOString(),
                premium_expires_at: oneYearLater.toISOString(),
                premium_billcode: billcode,
                premium_order_id: orderId,
              })
              .eq("email", email);
          }
        } catch (dbError) {
          console.error("Database update error on payment return:", dbError);
        }
      }

      // Redirect student to home with payment=success so frontend triggers instant unlock
      const redirectUrl = new URL("/", origin);
      redirectUrl.searchParams.set("payment", "success");
      redirectUrl.searchParams.set("billcode", billcode);
      redirectUrl.searchParams.set("order_id", orderId);
      return NextResponse.redirect(redirectUrl);
    } else {
      // Payment Pending or Failed
      const redirectUrl = new URL("/", origin);
      redirectUrl.searchParams.set("payment", statusId === "2" ? "pending" : "failed");
      redirectUrl.searchParams.set("billcode", billcode);
      return NextResponse.redirect(redirectUrl);
    }

  } catch (error) {
    console.error("Return route error:", error);
    const origin = req.nextUrl.origin || "https://physflix.vercel.app";
    return NextResponse.redirect(new URL("/?payment=error", origin));
  }
}
