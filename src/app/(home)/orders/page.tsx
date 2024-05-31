"use client";

import { emailOrderHistory } from "@/actions/orders";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState, useFormStatus } from "react-dom";

export default function MyOrdersPage() {
  const [data, action] = useFormState(emailOrderHistory, {});
  return (
    <section className="relative flex justify-center items-center py-12">
      <div className="h-full max-w-6xl w-full z-[5]">
        <div className="flex gap-10 mx-10 flex-col">
          <form action={action} className="max-2-xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>My Orders</CardTitle>
                <CardDescription>
                  Enter your email and we will email you your order history and
                  download links
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" required name="email" id="email" />
                  {data.error && (
                    <div className="text-destructive">{data.error}</div>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                {data.message ? <p>{data.message}</p> : <SubmitButton />}
              </CardFooter>
            </Card>
          </form>
        </div>
      </div>
    </section>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" size="lg" disabled={pending} type="submit">
      {pending ? "Sending..." : "Send"}
    </Button>
  );
}
