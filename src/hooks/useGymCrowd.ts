/**
 * useGymCrowd.ts
 * ------------------------------------------------------------------
 * Hook: berapa orang di gym sekarang + status keramaiannya.
 * Dipakai di dashboard member dan dashboard admin, jadi angkanya
 * selalu sama di dua sisi.
 *
 *   jumlah = check-in nyata di aplikasi + angka simulasi (placeholder)
 *
 * NANTI: kalau server sudah menghitung jumlah orang, hapus bagian
 * simulasi dan pakai angka dari server saja.
 */
import { useGym } from "@/context/GymContext";
import { useCrowdCount } from "@/hooks/useCrowdCount";
import { CrowdInfo, getCrowdInfo } from "@/utils/gymHelpers";

export function useGymCrowd(): { count: number; info: CrowdInfo } {
  const { activeVisits } = useGym();
  const simulatedOthers = useCrowdCount(); // PLACEHOLDER

  const count = activeVisits.length + simulatedOthers;
  return { count, info: getCrowdInfo(count) };
}
