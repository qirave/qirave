export const UNITS = ['unit', 'mm', 'cm', 'm', 'kg', 'g', 'l', 'ml'] as const;

export type UnitType = (typeof UNITS)[number];
export default UNITS;
