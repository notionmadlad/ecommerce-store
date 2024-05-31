import db from "@/db/db";
import { PageHeader } from "../../../_components/PageHeader";
import { ProductForm } from "../../_components/ProductForm";

export default async function EditProductPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const product = await db.product.findUnique({ where: { id } });

  return (
    <section className="relative flex justify-center items-center py-12">
      <div className="h-full max-w-6xl w-full z-[5]">
        <div className="flex gap-10 mx-10 flex-col">
          <PageHeader>Edit Product</PageHeader>
          <ProductForm product={product} />
        </div>
      </div>
    </section>
  );
}
