// src/app/posts/[id]/page.tsx
'use client';

import { useQuery, gql } from "@apollo/client";
import { notFound } from "next/navigation";
import { BiSolidCartAdd } from "react-icons/bi";
import { useContext } from "react";
import { CartContext } from "@/contexts/cartContext"; 
import toast from "react-hot-toast";

interface InformationProps {
  params: {
    id: string;
  };
}

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      id
      title
      price
      description
      img
    }
  }
`;

export default function Information({ params }: InformationProps) {
  
  const { addItem } = useContext(CartContext);

  const { data, loading, error } = useQuery(GET_POST, {
    variables: { id: params.id },
  });

  const post = data?.post;

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error || !post) {
    return notFound();
  }

  function adicionar() {
    toast.success("Produto adicionado ao carrinho!");
    addItem(post);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img
            src={post.img}
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl font-semibold text-gray-700 mb-6">
            {post.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p className="text-gray-600 mb-8">{post.description}</p>

          <button
            onClick={adicionar}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded flex"
           >
            Adicionar ao carrinho <BiSolidCartAdd size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}