import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, userEmail, userName, userPhone } = body;

    const secret = process.env.TOYYIBPAY_SECRET_KEY || "j3eykoye-lkcf-af90-dwcv-t0ad5e9d5ys8";
    const category = process.env.TOYYIBPAY_CATEGORY_CODE || "41559qlh";
    const toyyibUrl = process.env.TOYYIBPAY_URL || "https://toyyibpay.com";

    // Determine host for redirect URLs
    const origin = req.nextUrl.origin || "https://physflix.vercel.app";
    const orderId = `PFX-T5-${Date.now()}`;

    const returnUrl = `${origin}/api/payment/toyyibpay/return?userId=${encodeURIComponent(userId || "")}&email=${encodeURIComponent(userEmail || "")}&orderId=${encodeURIComponent(orderId)}`;
    const callbackUrl = `${origin}/api/payment/toyyibpay/callback`;

    const formData = new URLSearchParams({
      userSecretKey: secret,
      categoryCode: category,
      billName: "PhysFlix T5 SPM (1 Tahun)",
      billDescription: "Akses Penuh 29 Modul Video Fizik SPM Tingkatan 5",
      billPriceSetting: "1",
      billPayorInfo: "1",
      billAmount: "3000", // 3000 cents = RM 30.00
      billReturnUrl: returnUrl,
      billCallbackUrl: callbackUrl,
      billExternalReferenceNo: orderId,
      billTo: userName || "Pelajar Fizik SPM",
      billEmail: userEmail || "pelajar@physflix.com",
      billPhone: userPhone || "0123456789",
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
        orderId
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
