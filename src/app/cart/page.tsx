//src/app/cart/page.tsx

'use client'

import { useContext, useState } from "react";
import { CartContext } from "@/contexts/cartContext"; 
import type { Post as ProductProps } from "@/app/types/info";
import Link from "next/link"; 
import toast from "react-hot-toast";

export default function Cart() {
  const { addItem, cart, removeItem, final, total } = useContext(CartContext);

  const [showModal, setShowModal] = useState(false);

  function adicionar(item: ProductProps) {
    addItem(item);
  }

  function remover(item: ProductProps) {
    removeItem(item);
  }

  async function confirmarCompra() {
    setShowModal(false);

    toast.promise(
      final(cart),
      {
        loading: "Finalizando compra...",
        success: <b>Compra finalizada com sucesso!</b>,
        error: <b>Erro ao finalizar a compra.</b>,
      }
    );
  }

  return (
    <div>
      {cart.length > 0 ? (
        <div>
          <h1 className="text-2xl font-bold text-center p-5">Carrinho</h1>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold p-5">Seu carrinho está vázio</h1>
          <p className="p-5">Adicione produtos ao seu carrinho!</p>
          <Link href="/" className="bg-zinc-500 text-white p-3 rounded">
            Adicionar Produtos
          </Link>
        </div>
      )}

      <main className="px-4 max-w-7xl mx-auto">
        {cart.map((item) => (
          <section
            className="flex items-center justify-between w-full mx-auto"
            key={item.id}
          >
            <div className="flex items-center gap-10">
              <Link href={`/produts/${item.id}`}>
                <img src={item.img} alt={item.title} className="w-50" />
              </Link>
              <div>
                <Link href={`/produts/${item.id}`}>
                  <strong>{item.title}</strong>
                </Link>

                <p>
                  Price:{" "}
                  {item.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>

                <strong>
                  Subtotal:{" "}
                  {item.total.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </strong>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                className="bg-zinc-700 text-white px-2"
                onClick={() => remover(item)}
              >
                -
              </button>
              {item.amount}
              <button
                className="bg-zinc-700 text-white px-2"
                onClick={() => adicionar(item)}
              >
                +
              </button>
            </div>
          </section>
        ))}

        {total > 0 && (
          <div className="m-10">
            <strong>
              Total:{" "}
              {total.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </strong>

            <button
              className="mx-7 bg-green-500 p-2 rounded"
              onClick={() => setShowModal(true)}
            >
              Finalizar compra
            </button>
          </div>
        )}
      </main>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h2 className="text-lg font-bold mb-4">Confirmar Compra</h2>
            <p className="mb-4">
              O total da compra é{" "}
              <strong>
                {total.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
              . Deseja confirmar?
            </p>
            <div className="flex justify-end gap-2">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={confirmarCompra}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

