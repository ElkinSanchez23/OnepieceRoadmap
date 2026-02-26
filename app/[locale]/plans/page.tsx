'use client';

import { useTranslations } from "next-intl";
import { PricingPlan } from "@/components/plansComponets/pricingPlan";
import { useCurrency } from "@/hooks/useCurrency";
import { getPlansData } from "@/data/getPlanData";

export default function PlansPage() {
  const t = useTranslations('plans');
  const { formatPrice } = useCurrency();
  const plans = getPlansData(t, formatPrice);

  return (
    <main
      className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 p-10"
      aria-labelledby="plans-heading"
    >
      <h1
        id="plans-heading"
        className="text-4xl font-bold text-white text-center mb-10"
      >
        {t("choosePlan")}
      </h1>

      <section
        aria-label={t("choosePlan")}
        role="region"
        className="grid md:grid-cols-3 gap-6"
      >
        {plans.map((plan, index) => (
          <div key={index} tabIndex={0}>
            <PricingPlan
              title={plan.title}
              price={plan.price}
              features={plan.features}
              highlight={plan.highlight}
              buttonText={t('select')}
            />
          </div>
        ))}
      </section>
    </main>
  );
}
