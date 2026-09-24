import { NextRequest, NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

export const DEV_TEST_EMAILS = [
  "ahalimroslan@gmail.com",
  "abdulhalimroslan@gmail.com",
  "g-41192875@moe-dl.edu.my",
  "aimkmb@gmail.com"
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, userEmail, userName, userPhone, isDevTest } = body;

    const emailClean = (userEmail || "").toLowerCase().trim();
    const isDev = DEV_TEST_EMAILS.includes(emailClean);

    // Validation for User Name and Phone Number (Wajib diisi secara manual)
    const cleanName = (userName || "").trim();
    let rawPhone = (userPhone || "").toString().trim().replace(/[-\s]/g, "");
    const phoneDigits = rawPhone.replace(/\D/g, "");

    if (!cleanName || cleanName.length < 3) {
      return NextResponse.json(
        { error: "Sila masukkan nama penuh anda (sekurang-kurangnya 3 huruf)." },
        { status: 400 }
      );
    }

    if (!phoneDigits || phoneDigits.length < 10 || !phoneDigits.startsWith("01")) {
      return NextResponse.json(
        { error: "Sila masukkan nombor telefon yang sah (contoh: 0123456789 atau 01112345678)." },
        { status: 400 }
      );
    }

    const cleanPhone = phoneDigits;

    // Save/update phone number and full name in Supabase profiles table if available
    if (isSupabaseConfigured && userId) {
      try {
        await supabase
          .from("profiles")
          .update({
            display_name: cleanName,
            phone_number: cleanPhone,
          })
          .eq("id", userId);
      } catch (err) {
        console.warn("Could not save phone_number to profile:", err);
      }
    }

    const secret = process.env.TOYYIBPAY_SECRET_KEY || "j3eykoye-lkcf-af90-dwcv-t0ad5e9d5ys8";
    const category = process.env.TOYYIBPAY_CATEGORY_CODE || "41559qlh";
    const toyyibUrl = process.env.TOYYIBPAY_URL || "https://toyyibpay.com";

    // Determine host for redirect URLs
    const origin = req.nextUrl.origin || "https://physflix.vercel.app";
    const orderId = isDev ? `DEV-T5-${Date.now()}` : `PFX-T5-${Date.now()}`;

    const returnUrl = `${origin}/api/payment/toyyibpay/return?userId=${encodeURIComponent(userId || "")}&email=${encodeURIComponent(userEmail || "")}&orderId=${encodeURIComponent(orderId)}`;
    const callbackUrl = `${origin}/api/payment/toyyibpay/callback`;

    // 199 cents (RM 1.99) for developer accounts, 3000 cents (RM 30.00) for public
    const billAmountCents = isDev ? "199" : "3000";
    const billName = isDev ? "PhysFlix T5 SPM (Ujian Dev)" : "PhysFlix T5 SPM (1 Tahun)";
    const billDescription = isDev 
      ? "Ujian Transaksi FPX Pembangun PhysFlix" 
      : "Akses Penuh 29 Modul Video Fizik SPM Tingkatan 5";

    const formData = new URLSearchParams({
      userSecretKey: secret,
      categoryCode: category,
      billName: billName,
      billDescription: billDescription,
      billPriceSetting: "1",
      billPayorInfo: "1",
      billAmount: billAmountCents,
      billReturnUrl: returnUrl,
      billCallbackUrl: callbackUrl,
      billExternalReferenceNo: orderId,
      billTo: cleanName,
      billEmail: emailClean || "pelajar@physflix.com",
      billPhone: cleanPhone,
      billPaymentChannel: "0" // FPX
    });

    const response = await fetch(`${toyyibUrl}/index.php/api/createBill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "PhysFlix/1.0"
      },
      body: formData.toString()
    });

    const rawText = await response.text();
    let data;
    try {
      data = JSON.parse(rawText);
    } catch (e) {
      console.error("Failed to parse ToyyibPay response:", rawText);
      return NextResponse.json(
        { error: "Ralat format dari ToyyibPay", details: rawText },
        { status: 502 }
      );
    }

    if (Array.isArray(data) && data[0]?.BillCode) {
      const billCode = data[0].BillCode;
      const paymentUrl = `${toyyibUrl}/${billCode}`;
      return NextResponse.json({
        success: true,
        billCode,
        paymentUrl,
        orderId,
        amount: isDev ? "RM 1.99" : "RM 30.00",
        isDev
      });
    }

    if (data?.status === "error") {
      return NextResponse.json(
        { error: data.msg || "Gagal mencipta bil ToyyibPay" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Maklum balas tidak dijangka dari ToyyibPay", raw: data },
      { status: 500 }
    );

  } catch (error: any) {
    console.error("ToyyibPay createBill API error:", error);
    return NextResponse.json(
      { error: error.message || "Ralat pelayan dalaman" },
      { status: 500 }
    );
  }
}
