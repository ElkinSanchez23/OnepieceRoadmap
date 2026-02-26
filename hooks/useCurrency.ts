import { useLocale } from "next-intl";
import { useMemo } from "react";

export const useCurrency = () => {
  const locale = useLocale();

  const currency = useMemo(() => {
    switch (locale) {
      case "es":
        return "COP";
      case "fr":
      case "de":
        return "EUR";
      case "jp":
        return "JPY";
      default:
        return "USD";
    }
  }, [locale]);

  const conversionRates: Record<string, number> = {
    USD: 1,
    COP: 4000,
    EUR: 0.92,
    JPY: 155,
  };

  const currencySymbols: Record<string, string> = {
    USD: "$",
    COP: "$",
    EUR: "€",
    JPY: "¥",
  };

  const formatPrice = (usdPrice: number) => {
    const converted = usdPrice * conversionRates[currency];
    const rounded = currency === "COP" ? Math.round(converted) : converted.toFixed(2);
    return `${currencySymbols[currency]}${rounded}`;
  };

  return { currency, formatPrice };
};
