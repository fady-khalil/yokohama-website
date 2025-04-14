import f1 from "assests/geo-1.png";
import f2 from "assests/geo-2.png";
import f3 from "assests/geo-3.png";
import cat from "assests/cat-image.jpg";
import brand from "assests/brand-cart.jpg";
import p1 from "assests/product-1-removebg-preview.png";
import p2 from "assests/product-2-removebg-preview.png";
import p3 from "assests/product-3-removebg-preview.png";
const myCartData = {
  catLogo: brand,
  brandLogo: cat,
  desc: "Summer",
  sku: "87128371",
  description:
    " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti perspiciatis magnam facilis quidem adipisci non et facere beatae, nihil provident sunt est, obcaecati dicta quia mollitia maxime commodi dolorem totam.",
  feature: [
    {
      image: f3,
      text: "Fuel efficiency",
    },
    {
      image: f1,
      text: "Wet grip",
    },
    {
      image: f2,
      text: "External noise class",
    },
  ],
  price: ["80$", "75%", "-10%"],
  size: 15,
  pattern: 2187312,
  images: [p1, p2, p3],
};

export default myCartData;
