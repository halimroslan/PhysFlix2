import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const status = formData.get("status")?.toString(); // 1 = success
    const billcode = formData.get("billcode")?.toString() || "";
    const orderId = formData.get("order_id")?.toString() || "";
    const refno = formData.get("refno")?.toString() || "";
    const amount = formData.get("amount")?.toString() || "";

    console.log("ToyyibPay Webhook Callback Received:", { status, billcode, orderId, refno, amount });

    if (status === "1" && isSupabaseConfigured) {
      const now = new Date();
      const oneYearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

      // Record transaction into payments/orders if table exists, or update profile
      try {
        await supabase
          .from("profiles")
          .update({
            is_premium: true,
            premium_activated_at: now.toISOString(),
            premium_expires_at: oneYearLater.toISOString(),
            premium_billcode: billcode,
          })
          .eq("premium_order_id", orderId);
      } catch (err) {
        console.warn("Callback database sync notice:", err);
      }
    }

    // ToyyibPay expects 200 OK
    return new NextResponse("OK", { status: 200 });

  } catch (error) {
    console.error("Callback error:", error);
    return new NextResponse("Error", { status: 500 });
  }
}
