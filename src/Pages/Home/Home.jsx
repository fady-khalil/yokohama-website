// sections
import Hero from "./Sections/Hero/Hero";
import SearchTires from "./Sections/SearchTires/SearchTires";
import About from "./Sections/About/About";
import Brands from "./Sections/Brands/Brands";
import Shop from "./Sections/Shop/Shop";
import Offer from "./Sections/Offer/Offer";
import BestSeller from "./Sections/BestSeller/BestSeller";
import Oil from "./Sections/Oil/Oil";
import Geo from "./Sections/Geo/Geo";
import RoadMap from "./Sections/RoadMap/RoadMap";
import FindDealer from "./Sections/FindDealer/FindDealer";
const Home = () => {
  // const { dealderIsSignIn } = useContext(DealerLoginContext);

  return (
    <main>
      <Hero />
      <Brands />
      <SearchTires />
      <About />
      <Shop />
      <Offer />
      <BestSeller />
      {/* <Geo /> */}
      <Oil />
      {/* <RoadMap /> */}
      {/* <FindDealer /> */}
    </main>
  );
};

export default Home;
