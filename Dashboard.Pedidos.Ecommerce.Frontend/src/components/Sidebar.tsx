import { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ChartBar, CheckCircle, PlusCircle } from 'phosphor-react'

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const toggleSidebar = () => setIsOpen(prev => !prev)
  const isActive = (path: string) => location.pathname === path

  return (
    <nav
      className={`
        fixed top-0 left-0 h-screen flex flex-col justify-between bg-white shadow-lg transition-all duration-500 z-10
        ${isOpen ? 'w-[250px]' : 'w-[100px]'}
        rounded-r-[18px]
      `}
    >
      <div className="p-3">
        <div className="flex items-center gap-2 mb-6">
          <img
            src="pf-pic.png"
            alt="Avatar"
            className="w-[50px] h-[50px] object-cover rounded-[20px]"
          />
          <div className="flex flex-col">
            <span className={`text-sm whitespace-nowrap overflow-hidden transition-all duration-500 ${isOpen ? 'w-[150px] h-auto' : 'w-0 h-0'}`}>
              Evaldo Rodrigues
            </span>
            <span className={`text-xs text-gray-500 whitespace-nowrap overflow-hidden transition-all duration-500 ${isOpen ? 'w-[150px] h-auto' : 'w-0 h-0'}`}>
              TI
            </span>
          </div>
        </div>

        <ul className="flex flex-col gap-2">
        {[
            { path: '/', icon: <ChartBar size={32} />, label: 'Dashboard' },
            { path: '/criarPedido', icon: <PlusCircle size={32} />, label: 'Criar Pedido' },
            { path: '/finalizarPedido', icon: <CheckCircle size={32} />, label: 'Finalizar Pedido' }
        ].map(item => (
            <li
            key={item.path}
            className={`
                rounded-lg py-3 px-2 cursor-pointer transition-colors
                ${isActive(item.path)
                ? 'bg-[#5C5CDA] text-white'
                : 'hover:bg-blue-100 text-black'}
            `}
            >
            <Link
                to={item.path}
                className={`
                flex items-center transition-all duration-300
                ${isOpen ? 'justify-start gap-3' : 'justify-center'}
                `}
            >
                <div className="flex items-center justify-center">
                {item.icon}
                </div>
                <span
                className={`
                    whitespace-nowrap overflow-hidden transition-all duration-500 text-lg
                    ${isOpen ? 'w-[150px] h-auto opacity-100' : 'w-0 h-0 opacity-0'}
                `}
                >
                {item.label}
                </span>
            </Link>
            </li>
        ))}
        </ul>

        <button
          onClick={toggleSidebar}
          className="absolute top-[30px] -right-[15px] w-[30px] h-[30px] bg-[#5C5CDA]  text-white rounded-full flex items-center justify-center cursor-pointer"
        >
          {isOpen ? <ArrowLeft size={16} /> : <ArrowRight size={16} />}
        </button>
      </div>
    </nav>
  )
}
