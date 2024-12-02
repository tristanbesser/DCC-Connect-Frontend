export default interface CoverageRequestQueryParams {
    startAvailability?: Date;
    endAvailability?: Date;
    tradesOnly?: boolean;
    pickupsOnly?: boolean;
    requiredRole?: string;
    employeeID?: string;
}