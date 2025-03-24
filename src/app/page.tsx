import Banner from "@/components/Banner";
import Card from "@/components/Card";
import Review from "@/components/Review";
import AddReview from "@/components/AddReview";

export default function Home() {
  return (
    <main>
      <Banner />
      <div className="flex flex-row justify-center">
        {/* <Card />
        <Card />
        <Card /> */}
      </div>
      <div className="flex flex-row justify-center">
        <Review rating={5} comment="Very delicious Lorem ipsum dolor sit amet, consectetur 
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation " />
        <Review rating={5} comment="Very delicious Lorem ipsum dolor sit amet, consectetur 
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation " />
        <Review rating={5} comment="Very delicious Lorem ipsum dolor sit amet, consectetur 
        adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
        Ut enim ad minim veniam, quis nostrud exercitation " />
      </div>
      <AddReview />
    </main>
  );
}
