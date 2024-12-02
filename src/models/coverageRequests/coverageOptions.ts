enum CoverageOptions {
    PickupOnly = 0,
    TradeOnly = 1,
    PickupOrTrade = 2
}
export function coverageTypeToString(coverageType: CoverageOptions) {
    switch (coverageType) {
        case CoverageOptions.PickupOnly:
            return "Pickup"
        case CoverageOptions.TradeOnly:
            return "Trade"
        case CoverageOptions.PickupOrTrade:
            return "Pickup/Trade"
    }
}
export default CoverageOptions;