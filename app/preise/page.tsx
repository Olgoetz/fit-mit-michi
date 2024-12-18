import PriceCard from "@/components/Prices";

export default function Page() {
  return (
    <section className="container py-24 sm:py-32 max-w-[1200px]">
      <h1 className="text-2xl md:text-4xl font-bold text-center ">Modelle</h1>
      <p className="text-lg text-center text-muted-foreground pt-8 pb-12">
        Du entscheidest, wie du mit mir trainieren möchtest. Ich biete ein
        flexibles Preismodell. Entweder Du buchst meine Kurse individuell oder
        Du nutzt die Vorteil einer Mitgliedschaft.
      </p>
      <PriceCard />
    </section>
  );
}
