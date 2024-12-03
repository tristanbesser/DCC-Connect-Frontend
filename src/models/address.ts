export type Address = {
    streetAddress: string;
    apartmentNumber?: string | null;
    city: string;
    state: string;
    postalCode: string;
    country: string;
};

export function formatAddress(address: Address): string { const { streetAddress, apartmentNumber, city, state, postalCode } = address; return `${streetAddress}${apartmentNumber ? ', ' + apartmentNumber : ''}, ${city}, ${state} ${postalCode}`; }