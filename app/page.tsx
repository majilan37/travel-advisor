import Content from "@/components/Content";
import Header from "@/components/Header";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Suspense fallback={<>Loading...</>}>
        {/* @ts-ignore */}
        <Content />
      </Suspense>
    </main>
  );
}
