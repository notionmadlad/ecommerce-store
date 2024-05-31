import db from "@/db/db";
import { PageHeader } from "../../_components/PageHeader";
import { DiscountCodeForm } from "../_components/DiscountCodeForm";

export default async function NewDiscountCodePage() {
  const products = await db.product.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return (
    <section className="relative flex justify-center items-center py-12">
      <div className="h-full max-w-6xl w-full z-[5]">
        <div className="flex gap-10 mx-10 flex-col">
          <PageHeader>Add Product</PageHeader>
          <DiscountCodeForm products={products} />
        </div>
      </div>
    </section>
  );
}
