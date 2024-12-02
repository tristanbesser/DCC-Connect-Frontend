import CoverageOptions from "./coverageOptions";

export default interface CoverageRequest {
    shiftID: string,
    coverageType: CoverageOptions,
    note?: string | null,
    id: string
}
