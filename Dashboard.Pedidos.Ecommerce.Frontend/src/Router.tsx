import { Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { CriarPedido } from "./pages/CriarPedido";
import { FinalizarPedido } from "./pages/FinalizarPedido";

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/criarPedido" element={<CriarPedido />} />
            <Route path="/finalizarPedido" element={<FinalizarPedido />} />
        </Routes>
    );
};