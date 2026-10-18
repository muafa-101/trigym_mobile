/**
 * paymentService.ts
 * ------------------------------------------------------------------
 * Pintu masuk SEMUA urusan pembayaran. Halaman perpanjang hanya
 * memanggil `payForMembership()` dan tidak peduli bagaimana bayarnya.
 *
 * SAAT INI (PLACEHOLDER): pura-pura bayar, menunggu 1,2 detik lalu
 * selalu sukses.
 *
 * NANTI (payment gateway, misalnya Midtrans / Xendit), alurnya kira-kira:
 *   1. App kirim "member X mau beli paket Y" ke server kamu.
 *   2. Server membuat transaksi di gateway, lalu mengembalikan
 *      token / link pembayaran.
 *   3. App membuka link itu (WebView atau browser) untuk member bayar.
 *   4. Gateway memberi tahu SERVER bahwa pembayaran sukses (webhook).
 *   5. Server memperbarui masa berlaku membership, app mengambil data baru.
 * Yang perlu diganti hanya isi fungsi di bawah. Halaman tidak berubah.
 *
 * Catatan keamanan: secret key gateway TIDAK BOLEH ditaruh di app.
 * Simpan di server.
 */
import { MembershipPlan } from "@/types/gym";

export interface PaymentRequest {
  memberId: string;
  plan: MembershipPlan;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string; // nomor transaksi dari gateway
  message?: string; // alasan kalau gagal
}

export async function payForMembership(
  request: PaymentRequest,
): Promise<PaymentResult> {
  // PLACEHOLDER: simulasi menunggu proses pembayaran
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return {
    success: true,
    transactionId: `DEMO-${request.memberId}-${Date.now()}`,
  };
}
