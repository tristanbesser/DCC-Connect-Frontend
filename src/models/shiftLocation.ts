import type { Address } from "./address";

export default interface ShiftLocation  {
    id: string;
    streetAddress: Address;
    patientName?: string|null;
  };
  