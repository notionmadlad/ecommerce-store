import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { Button } from "@/components/ui/button";
import db from "@/db/db";
import { cache } from "@/lib/cache";
import { Product } from "@prisma/client";
import { FilePlus2, MoveRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Senior Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
];

const getPopularProducts = cache(
  () => {
    return db.product.findMany({
      where: { isAvailableForPurchase: true },
      orderBy: { orders: { _count: "desc" } },
      take: 6,
    });
  },
  ["/", "getPopularProducts"],
  { revalidate: 60 * 60 * 24 },
);

const getNewestProducts = cache(() => {
  return db.product.findMany({
    where: { isAvailableForPurchase: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });
}, ["/", "getNewestProducts"]);

export default function HomePage() {
  return (
    <>
      <section className="relative flex justify-center items-center py-12 h-[calc(100vh-90px)]">
        <div className="h-full max-w-6xl w-full flex justify-center items-center">
          <div className="flex gap-y-10 mx-10 flex-col lg:flex-row">
            <div className="flex-[3] z-[1]">
              <div className="flex justify-center items-center flex-col gap-6">
                <h1 className="font-semibold text-5xl text-center max-w-2xl">
                  Explore the best Digital Assets on the Internet
                </h1>
                <p className="font-medium text-xl text-muted-foreground text-center max-w-xl">
                  Discover the best Notion Templates to help you stay organized
                  and productive.
                </p>
              </div>
              <div className="flex items-center justify-center gap-6 mt-10 flex-col md:flex-row">
                <Button size="lg">Explore Trending</Button>
                <Button size="lg" variant="outline" className="space-x-2">
                  <span>Editor&#39;s Choice</span>
                  <MoveRight className="size-4" />
                </Button>
              </div>
              <div className="flex justify-center items-center flex-col gap-6 mt-10">
                <p className="font-medium text-sm text-muted-foreground text-center max-w-xl">
                  Trusted by 1000s of people world wide.
                </p>
                <div className="flex flex-row items-center justify-center mb-10 w-full">
                  <AnimatedTooltip items={people} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative flex justify-center items-center py-12">
        <div className="h-full max-w-6xl w-full z-[5]">
          <div className="flex gap-10 mx-10 flex-col">
            <main className="pt-12 space-y-12">
              <ProductGridSection
                title={
                  <>
                    <Sparkles className="inline-flex size-8" /> Popular
                  </>
                }
                productsFetcher={getPopularProducts}
              />
              <ProductGridSection
                title={
                  <>
                    <FilePlus2 className="inline-flex size-8" /> Newest
                  </>
                }
                productsFetcher={getNewestProducts}
              />
            </main>
          </div>
        </div>
      </section>
    </>
  );
}

type ProductGridSectionProps = {
  title: string | ReactNode;
  productsFetcher: () => Promise<Product[]>;
};

function ProductGridSection({
  productsFetcher,
  title,
}: ProductGridSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between gap-4">
        <h2 className="text-3xl font-bold">{title}</h2>
        <Button variant="outline" size="lg" asChild>
          <Link href="/products" className="space-x-2">
            <span>View All</span>
            <MoveRight className="size-4" />
          </Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense
          fallback={
            <>
              <ProductCardSkeleton />
              <ProductCardSkeleton />
              <ProductCardSkeleton />
            </>
          }
        >
          <ProductSuspense productsFetcher={productsFetcher} />
        </Suspense>
      </div>
    </div>
  );
}

async function ProductSuspense({
  productsFetcher,
}: {
  productsFetcher: () => Promise<Product[]>;
}) {
  return (await productsFetcher()).map((product) => (
    <ProductCard key={product.id} {...product} />
  ));
}
