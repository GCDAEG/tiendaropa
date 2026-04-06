"use client";

import HeroSection from "../components/layout/Sections/HeroSection";
import PrdocutCatalog from "../components/layout/Sections/ProductCatalog";
import WhatsAppChatInput from "@/components/ui/WhatsAppChatInput";
import { useState } from "react";
import OurStory from "@/components/layout/Sections/OurStory";
import StoreExperience from "@/components/layout/Sections/StoreExperience";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const onCategoryChange = (cat: string) => {
    setActiveCategory(cat);
  };
  return (
    <main className={`min-h-screen w-full font-base bg-background `}>
      <HeroSection />
      <PrdocutCatalog
        activeCategory={activeCategory}
        onCategoryChange={onCategoryChange}
      />
      <StoreExperience />
      <OurStory />
      <WhatsAppChatInput />
    </main>
  );
}
