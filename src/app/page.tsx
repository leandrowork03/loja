// src/app/page.tsx
'use client'

import { BiSolidCartAdd } from "react-icons/bi";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useQuery, gql } from "@apollo/client";
import { useContext, useRef } from "react"; 
import { CartContext } from "@/contexts/cartContext";
import toast from "react-hot-toast";
import type { Post as Product } from "@/app/types/info";
import Link from "next/link";
import { BannerCarousel } from "./posts/[id]/components/BannerCarousel";
import { Footer } from "./components/footer";

const bannerImages = [
  {
    id: '1',
    imgSrc: '/img/banner-devshop-1.jpg',
    altText: 'Banner de oferta de smartphones',
    link: '/promocao/smartphones',
  },
  {
    id: '2',
    imgSrc: '/img/banner-devshop-3.jpg',
    altText: 'Banner de liquidação de TVs',
    link: '/promocao/tvs',
  },
];

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
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount =
        direction === "left"
          ? carouselRef.current.scrollLeft - 300
          : carouselRef.current.scrollLeft + 300;

      carouselRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
    }
  };

  function adicionar(item: Product) {
    toast.success("Produto adicionado ao carrinho!");
    addItem(item);
  }

  if (loading) {
    return <p className="text-center mt-5">Carregando produtos...</p>;
  }

  if (error) {
    return <p className="text-center mt-5 text-red-500">Erro ao carregar produtos</p>;
  }

  return (
    <>
      <BannerCarousel banners={bannerImages} />
      
      <div className="relative w-full">
        <h1 className="text-2xl font-bold p-5 text-center">Produtos</h1>
        
        <button
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-200"
        >
          <ChevronLeft size={24} />
        </button>

        <div
          ref={carouselRef}
          className="flex overflow-x-auto gap-4 scroll-smooth px-10 py-4 no-scrollbar max-w-7xl m-auto bg-white rounded-2xl"
        >
          {data?.posts.map((item) => (
            <section
              key={item.id}
              className="min-w-[220px] bg-white p-4 border-2 border-zinc-300 hover:border-amber-700 rounded transition duration-300 ease-in-out hover:shadow-xl hover:scale-105"
            >
              <Link href={`/posts/${item.id}`}>
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-40 object-contain"
                />
                <strong className="block mt-2">{item.title}</strong>
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
                  className="hover:text-green-500 transition-colors "
                >
                  <BiSolidCartAdd size={25} />
                </button>
              </div>
            </section>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white shadow-md rounded-full p-2 z-10 hover:bg-gray-200"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <div className="flex flex-col md:flex-row items-center max-w-7xl m-auto bg-white rounded-2xl mt-20 p-5">
        <img src="/img/logo.png" alt="logo rounded-2xl" />
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium asperiores in eaque, omnis recusandae voluptate enim modi possimus magni, dignissimos, officia aspernatur nulla quisquam nihil maiores suscipit consectetur voluptates perferendis molestias placeat fugit? Ab delectus nam animi eum repellendus, aspernatur, sequi vero nulla quasi deleniti ex reprehenderit maxime earum minima.</p>
      </div>
      <Footer/>
    </>
  );
}