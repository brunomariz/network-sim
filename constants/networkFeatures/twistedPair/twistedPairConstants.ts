import { elementSize } from "../networkFeatureConstants";

// Max length for Cat5 or Cat6 Ethernet cables: 100 m
const maxLengthMeters = 100;
// divide by element size to get max length in elements [m/el]
export const maxLenghtElements = maxLengthMeters / elementSize;
// Max length for Cat5 or Cat6 Ethernet cables: 100 m
// divide by element size to get max length in elements [m/el]
// BER (bit error rate) per 100 m is assumed to be 10^-6 for twisted pair [/m]
export const berPerMaxLength = 10 ** -6;
// Calculate BER per element (ber for each element to ammount to the berPerMaxLength
// after travelling maxLength elements)
export const berPerElement = berPerMaxLength / maxLenghtElements;
