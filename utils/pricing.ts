type Currency = "USD" | "COP" | "EUR" | "JPY";

const currencyConfig: Record<Currency, { rate: number; symbol: string; round: boolean }> = {
  USD: { rate: 1, symbol: "$", round: false },
  COP: { rate: 4000, symbol: "$", round: true },
  EUR: { rate: 0.92, symbol: "€", round: false },
  JPY: { rate: 155, symbol: "¥", round: false },
};

const langToCurrency: Record<string, Currency> = {
  es: "COP",
  fr: "EUR",
  de: "EUR",
  jp: "JPY",
};

export const getPricesByLanguage = (lang: string) => {
  const currency: Currency = langToCurrency[lang] ?? "USD";
  const { rate, symbol, round } = currencyConfig[currency];

  const formatPrice = (usd: number) => {
    const value = usd * rate;
    const price = round ? Math.round(value) : value.toFixed(2);
    return `${symbol}${price}`;
  };

  return {
    currency,
    plans: {
      basic: formatPrice(0),
      standard: formatPrice(4.99),
      premium: formatPrice(9.99),
    },
  };
};
