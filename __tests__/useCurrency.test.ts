import { renderHook } from "@testing-library/react";
import { useCurrency } from "@/hooks/useCurrency";

jest.mock("next-intl", () => ({
  useLocale: jest.fn(),
}));

const mockedUseLocale = jest.requireMock("next-intl").useLocale;

describe("useCurrency", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("retorna COP para 'es'", () => {
    mockedUseLocale.mockReturnValue("es");

    const { result } = renderHook(() => useCurrency());

    expect(result.current.currency).toBe("COP");
    expect(result.current.formatPrice(1)).toBe("$4000");
  });

  it("retorna EUR para 'fr'", () => {
    mockedUseLocale.mockReturnValue("fr");

    const { result } = renderHook(() => useCurrency());

    expect(result.current.currency).toBe("EUR");
    expect(result.current.formatPrice(10)).toBe("€9.20");
  });

  it("retorna JPY para 'jp'", () => {
    mockedUseLocale.mockReturnValue("jp");

    const { result } = renderHook(() => useCurrency());

    expect(result.current.currency).toBe("JPY");
    expect(result.current.formatPrice(2)).toBe("¥310.00");
  });

  it("retorna USD para locales no conocidos", () => {
    mockedUseLocale.mockReturnValue("it");

    const { result } = renderHook(() => useCurrency());

    expect(result.current.currency).toBe("USD");
    expect(result.current.formatPrice(5)).toBe("$5.00");
  });
});
