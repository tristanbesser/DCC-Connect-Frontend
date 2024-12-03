export default interface Shift {
    shiftPeriod: {
        start: Date;
        end: Date;
    };
    location: string;
    requiredRole: string;
    employeeID: string | null;
    id: string;
}