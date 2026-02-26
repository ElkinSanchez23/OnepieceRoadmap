"use client";

import { useTranslations } from "next-intl";
import Background from "@/components/generalComponents/background";
import ButtonRedirect from "@/components/generalComponents/button";
import { ScrollFeature } from "@/components/generalComponents/scrollFeature";
import OnePiece from "@/assets/generalImages/onePieceRoadMap.png";
import Mugis from "@/assets/generalImages/mugis.png";
import GeneralOnepiece from "@/assets/generalImages/one_Piece.png";
import LogoutButton from "@/components/authComponents/logoutButton";

const Home = () => {
  const t = useTranslations("home");

  return (
    <Background image={GeneralOnepiece}>
      <main
        className="flex justify-center items-center min-h-screen px-4 sm:px-6 md:px-8"
        role="main"
        aria-labelledby="home-title"
      >
        <h1 id="home-title" className="sr-only">
          {t("screenReaderTitle", {
            default: "Página principal de la app One Piece",
          })}
        </h1>

        <div className="fixed top-4 left-4 z-[1000]">
          <LogoutButton aria-label={t("logout")} />
        </div>

        <ScrollFeature
          title={t("welcomeTitle")}
          text={t("welcomeText")}
          imageUrl={OnePiece.src}
          bottomImageUrl={Mugis.src}
        >
          <div className="flex justify-center">
            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 w-full max-w-md sm:max-w-none">
              <ButtonRedirect
                text={t("startAdventure")}
                route="/map"
                className="w-full sm:w-auto"
              />
              <ButtonRedirect
                text={t("chooseSaga")}
                route="/sagas"
                className="w-full sm:w-auto"
              />
              <ButtonRedirect
                text={t("mugiwaras")}
                route="/characters"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </ScrollFeature>
      </main>
    </Background>
  );
};

export default Home;
