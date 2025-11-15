import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAppointment } from "@/services/appointments";
import toast from "react-hot-toast";

export function useCreateAppointment() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      // keep it simple; refresh the "my appointments" list if present
      //qc.invalidateQueries({ queryKey: ["appointments:me"] });
      qc.invalidateQueries({ queryKey: ["appointments"] });
      toast.success("Appointment created successfully");
    },
  });
}
