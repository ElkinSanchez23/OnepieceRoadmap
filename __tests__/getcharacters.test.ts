import api from "@/services/api";
import { getCharacterById } from "@/services/getCharacters";

jest.mock("@/services/api");
const mockedApi = api as jest.Mocked<typeof api>;

describe("getCharacters", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("getCharacterById llama al endpoint correcto y transforma el dato", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        id: 1,
        name: "Monkey D. Luffy",
        job: "Captain",
        size: "1.74m",
        age: "19",
        bounty: "3,000,000,000",
        status: "Alive",
        crew: {
          id: 1,
          name: "Straw Hat Pirates",
          roman_name: "Mugiwara",
          total_prime: "8,000,000,000",
          is_yonko: true,
        },
        fruit: {
          id: 1,
          name: "Gomu Gomu no Mi",
          type: "Paramecia",
          filename: "gomu.png",
          roman_name: "GomuGomu",
          description: "Makes body rubbery",
        },
      },
    });

    const result = await getCharacterById(1, "en");

    expect(mockedApi.get).toHaveBeenCalledWith("/characters/en/1");
    expect(result).toEqual({
      id: 1,
      name: "Monkey D. Luffy",
      job: "Captain",
      size: "1.74m",
      age: "19",
      bounty: "3,000,000,000",
      status: "Alive",
      crew: {
        id: 1,
        name: "Straw Hat Pirates",
        roman_name: "Mugiwara",
        total_prime: "8,000,000,000",
        is_yonko: true,
      },
      fruit: {
        id: 1,
        name: "Gomu Gomu no Mi",
        type: "Paramecia",
        filename: "gomu.png",
        roman_name: "GomuGomu",
        description: "Makes body rubbery",
      },
    });
  });

  it("retorna null si la llamada falla", async () => {
    mockedApi.get.mockRejectedValueOnce(new Error("API error"));
    const result = await getCharacterById(999);
    expect(result).toBeNull();
  });

  it("usa 'en' por defecto si el idioma no es válido", async () => {
    mockedApi.get.mockResolvedValueOnce({
      data: {
        id: 2,
        name: "Zoro",
        job: "Swordsman",
        size: "1.78m",
        age: "21",
        bounty: "1,111,000,000",
        status: "Alive",
        crew: {},
      },
    });

    await getCharacterById(2, "jp");
    expect(mockedApi.get).toHaveBeenCalledWith("/characters/en/2");
  });
});

