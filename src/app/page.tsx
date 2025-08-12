// src/app/page.tsx
'use client'

import { BiSolidCartAdd } from "react-icons/bi";
import { useQuery, gql } from "@apollo/client";
import { useContext } from "react";
import { CartContext } from "@/contexts/cartContext";
import toast from "react-hot-toast";
import type { Post as Product } from "@/app/types/info";
import Link from "next/link"; // Next.js usa esse Link, não o do react-router-dom

// Query GraphQL para buscar todos os produtos (posts)
const GET_PRODUCTS = gql`
  query GetProducts {
    posts {
      id
      title
      price
      description
      img
    }
  }
`;

export default function Home() {
  const { addItem } = useContext(CartContext);
  const { data, loading, error } = useQuery<{ posts: Product[] }>(GET_PRODUCTS);

  if (loading) return <p className="text-center mt-5">Carregando produtos...</p>;
  if (error) return <p className="text-center mt-5 text-red-500">Erro ao carregar produtos</p>;

  function adicionar(item: Product) {
    toast.success("Produto adicionado ao carrinho!");
    addItem(item);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold p-5 text-center">Produtos</h1>

      <main className="grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 max-w-7xl gap-4 mx-auto">
        {data?.posts.map((item) => (
          <section className="p-4" key={item.id}>
            <Link href={`/products/${item.id}`}>
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-50 object-contain"
              />
              <strong>{item.title}</strong>
            </Link>

            <div className="flex gap-4 items-center mt-2">
              <p>
                {item.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>

              <button
                onClick={() => adicionar(item)}
                className="hover:text-green-500 transition-colors"
              >
                <BiSolidCartAdd size={25} />
              </button>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}
