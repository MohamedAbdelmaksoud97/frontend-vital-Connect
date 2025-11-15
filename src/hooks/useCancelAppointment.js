import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelAppointment as cancelAppointmentAPI } from "@/services/appointments";

/**
 * @param {object} opts
 * @param {Array}  opts.refetchKey Optional: EXACT query key used by useMyAppointments
 *                                 e.g. ["appointments:me", { page, limit, sort }]
 */
export function useCancelAppointment({ refetchKey } = {}) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (appointmentId) => cancelAppointmentAPI(appointmentId),
    onSuccess: () => {
      // Invalidate the exact list we're showing (if provided)
      if (refetchKey) qc.invalidateQueries({ queryKey: refetchKey });
      // And also invalidate the whole family just in case
      qc.invalidateQueries({ queryKey: ["appointments:me"] });
    },
  });
}
