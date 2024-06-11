"use client";
import ProductsData from "../data/ProductsData";
import { HeroParallax } from "../components/ui/hero-parallax";
 
 function HeroParallaxDemo() {
  return <HeroParallax products={ProductsData} />;
}

export default HeroParallaxDemo;