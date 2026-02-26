
export const getPlansData = (t: (key:string)=> string, formatPrice: (usd: number) => string) => [
  {
    title: t("basic"),
    price: formatPrice(0),
    features: [t("limitedAccess"), t("ads"), t("readOnly")],
  },
  {
    title: t("standard"),
    price: `${formatPrice(4.99)} / ${t("month")}`,
    features: [t("fullAccess"), t("noAds"), t("favorites")],
    highlight: true,
  },
  {
    title: t("premium"),
    price: `${formatPrice(9.99)} / ${t("month")}`,
    features: [t("allIncluded"), t("prioritySupport"), t("earlyAccess")],
  },
];
