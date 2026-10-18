/**
 * perpanjang.tsx  (halaman PERPANJANG MEMBERSHIP, alamat "/perpanjang")
 * ------------------------------------------------------------------
 * Alur:
 *   1. Member memilih paket (1 / 3 / 6 / 12 bulan)       -> useState
 *   2. Tanggal baru langsung terlihat sebagai pratinjau
 *   3. BAYAR -> payForMembership() (services/paymentService.ts)
 *      -> kalau sukses, masa berlaku diperbarui
 *      -> router.replace() membuka halaman sukses MENGGANTIKAN halaman
 *         ini (jadi tombol back tidak kembali ke form pembayaran).
 *   4. BATAL -> router.back()
 *
 * Pembayarannya masih PLACEHOLDER. Ganti isi paymentService.ts dengan
 * payment gateway; halaman ini tidak perlu diubah.
 */
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { FadeInView } from "@/components/ui/FadeInView";
import { PressableScale } from "@/components/ui/PressableScale";
import { Screen } from "@/components/ui/Screen";
import { MEMBERSHIP_PLANS } from "@/const/gymConfig";
import { useGym } from "@/context/GymContext";
import { useTheme, useThemedStyles } from "@/context/ThemeContext";
import { payForMembership } from "@/services/paymentService";
import { createCommonStyles } from "@/styles/common_styles";
import { createStyles } from "@/styles/perpanjang_styles";
import { formatISODate, getExtendedDate } from "@/utils/dateHelpers";
import { formatRupiah, getMembershipStatus } from "@/utils/gymHelpers";

export default function PerpanjangScreen() {
  const router = useRouter();
  const s = useThemedStyles(createStyles);
  const common = useThemedStyles(createCommonStyles);
  const { colors } = useTheme();
  const { currentMember, extendMembership } = useGym();

  // useState: paket yang dipilih, sedang membayar atau tidak, pesan error
  const [selectedId, setSelectedId] = useState<string>(MEMBERSHIP_PLANS[0].id);
  const [paying, setPaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Paket terpilih + tanggal berlaku barunya (pratinjau)
  const selectedPlan =
    MEMBERSHIP_PLANS.find((p) => p.id === selectedId) ?? MEMBERSHIP_PLANS[0];
  const newDate = getExtendedDate(currentMember.validUntil, selectedPlan.months);
  const status = getMembershipStatus(currentMember.validUntil);

  async function handlePay() {
    setPaying(true);
    setError(null);

    try {
      const result = await payForMembership({
        memberId: currentMember.id,
        plan: selectedPlan,
      });

      if (!result.success) {
        setError(result.message ?? "Pembayaran gagal. Coba lagi.");
        setPaying(false);
        return;
      }

      // Pembayaran berhasil -> perbarui masa berlaku
      extendMembership(currentMember.id, selectedPlan.months);
      // replace: ganti halaman ini dengan halaman sukses (tidak menumpuk)
      router.replace({
        pathname: "/perpanjang-sukses",
        params: { plan: selectedPlan.label },
      });
    } catch {
      setError("Terjadi kesalahan. Periksa koneksi lalu coba lagi.");
      setPaying(false);
    }
  }

  return (
    <Screen>
      {/* ---------- Ringkasan masa berlaku ---------- */}
      <FadeInView>
        <View style={s.summaryCard}>
          <Text style={s.summaryLabel}>BERLAKU HINGGA</Text>
          <Text style={s.summaryValue}>
            {formatISODate(currentMember.validUntil)}
            {!status.isActive ? " (berakhir)" : ""}
          </Text>
          <Text style={s.summaryNew}>
            Setelah perpanjang: {formatISODate(newDate)}
          </Text>
        </View>
      </FadeInView>

      {/* ---------- Pilihan paket ---------- */}
      <FadeInView delay={100}>
        <View style={common.card}>
          <View style={common.sectionHeader}>
            <Text style={common.sectionHeaderText}>Pilih Paket</Text>
          </View>

          {MEMBERSHIP_PLANS.map((plan) => {
            const isSelected = plan.id === selectedId;
            return (
              <PressableScale
                key={plan.id}
                onPress={() => setSelectedId(plan.id)}
                disabled={paying}
                scaleTo={0.98}
                style={[s.planCard, isSelected && s.planCardSelected]}
              >
                <View style={[s.radio, isSelected && s.radioSelected]}>
                  {isSelected && <View style={s.radioDot} />}
                </View>
                <View style={s.planTextWrap}>
                  <Text style={s.planLabel}>{plan.label}</Text>
                  {plan.note && <Text style={s.planNote}>{plan.note}</Text>}
                </View>
                <Text style={s.planPrice}>{formatRupiah(plan.price)}</Text>
              </PressableScale>
            );
          })}
        </View>
      </FadeInView>

      {error && <Text style={common.note}>{error}</Text>}

      {/* ---------- Tombol ---------- */}
      <View style={common.buttonRow}>
        {/* back: kembali ke halaman sebelumnya (home) */}
        <PressableScale
          onPress={() => router.back()}
          disabled={paying}
          style={[common.secondaryButton, common.grow1, paying && common.disabled]}
        >
          <Text style={common.secondaryButtonText}>BATAL</Text>
        </PressableScale>
        <PressableScale
          onPress={handlePay}
          disabled={paying}
          style={[common.primaryButton, common.grow2, paying && common.disabled]}
        >
          {paying ? (
            <ActivityIndicator color={colors.ctaText} />
          ) : (
            <Text style={common.primaryButtonText}>
              BAYAR {formatRupiah(selectedPlan.price)}
            </Text>
          )}
        </PressableScale>
      </View>
    </Screen>
  );
}
