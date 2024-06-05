import why1 from "assests/about/why1.jpg";
import why2 from "assests/about/why-2.jpg";
import why3 from "assests/about/why-3.jpg";
import why4 from "assests/about/why-4.jpg";
import why5 from "assests/about/why-5.jpg";

// brands
import heroBrand from "assests/about/Brand/about.jpg";

// channel
import channelBg from "assests/about/channels/bg.jpg";
import schoolIcons from "assests/about/channels/school.png";
import dealerIcons from "assests/about/channels/dealler.png";
import carDealerIcons from "assests/about/channels/carDealer.png";
import covermentIcons from "assests/about/channels/coverment.png";
import fleetIcons from "assests/about/channels/fleet.png";
import retailIcons from "assests/about/channels/retail.png";
// mission
import m1 from "assests/about/mission/m1.jpg";
import m2 from "assests/about/mission/m2.jpg";

import brandDealer from "assests/about/Brand/7.png";
import audienceDealer from "assests/about/Brand/8.png";
import dataBaseDealer from "assests/about/Brand/9.png";
import shareDealer from "assests/about/Brand/10.png";

// clients
import c1 from "assests/about/Brand/clients/c1.png";
import c2 from "assests/about/Brand/clients/c2.png";
import c3 from "assests/about/Brand/clients/c3.png";
import c4 from "assests/about/Brand/clients/c4.png";

import e1 from "assests/about/Brand/e1.jpg";
import e2 from "assests/about/Brand/e2.jpg";

const aboutData = {
  brand: {
    hero: {
      image: heroBrand,
      title: "Established in 2005",
      text: " Granted the exclusive distribution of Yokohama tires along with Triangle Tires, Hankook Tires, Interstate Tires, and several oil Lube brands. Has various distribution channels, including Wholesale Dealers, Car Dealers, Fleet companies, governmental entities and schools, in addition to its own points of sales, which makes it an efficient tire distribution company covering all Lebanese territory.",
    },

    feature: {
      background: channelBg,
      list: [
        {
          icon: brandDealer,
          num: "200",
          text: "DEALER",
        },
        {
          icon: audienceDealer,
          num: "100K",
          text: "AUDIENCE",
        },
        {
          icon: dataBaseDealer,
          num: "200K",
          text: "CUSTOMER DATABASE",
        },
        {
          icon: shareDealer,
          num: "12%",
          text: "MARKET SHARE",
        },
      ],
    },

    Celebrating: [
      {
        title: "Establishment",
        num: "2005",
        text: "HMG Holding was established and was granted the exclusive distribution of Yokohama tires in Lebanon",
      },
      {
        title: "Expansion",
        num: "2009",
        text: "Expanded the Company’s operati being the first to introduce tire repl service in car dealers.",
      },
      {
        title: "Establishment",
        num: "2012",
        text: "Expanded the Company’s operati being the first to introduce tire repl service in car dealers.",
      },
      {
        title: "Expansion",
        num: "2016",
        text: "Expanded the Company’s operati being the first to introduce tire repl service in car dealers.",
      },
      {
        title: "Establishment",
        num: "2020",
        text: "Expanded the Company’s operati being the first to introduce tire repl service in car dealers.",
      },
      {
        title: "Expansion",
        num: "2024",
        text: "Expanded the Company’s operati being the first to introduce tire repl service in car dealers.",
      },
    ],

    ourClients: [c1, c2, c3, c4, c1, c2, c3, c4],

    content: [
      {
        image: e1,
        title: "Our Warehouse",
        text: "Capacity is more than 50,000 tires , covering PCR, LTR,TB. High standards Safety system is used. (VESDA system for smoke detector). Cleanliness of the product and good storage using racking system. We use Automatic software system (FIFO system)",
      },
      {
        image: e2,
        title: "Our Fleet",
        text: "Capacity is more than 50,000 tires , covering PCR, LTR,TB. High standards Safety system is used. (VESDA system for smoke detector). Cleanliness of the product and good storage using racking system. We use Automatic software system (FIFO system)",
      },
    ],
  },
  vision: [
    {
      image: why1,
      title: "Logistics & stock availability",
      list: [
        "Ownership of warehouse with large capacity to fit more than 50,000 tires and to dispatch 800 tires daily during the high season.",
        "Regular maintenance allowing the warehouse to run smoothly while upholding the well-being of the staff that works inside it &",
      ],
    },
    {
      image: why2,
      title: "Support to Dealers",
      list: [
        "Financial support by giving them flexible terms of payment method.",
        "Setting up a loyalty program (incentives, regular visits, prizes, traveltickets… etc).",
        "The Company’s high support created high loyalty which led to zeropartitions with their existing dealers.",
      ],
    },
    {
      image: why3,
      title: " Prior/After Sales Support",
      list: [
        "Free after-sales service is offered for school sectors and fleet.",
        "Free survey on all fleet and free tire condition report on current mounted tires.",
        "The Company offers warrantee for 18 months on its products sold.",
        "The high sales support led to an increase in further business with the same portfolio of clients including schools and government sectors.",
      ],
    },
    {
      image: why4,
      title: "Fleet",
      list: [
        "Fast and flexible dispatch of orders with coverage all over Lebanon.",
        "The fleet service covers up to 90% of the Lebanese territory.",
      ],
    },
    {
      image: why5,
      title: "Wholesale & Retail Expertise",
      list: [
        "Over 15 years of experience in direct wholesale and indirect retail.",
      ],
    },
  ],

  channels: {
    background: channelBg,

    list: [
      {
        icon: dealerIcons,
        name: "WHOLESALE DEALER",
      },
      {
        icon: covermentIcons,
        name: "GOVERNMENT SECTOR",
      },
      {
        icon: carDealerIcons,
        name: "CAR DEALERS",
      },
      {
        icon: fleetIcons,
        name: "FLEET COMPANIES",
      },
      {
        icon: retailIcons,
        name: "RETAIL / OWN SHOPS",
      },
      {
        icon: schoolIcons,
        name: "SCHOOL SECTOR",
      },
    ],
  },

  mission: [
    {
      image: m1,
      title: "Our Mission",
      text: "Our mission is to “deliver the best products at competitive prices and on time,”. The foundation for this mission requires the utmost attention to “safety” and the “environment.” We will imbue the leading technologies of every era with the passion of each and every",
    },
    {
      image: m2,
      title: "Our Vision",
      text: "To enhance our corporate value & remain a leading company in the industry in the region and make clients recognize the easy and comfort treatment that we provide by simplifying business procedures.",
    },
  ],
};
export default aboutData;
