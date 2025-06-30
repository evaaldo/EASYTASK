import { Formulario } from "../components/Formulario";
import { Header } from "../components/Header";
import Sidebar from "../components/Sidebar";

export function CriarPedido() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6 md:p-10 overflow-auto">
          <Formulario />
        </main>
      </div>
    </div>
  )
}
