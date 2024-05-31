import db from "@/db/db";
import { notFound } from "next/navigation";
import Stripe from "stripe";
import { CheckoutForm } from "./_components/CheckoutForm";
import { usableDiscountCodeWhere } from "@/lib/discountCodeHelpers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function PurchasePage({
  params: { id },
  searchParams: { coupon },
}: {
  params: { id: string };
  searchParams: { coupon?: string };
}) {
  const product = await db.product.findUnique({ where: { id } });
  if (product == null) return notFound();

  const discountCode =
    coupon == null ? undefined : await getDiscountCode(coupon, product.id);

  return (
    <section className="relative flex justify-center items-center py-12">
      <div className="h-full max-w-6xl w-full z-[5]">
        <div className="flex gap-10 mx-10 flex-col">
          <CheckoutForm
            product={product}
            discountCode={discountCode || undefined}
          />
        </div>
      </div>
    </section>
  );
}

function getDiscountCode(coupon: string, productId: string) {
  return db.discountCode.findUnique({
    select: { id: true, discountAmount: true, discountType: true },
    where: { ...usableDiscountCodeWhere, code: coupon },
  });
}
