import { notFound } from "next/navigation";
import Image from "next/image";
import { Post, InformationParams } from '@/app/types/info';
import { AddToCartButton } from "./components/AddToCartButton"; // Importa o novo componente

export default async function PostPage({ params }: InformationParams) {
  const { id } = params;

  const apiUrl = process.env.NEXT_PUBLIC_GRAPHQL_API_URL || "http://localhost:3000/api/graphql";

  const res = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
        query Post($id: ID!) {
          post(id: $id) {
            id
            title
            price
            description
            img
          }
        }
      `,
      variables: { id },
    }),
    cache: "no-store",
  });

  const { data, errors } = await res.json();

  if (errors) {
    console.error("Erro na query GraphQL para o post:", errors);
    return <p>Erro ao carregar o post. Tente novamente mais tarde.</p>;
  }

  const postData: Post = data?.post;

  if (!postData) {
    console.warn(`Post com ID ${id} não encontrado. Redirecionando para 404.`);
    return notFound();
  }

  const { title, price, description, img } = postData;

  return (
    <article className="prose max-w-none p-4 rounded-lg shadow-lg">
      <h1 className="text-sky-700 text-4xl font-bold py-6">{title}</h1>

      {img && (
        <div className="my-6 w-full max-w-md mx-auto">
          <Image src={img} alt={title} width={600} height={400} className="rounded-md" />
        </div>
      )}
      <div>
        <p className="text-lg font-semibold mb-4">
          Preço: R$ {price.toFixed(2)}
        </p>
        <AddToCartButton item={postData} /> {/* Usa o componente de cliente e passa os dados */}
      </div>
      <div>
        {description}
      </div>
    </article>
  );
}

