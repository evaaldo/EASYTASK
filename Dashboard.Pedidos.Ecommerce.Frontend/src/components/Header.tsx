export function Header() {
  return (
    <header className="relative text-center py-6 sm:py-8 px-4 sm:px-10">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
        Gestão de Pedidos
      </h1>
      <h2 className="text-lg sm:text-xl md:text-2xl mt-1 mb-4">
        3corações
      </h2>
      <img
        src="logo-3c.png"
        alt="Logo da 3corações"
        className="w-12 sm:w-16 md:w-20 absolute right-4 sm:right-10 top-3 sm:top-7"
      />
    </header>
  );
}
