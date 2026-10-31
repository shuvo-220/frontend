import Categories from "./components/home/Categoris";
import FeaturedStudios from "./components/home/FeatureStudio";
import Hero from "./components/home/Hero";
import HowItWorks from "./components/home/HowItWorks";
import WhyChooseUs from "./components/home/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedStudios />
      <Categories />
      <HowItWorks />
      <WhyChooseUs />
    </main>
  );
}
