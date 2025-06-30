import { Bag, CurrencyDollarSimple, ShoppingCart } from "phosphor-react";
import type { CardType } from "./interfaces/CardType";

export function Card(card: CardType)
{
    return (
        <div className="bg-white px-10 py-12 rounded-xl flex flex-row justify-center items-center gap-8 shadow-xl">
            {
                card.type === "currency" ? (
                    <div className="bg-[#0CA47B] p-4 text-white rounded-full">
                        <CurrencyDollarSimple size={50} />
                    </div>
                ) : card.type === "amount" ? (
                    <div className="bg-[#8D4AFF] p-4 text-white rounded-full">
                        <ShoppingCart size={50} />
                    </div>
                ) : (
                    <div className="bg-[#5C5CDA] p-4 text-white rounded-full">
                        <Bag size={50} />
                    </div>
                )
            }
            <div className="flex flex-col gap-3">
                <h2 className="text-2xl font-semibold text-start">{ card.label }</h2>
                {
                    card.type === "currency" ? (
                        <span className="text-4xl font-semibold text-[#0CA47B]">
                        R$ {card.value}
                        </span>
                    ) : card.type === "amount" ? (
                        <span className="text-4xl font-semibold text-[#8D4AFF]">
                        {card.value} UN
                        </span>
                    ) : (
                        <span className="text-4xl font-semibold text-[#5C5CDA]">
                        {card.value}
                        </span>
                    )
                }
            </div>
        </div>
    );
};