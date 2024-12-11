type Unit = "metre" | "millimetre" | "mile" | "foot";

interface ConversionHistory {
  value: string;
  fromUnit: string;
  toUnit: string;
  result: string;
}

export type { Unit, ConversionHistory };
