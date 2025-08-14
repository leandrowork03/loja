// src/app/components/header.tsx
'use client'

import Link from "next/link";
import { IoCartOutline } from "react-icons/io5";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "@/contexts/cartContext";
import { mockPosts } from "@/lib/mockData";
import { useRouter } from "next/navigation";

interface Post {
    id: string;
    title: string;
    price: number;
    description: string;
    img: string;
}

export function Header(){
    const {cartAmount} = useContext(CartContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState<Post[]>([]);
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm.trim() !== '') {
                const filtered = mockPosts.filter(post =>
                    post.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setSuggestions(filtered);
            } else {
                setSuggestions([]);
            }
        }, 300);
        return () => clearTimeout(timer);
    }, [searchTerm]);


    const handleSuggestionClick = (post: Post) => {
        setSearchTerm('');
        setSuggestions([]);
        router.push(`/posts/${post.id}`);
    };

    return(
        <header className="bg-sky-300 w-full px-1">
            <nav className="flex justify-between items-center h-13 px-4 mx-auto max-w-7xl">
                <Link href='/' className="font-bold text-lg">
                    <img src="/img/logo.png" alt="logo" className="w-10 rounded-full"/>
                </Link>

                <div className="relative flex-1 max-w-lg mx-4">
                    <input
                        type="text"
                        placeholder="Pesquisar produtos..."
                        className="w-full h-8 px-4 py-2 rounded-full text-sm text-black bg-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 transition-shadow"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {suggestions.length > 0 && (
                        <ul className="absolute top-full left-0 right-0 z-20 bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                            {suggestions.map((post) => (
                                <li
                                    key={post.id}
                                    onClick={() => handleSuggestionClick(post)}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                                >
                                    {post.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <Link href='/cart' className="relative">
                    <IoCartOutline size={25}/>
                    {cartAmount > 0 && (
                        <span className="absolute text-xs bg-sky-500 text-white px-1.5 rounded-full -right-2 -top-1.5">{cartAmount}</span>
                    )}
                </Link>
            </nav>
        </header>
    );
}