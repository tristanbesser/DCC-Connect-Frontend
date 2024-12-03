import type Employee from "../employee";
import type Shift from "../shift";
import type CoverageRequest from "./coverageRequest";

export default interface CoverageRequestDetail{
    coverageRequest:CoverageRequest,
    shift:Shift,
    employee:Employee
}