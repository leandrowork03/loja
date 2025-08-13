'use client'

import { BiSolidCartAdd } from "react-icons/bi";
import { useContext } from "react";
import { CartContext } from "@/contexts/cartContext";
import toast from "react-hot-toast";
import type { Post } from "@/app/types/info";

interface AddToCartButtonProps {
  item: Post;
}

export function AddToCartButton({ item }: AddToCartButtonProps) {
  const { addItem } = useContext(CartContext);

  function handleAddToCart() {
    toast.success("Produto adicionado ao carrinho!");
    addItem(item);
  }

  return (
    <button
      onClick={handleAddToCart}
      className="text-white bg-blue-500 hover:bg-blue-600 transition-colors py-2 px-4 rounded-md flex items-center gap-2"
    >
      Adicionar ao Carrinho
      <BiSolidCartAdd size={25} />
    </button>
  );
}