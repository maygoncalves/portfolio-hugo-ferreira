import { createBrowserRouter } from "react-router";
import HomePage from "./components/HomePage";
import SobrePage from "./components/SobrePage";
import ServicosPage from "./components/ServicosPage";
import GaleriaPage from "./components/GaleriaPage";
import ContatoPage from "./components/ContatoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/sobre",
    Component: SobrePage,
  },
  {
    path: "/servicos",
    Component: ServicosPage,
  },
  {
    path: "/galeria",
    Component: GaleriaPage,
  },
  {
    path: "/contato",
    Component: ContatoPage,
  },
  {
    path: "*",
    Component: HomePage,
  },
]);