import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Expired() {
  return (
    <section className="relative flex justify-center items-center py-12">
      <div className="h-full max-w-6xl w-full z-[5]">
        <div className="flex gap-10 mx-10 flex-col">
          <h1 className="text-4xl mb-4">Download link expired</h1>
          <Button asChild size="lg">
            <Link href="/orders">Get New Link</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
