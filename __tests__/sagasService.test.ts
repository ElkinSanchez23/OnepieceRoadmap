import api from "@/services/api";
import {
  getSagaById,
  getCharactersBySagaId,
} from "@/services/sagasService";

jest.mock("@/services/api");

const mockedApi = api as jest.Mocked<typeof api>;

describe("sagasService", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getSagaById llama al endpoint correcto", async () => {
    mockedApi.get.mockResolvedValueOnce({ data: { id: 1, name: "East Blue" } });

    const result = await getSagaById(1, "en");

    expect(mockedApi.get).toHaveBeenCalledWith("/sagas/en/1");
    expect(result).toEqual({ id: 1, name: "East Blue" });
  });

  it('getCharactersBySagaId limita correctamente si se pasa "limit"', async () => {
    const mockData = [
      { id: 1, name: "Luffy" },
    ];

    mockedApi.get.mockResolvedValueOnce({ data: mockData });

    const result = await getCharactersBySagaId(1, "en", 2);

    expect(mockedApi.get).toHaveBeenCalledWith("/characters/en", {
      params: { saga: 1 },
    });

    expect(result).toEqual(mockData.slice(0, 2));
  });
});
