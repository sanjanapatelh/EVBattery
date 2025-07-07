import Icon from "../component/utils/svg/Icon";
import Icon2 from "../component/utils/svg/Icon2";
import Icon3 from "../component/utils/svg/Icon3";
import Icon4 from "../component/utils/svg/Icon4";

const shopData = [
  {
    id: 1,
    img: "/assets/img/rv-12-pro-1.jpg",
    name: "Cruelty-Free Soap",
    slug: "cruelty-free-soap",
    price: 140,
    prevPrice: 160,
    discount: true,
    popularity: 10,
    rating: 4,
    quantity: 1,
    category: "MAKEUP",
    color: "DEEP LILAC",
  },
  {
    id: 2,
    img: "/assets/img/rv-12-pro-5.png",
    name: "Vegan Hand Cream",
    slug: "vegan-hand-cream",
    price: 235,
    prevPrice: 260,
    popularity: 25,
    rating: 3.5,
    quantity: 1,
    category: "POWDER",
    color: "CORAL RED",
  },
  {
    id: 3,
    img: "/assets/img/rv-12-pro-6.png",
    name: "Plant-Based Deodorant",
    slug: "plant-based-deodorant",
    price: 350,
    prevPrice: 360,
    discount: true,
    popularity: 18,
    rating: 5,
    quantity: 1,
    category: "COMPLEXION",
    color: "DEEP MULBERRY",
  },
  {
    id: 4,
    img: "/assets/img/rv-12-pro-8.png",
    name: "Biodegradable Sunscreen",
    slug: "biodegradable-sunscreen",
    price: 400,
    prevPrice: 420,
    discount: true,
    popularity: 9,
    rating: 4,
    quantity: 1,
    category: "BEAUTY",
    color: "GRAPHITE BROWN",
  },
  {
    id: 5,
    img: "/assets/img/rv-12-pro-7.png",
    name: "Organic Toothpaste",
    slug: "organic-toothpaste",
    price: 300,
    prevPrice: 315,
    popularity: 14,
    rating: 3,
    quantity: 1,
    category: "LIPSTICK",
    color: "TANGERINE",
  },
  {
    id: 6,
    img: "/assets/img/rv-12-pro-8.png",
    name: "Sustainable Body Lotion",
    slug: "sustainable-body-lotion",
    price: 540,
    prevPrice: 550,
    popularity: 10,
    rating: 4,
    quantity: 1,
    category: "LUMINOUS",
    color: "PORCELAIN",
  },
  {
    id: 7,
    img: "/assets/img/rv-12-pro-7.png",
    name: "Herbal Hair Oil",
    slug: "herbal-hair-oil",
    price: 180,
    prevPrice: 220,
    discount: true,
    popularity: 18,
    rating: 3,
    quantity: 1,
    category: "MUST HAVE",
    color: "DEEP MULBERRY",
  },
  {
    id: 8,
    img: "/assets/img/rv-12-pro-6.png",
    name: "Eco-Friendly Shampoo",
    slug: "eco-friendly-shampoo",
    price: 220,
    prevPrice: 230,
    discount: true,
    popularity: 15,
    rating: 5,
    quantity: 1,
    category: "VAMP",
    color: "GRAPHITE BROWN",
  },
  {
    id: 9,
    img: "/assets/img/rv-12-pro-3.jpg",
    name: "Natural Face Scrub",
    slug: "natural-face-scrub",
    price: 250,
    prevPrice: 320,
    discount: true,
    popularity: 11,
    rating: 4.5,
    quantity: 1,
    category: "VARIABLE",
    color: "CORAL RED",
  },
  {
    id: 10,
    img: "/assets/img/rv-12-pro-5.png",
    name: "Organic Lip Balm",
    slug: "organic-lip-balm",
    price: 450,
    prevPrice: 480,
    popularity: 5,
    rating: 2,
    quantity: 1,
    category: "VAMP",
    color: "GRAPHITE BROWN",
  },
  {
    id: 11,
    img: "/assets/img/rv-12-pro-3.jpg",
    name: "Pure Lip Tint",
    slug: "pure-lip-tint",
    price: 350,
    prevPrice: 370,
    discount: true,
    popularity: 21,
    rating: 4,
    quantity: 1,
    category: "MUST HAVE",
    color: "DEEP MULBERRY",
  },
  {
    id: 12,
    img: "/assets/img/rv-12-pro-5.png",
    name: "Glowing Skin Serum",
    slug: "glowing-skin-serum",
    price: 220,
    prevPrice: 250,
    popularity: 14,
    rating: 4,
    quantity: 1,
    category: "LUMINOUS",
    color: "PORCELAIN",
  },
  {
    id: 13,
    img: "/assets/img/rv-12-pro-8.png",
    name: "Botanical Cheek Stain",
    slug: "botanical-cheek-stain",
    price: 180,
    prevPrice: 185,
    discount: true,
    popularity: 14,
    rating: 3,
    quantity: 1,
    category: "MAKEUP",
    color: "DEEP LILAC",
  },
  {
    id: 14,
    img: "/assets/img/rv-12-pro-1.jpg",
    name: "Organic Eyebrow Gel",
    slug: "organic-eyebrow-gel",
    price: 350,
    prevPrice: 360,
    popularity: 25,
    rating: 3.5,
    quantity: 1,
    category: "MUST HAVE",
    color: "DEEP LILAC",
  },
  {
    id: 15,
    img: "/assets/img/rv-12-pro-5.png",
    name: "Nourishing Hair Mask",
    slug: "nourishing-hair-mask",
    price: 450,
    prevPrice: 460,
    discount: true,
    popularity: 18,
    rating: 5,
    quantity: 1,
    category: "VARIABLE",
    color: "CORAL RED",
  },
  {
    id: 16,
    img: "/assets/img/rv-12-pro-3.jpg",
    name: "Pure Lip Tint 2",
    slug: "pure-lip-tint-2",
    price: 150,
    prevPrice: 180,
    discount: true,
    popularity: 9,
    rating: 4,
    quantity: 1,
    category: "LUMINOUS",
    color: "CORAL RED",
  },
  {
    id: 17,
    img: "/assets/img/rv-12-pro-8.png",
    name: "Soothing Lip Scrub",
    slug: "soothing-lip-scrub",
    price: 300,
    prevPrice: 320,
    popularity: 14,
    rating: 3,
    quantity: 1,
    category: "LIPSTICK",
    color: "TANGERINE",
  },
  {
    id: 18,
    img: "/assets/img/rv-12-pro-6.png",
    name: "Natural Eyelash Serum",
    slug: "natural-eyelash-serum",
    price: 400,
    prevPrice: 455,
    popularity: 10,
    rating: 4,
    quantity: 1,
    category: "VAMP",
    color: "GRAPHITE BROWN",
  },
];

const testimonialData = [
  {
    id: 1,
    mainImg: "/assets/img/testimonial/home-6-1.png",
    testimony:
      "Morbi consectetur elementum purus mattis cursus purus metus iaculis sagittis. Vestibulum molestie bibendum turpis luctus sem lacinia Quisque amet velit amet dui hendrerit ultricies id ipsum Mauris sit amet Suspends potent vestibulu lacinia est”",
    name: "Douglas Lyphe",
    designation: "Director, Client Experience",
  },
  {
    id: 2,
    mainImg: "/assets/img/testimonial/home-6-1.png",
    testimony:
      "Morbi consectetur elementum purus mattis cursus purus metus iaculis sagittis. Vestibulum molestie bibendum turpis luctus sem lacinia Quisque amet velit amet dui hendrerit ultricies id ipsum Mauris sit amet Suspends potent vestibulu lacinia est”",
    name: "Douglas Lyphe",
    designation: "Director, Client Experience",
  },
  {
    id: 3,
    mainImg: "/assets/img/testimonial/home-6-1.png",
    testimony:
      "Morbi consectetur elementum purus mattis cursus purus metus iaculis sagittis. Vestibulum molestie bibendum turpis luctus sem lacinia Quisque amet velit amet dui hendrerit ultricies id ipsum Mauris sit amet Suspends potent vestibulu lacinia est”",
    name: "Douglas Lyphe",
    designation: "Director, Client Experience",
  },
];

const pricingData = [
  {
    id: 1,
    plan: "Basic Plan",
    desc: "Denim aliquot abitur poseurs locus..!",
    price: 59,
    benefits: [
      "Check the health of plants",
      "Water properly",
      "Treat your soil",
      "Destroy the weeds",
      "Try raised beds",
    ],
  },
  {
    id: 2,
    plan: "Standard Plan",
    desc: "Denim aliquot abitur poseurs locus..!",
    price: 79,
    benefits: [
      "Free Landscape Design",
      "Destroy the weeds",
      "Water properly",
      "Treat your soil",
      "Try raised beds",
    ],
  },
  {
    id: 3,
    plan: "Ultimate Plan",
    desc: "Denim aliquot abitur poseurs locus..!",
    price: 99,
    benefits: [
      "Treat your soil",
      "Check the health of plants",
      "Water properly",
      "Destroy the weeds",
      "Try raised beds",
    ],
  },
];

const portfolioData = [
  {
    id: 1,
    mainImg: "/assets/img/team/home-6-portfolio-1.png",
    desc: "Rubbish Removal",
    title: "Tree Cleaning",
  },
  {
    id: 2,
    mainImg: "/assets/img/team/home-6-portfolio-2.png",
    desc: "Rubbish Removal",
    title: "Tree Cleaning",
  },
  {
    id: 3,
    mainImg: "/assets/img/team/home-6-portfolio-3.png",
    desc: "Rubbish Removal",
    title: "Tree Cleaning",
  },
  {
    id: 4,
    mainImg: "/assets/img/team/home-6-portfolio-4.png",
    desc: "Rubbish Removal",
    title: "Tree Cleaning",
  },
  {
    id: 5,
    mainImg: "/assets/img/team/home-6-portfolio-3.png",
    desc: "Rubbish Removal",
    title: "Tree Cleaning",
  },
  {
    id: 6,
    mainImg: "/assets/img/team/home-6-portfolio-4.png",
    desc: "Rubbish Removal",
    title: "Tree Cleaning",
  },
  {
    id: 7,
    mainImg: "/assets/img/team/home-6-portfolio-2.png",
    desc: "Rubbish Removal",
    title: "Tree Cleaning",
  },
  {
    id: 8,
    mainImg: "/assets/img/team/home-6-portfolio-1.png",
    desc: "Rubbish Removal",
    title: "Tree Cleaning",
  },
];

const teamData = [
  {
    id: 1,
    mainImg: "/assets/img/team/home-6-teem-1.png",
    socials: [
      {
        icon: "fab fa-facebook-f",
        url: "#",
      },
      {
        icon: "fab fa-twitter",
        url: "#",
      },
      {
        icon: "fab fa-linkedin-in",
        url: "#",
      },
    ],
    designation: "Garden Experts",
    name: "Alexander Bennett",
    dropText: "LANDSCAPER",
  },
  {
    id: 2,
    mainImg: "/assets/img/team/home-6-teem-2.png",
    socials: [
      {
        icon: "fab fa-facebook-f",
        url: "#",
      },
      {
        icon: "fab fa-twitter",
        url: "#",
      },
      {
        icon: "fab fa-linkedin-in",
        url: "#",
      },
    ],
    designation: "Garden Experts",
    name: "Sophia Rodriguez",
    dropText: "LANDSCAPER",
  },
  {
    id: 3,
    mainImg: "/assets/img/team/home-6-teem-3.png",
    socials: [
      {
        icon: "fab fa-facebook-f",
        url: "#",
      },
      {
        icon: "fab fa-twitter",
        url: "#",
      },
      {
        icon: "fab fa-linkedin-in",
        url: "#",
      },
    ],
    designation: "Garden Experts",
    name: "Emily Nguyen",
    dropText: "LANDSCAPER",
  },
];

const blogData = [
  {
    id: 1,
    mainImg: "/assets/img/blog/home-6-blog-1.png",
    date: "June 24, 2023",
    title: "Blossom & Bloom: Exploring The Garden World.",
    desc: "Enim aliquam, vehicula sem at, luctus risus estibulum ultrices molestie.",
  },
  {
    id: 2,
    mainImg: "/assets/img/blog/home-6-blog-2.png",
    date: "June 24, 2023",
    title: "Breathing Easier with Home Air-Purifying Plants.",
    desc: "Enim aliquam, vehicula sem at, luctus risus estibulum ultrices molestie.",
  },
  {
    id: 3,
    mainImg: "/assets/img/blog/home-6-blog-3.png",
    date: "June 24, 2023",
    title: "Harvest Haven Nurturing your Green Spaces.",
    desc: "Enim aliquam, vehicula sem at, luctus risus estibulum ultrices molestie.",
  },
];

const categoryData = [
  {
    id: 1,
    mainImg: "/assets/img/rv-12-cate-1.jpg",
    category: "Cinnamon Tea",
    desc: "Cinnamon tea is typically made steeping cinnamon bark.",
  },
  {
    id: 2,
    mainImg: "/assets/img/rv-12-cate-2.jpg",
    category: "Black Tea",
    desc: " Black tea is a type of tea that fully oxidized, resulting.",
  },
  {
    id: 3,
    mainImg: "/assets/img/rv-12-cate-3.jpg",
    category: "Lemon Tea",
    desc: " Lemon tea offers a delightful combination of the natural.",
  },
  {
    id: 4,
    mainImg: "/assets/img/rv-12-cate-4.jpg",
    category: "Green Tea",
    desc: "Green tea contains catechins, powerful antioxidants.",
  },
];

const projectData = [
  "https://i.ibb.co/D9LJPF3/rv-12-project-1.gif",
  "https://i.ibb.co/2nLGdRs/rv-12-project-2.gif",
  "https://i.ibb.co/DR4cHM6/rv-12-project-3.gif",
  "https://i.ibb.co/D9LJPF3/rv-12-project-1.gif",
  "https://i.ibb.co/2nLGdRs/rv-12-project-2.gif",
];

const testimonialData2 = [
  {
    desc: "“Suspendisse in consectetur justo. Suspends molestee lorem accusant mattis rutrum. Nunc facilisis ultricies mi, et porta diam lobortis non. In hac habitasse platea dictumst”",
    thumbImg: "/assets/img/rv-3-testimony-1.png",
  },
  {
    desc: "“Suspendisse in consectetur justo. Suspends molestee lorem accusant mattis rutrum. Nunc facilisis ultricies mi, et porta diam lobortis non. In hac habitasse platea dictumst”",
    thumbImg: "/assets/img/rv-3-testimony-2.png",
  },
  {
    desc: "“Suspendisse in consectetur justo. Suspends molestee lorem accusant mattis rutrum. Nunc facilisis ultricies mi, et porta diam lobortis non. In hac habitasse platea dictumst”",
    thumbImg: "/assets/img/rv-3-testimony-3.png",
  },
];

const partnerData = [
  "/assets/img/rv-12-partner-1.png",
  "/assets/img/rv-12-partner-2.png",
  "/assets/img/rv-12-partner-3.png",
  "/assets/img/rv-12-partner-4.png",
  "/assets/img/rv-12-partner-5.png",
  "/assets/img/rv-12-partner-1.png",
];

const bannerData = [
  {
    subTitle: "Your Trust is Valued",
    title: "Safeguard Natural Resources.",
    style: "rv-9-banner-slide",
  },
  {
    subTitle: "Your Trust is Valued",
    title: "Safeguard Natural Resources.",
    style: "rv-9-banner-slide rv-9-banner-slide--2",
  },
  {
    subTitle: "Your Trust is Valued",
    title: "Safeguard Natural Resources.",
    style: "rv-9-banner-slide rv-9-banner-slide--3",
  },
];

const projectData2 = [
  {
    id: 1,
    mainImg: "/assets/img/rv-9-project-1.jpg",
    subTitle: "Protecting Nature",
    title: "Forest & Tree Planting",
    slug: "forest-&-tree-planting",
  },
  {
    id: 2,
    mainImg: "/assets/img/rv-9-project-2.jpg",
    subTitle: "Lawn Renovation",
    title: "Helping Young Planting",
    slug: "helping-young-planting",
  },
  {
    id: 3,
    mainImg: "/assets/img/rv-9-project-3.jpg",
    subTitle: "Environment",
    title: "Protecting Nature",
    slug: "protecting-nature",
  },
  {
    id: 4,
    mainImg: "/assets/img/rv-9-project-4.jpg",
    subTitle: "Wild Animals",
    title: "Save Water From Pollution",
    slug: "save-water-from-pollution",
  },
  {
    id: 5,
    mainImg: "/assets/img/rv-9-project-2.jpg",
    subTitle: "Lawn Renovation",
    title: "Helping Young Planting",
    slug: "helping-young-planting",
  },
  {
    id: 6,
    mainImg: "/assets/img/rv-9-project-3.jpg",
    subTitle: "Environment",
    title: "Protecting Nature",
    slug: "protecting-nature",
  },
];

const teamData2 = [
  {
    id: 1,
    mainImg: "/assets/img/rv-9-member-1.jpg",
    socials: [
      {
        url: "#",
        icon: "fa-brands fa-facebook-f",
      },
      {
        url: "#",
        icon: "fa-brands fa-twitter",
      },
      {
        url: "#",
        icon: "fa-brands fa-linkedin-in",
      },
    ],
    designation: "Team Leader",
    name: "Sophia Johnson",
  },
  {
    id: 2,
    mainImg: "/assets/img/rv-9-member-2.jpg",
    socials: [
      {
        url: "#",
        icon: "fa-brands fa-facebook-f",
      },
      {
        url: "#",
        icon: "fa-brands fa-twitter",
      },
      {
        url: "#",
        icon: "fa-brands fa-linkedin-in",
      },
    ],
    designation: "Team Leader",
    name: "Alexander Smith",
  },
  {
    id: 3,
    mainImg: "/assets/img/rv-9-member-3.jpg",
    socials: [
      {
        url: "#",
        icon: "fa-brands fa-facebook-f",
      },
      {
        url: "#",
        icon: "fa-brands fa-twitter",
      },
      {
        url: "#",
        icon: "fa-brands fa-linkedin-in",
      },
    ],
    designation: "Team Leader",
    name: "Olivia Martinez",
  },
  {
    id: 4,
    mainImg: "/assets/img/rv-9-member-1.jpg",
    socials: [
      {
        url: "#",
        icon: "fa-brands fa-facebook-f",
      },
      {
        url: "#",
        icon: "fa-brands fa-twitter",
      },
      {
        url: "#",
        icon: "fa-brands fa-linkedin-in",
      },
    ],
    designation: "Team Leader",
    name: "Sophia Johnson",
  },
];

const blogData2 = [
  {
    id: 1,
    mainImg: "/assets/img/rv-9-blog-1.jpg",
    date: "June 15, 2023",
    comments: 5,
    title: "Technology & Solutions For Saving The Environment.",
    slug: "technology-&-solutions-for-saving-the-environment",
    desc: "Fusce tincidunt nisi condimentum amet laoreet leo eleifend.",
  },
  {
    id: 2,
    mainImg: "/assets/img/rv-9-blog-2.jpg",
    date: "June 15, 2023",
    comments: 5,
    title: "Techniques to Ensure The Continuity of Wildlife.",
    slug: "techniques-to-ensure-the-continuity-of-wildlife",
    desc: "Fusce tincidunt nisi condimentum amet laoreet leo eleifend.",
  },
  {
    id: 3,
    mainImg: "/assets/img/rv-6-blog-1.jpg",
    date: "June 15, 2023",
    comments: 5,
    title: "3 Incentives For Emphasizing Community Building.",
    slug: "3-incentives-for-emphasizing-community-building",
    desc: "Fusce tincidunt nisi condimentum amet laoreet leo eleifend.",
  },
];

const galleryData = [
  "/assets/img/rv-9-gallery-1.jpg",
  "/assets/img/rv-9-gallery-2.jpg",
  "/assets/img/rv-9-gallery-3.jpg",
  "/assets/img/rv-9-gallery-4.jpg",
  "/assets/img/rv-9-gallery-5.jpg",
];
const speakersData = [
  {
    id: 1,
    videoSrc: "/assets/img/speaker-1.mp4",
    role: "Lead Speaker",
    name: "Thomas R. Toe",
  },
  {
    id: 2,
    videoSrc: "/assets/img/speaker-2.mp4",
    role: "Developer Expert",
    name: "Brandon Guidelines",
  },
  {
    id: 3,
    videoSrc: "/assets/img/speaker-3.mp4",
    role: "Founder, Marks",
    name: "Spruce Springclean",
  },
  {
    id: 4,
    videoSrc: "/assets/img/speaker-4.mp4",
    role: "Developer Expert",
    name: "Hermann P. Schnitzel",
  },
  {
    id: 5,
    videoSrc: "/assets/img/speaker-1.mp4",
    role: "Lead Speaker",
    name: "Thomas R. Toe",
  },
];

const serviceData = [
  {
    id: 1,
    title: "Digital Marketing",
    description:
      "Suspendisse fermentu Suspendisse herderite est lectors valuate tempus null ullamcorper quis.",
    slug: "digital-marketing",
    icon: Icon,
    img: "/assets/img/service-details-1.jpg",
  },
  {
    id: 2,
    title: "Web Solution",
    description:
      "Suspendisse fermentu Suspendisse herderite est lectors valuate tempus null ullamcorper quis.",
    slug: "web-solution",
    icon: Icon2,
    img: "/assets/img/service-details-2.jpg",
  },
  {
    id: 3,
    title: "Market Research",
    description:
      "Suspendisse fermentu Suspendisse herderite est lectors valuate tempus null ullamcorper quis.",
    slug: "market-research",
    icon: Icon3,
    img: "/assets/img/service-details-3.jpg",
  },
  {
    id: 4,
    title: "Creative Process",
    description:
      "Suspendisse fermentu Suspendisse herderite est lectors valuate tempus null ullamcorper quis.",
    slug: "creative-process",
    icon: Icon4,
    img: "/assets/img/service-details-4.jpg",
  },
  {
    id: 5,
    title: "SEO Services",
    description:
      "Suspendisse fermentu Suspendisse herderite est lectors valuate tempus null ullamcorper quis.",
    slug: "seo-services",
    icon: Icon,
    img: "/assets/img/service-details-5.jpg",
  },
  {
    id: 6,
    title: "E-commerce Solutions",
    description:
      "Suspendisse fermentu Suspendisse herderite est lectors valuate tempus null ullamcorper quis.",
    slug: "ecommerce-solutions",
    icon: Icon2,
    img: "/assets/img/service-details-6.jpg",
  },
  {
    id: 7,
    title: "Media Analytics",
    description:
      "Suspendisse fermentu Suspendisse herderite est lectors valuate tempus null ullamcorper quis.",
    slug: "media-analytics",
    icon: Icon3,
    img: "/assets/img/service-details-7.jpg",
  },
  {
    id: 8,
    title: "Graphic Design",
    description:
      "Suspendisse fermentu Suspendisse herderite est lectors valuate tempus null ullamcorper quis.",
    slug: "graphic-design",
    icon: Icon4,
    img: "/assets/img/service-details-8.jpg",
  },
  {
    id: 9,
    title: "Email Marketing",
    description:
      "Suspendisse fermentu Suspendisse herderite est lectors valuate tempus null ullamcorper quis.",
    slug: "email-marketing",
    icon: Icon,
    img: "/assets/img/service-details-9.jpg",
  },
  {
    id: 10,
    title: "Sprinkling and Discharge",
    slug: "sprinkling-and-discharge",
    img: "/assets/img/service-details-10.jpg",
    imgMain: "/assets/img/services/home-6-service-1.png",
    imgIcon: "/assets/img/services/home-6-service-icon-1.png",
    dropText: "plant care",
  },
  {
    id: 11,
    title: "Commercial Grounds keeping",
    slug: "commercial-grounds-keeping",
    img: "/assets/img/service-details-11.jpg",
    imgMain: "/assets/img/services/home-6-service-2.png",
    imgIcon: "/assets/img/services/home-6-service-icon-2.png",
    dropText: "Garden Care",
  },
  {
    id: 12,
    title: "Garden Reawakening",
    slug: "garden-reawakening",
    img: "/assets/img/service-details-12.jpg",
    imgMain: "/assets/img/services/home-6-service-3.png",
    imgIcon: "/assets/img/services/home-6-service-icon-3.png",
    dropText: "Beauty full",
  },
  {
    id: 13,
    img: "/assets/img/service-details-13.jpg",
    iconImg: "/assets/img/rv-9-service-1.png",
    title: "Lawn Renovation",
    slug: "lawn-renovation",
    desc: "Suspendisse fermentu Suspendisse hendrerit est lectus vulputate tempus nulla ullamcorper quis.",
  },
  {
    id: 14,
    img: "/assets/img/service-details-14.jpg",
    iconImg: "/assets/img/rv-9-service-2.png",
    title: "ECO Friendly",
    slug: "eco-friendly",
    desc: "Suspendisse fermentu Suspendisse hendrerit est lectus vulputate tempus nulla ullamcorper quis.",
  },
  {
    id: 15,
    img: "/assets/img/service-details-15.jpg",
    iconImg: "/assets/img/rv-9-service-3.png",
    title: "Free Pick Up",
    slug: "free-pick-up",
    desc: "Suspendisse fermentu Suspendisse hendrerit est lectus vulputate tempus nulla ullamcorper quis.",
  },
];
const accordionData = [
  {
    id: 1,
    title: "How many hours of lessons do you need to pass?",
    desc: "Sed interdum ipsum fermentum, condimentum erat eget, egestas est. Etiam vel justo laoreet, efficitur lectus in, tincidunt magna. Aliquam eros lorem, rhoncus quis justo id.",
  },
  {
    id: 2,
    title: "How to Handle Tailgaters on the Road?",
    desc: "Sed interdum ipsum fermentum, condimentum erat eget, egestas est. Etiam vel justo laoreet, efficitur lectus in, tincidunt magna. Aliquam eros lorem, rhoncus quis justo id.",
  },
  {
    id: 3,
    title: "How many driving lessons do I need before test?",
    desc: "Sed interdum ipsum fermentum, condimentum erat eget, egestas est. Etiam vel justo laoreet, efficitur lectus in, tincidunt magna. Aliquam eros lorem, rhoncus quis justo id.",
  },
];
const projectData3 = [
  {
    id: 1,
    img: "/assets/img/rv-9-project-1.jpg",
    subTitle: "Protecting Nature",
    title: "Green Oasis Initiative",
    slug: "green-oasis-initiative",
  },
  {
    id: 2,
    img: "/assets/img/rv-9-project-2.jpg",
    subTitle: "Lawn Renovation",
    title: "Sustainable Planting Drive",
    slug: "sustainable-planting-drive",
  },
  {
    id: 3,
    img: "/assets/img/rv-9-project-3.jpg",
    subTitle: "Environment",
    title: "Ecological Harmony Project",
    slug: "ecological-harmony-project",
  },
  {
    id: 4,
    img: "/assets/img/rv-9-project-4.jpg",
    subTitle: "Wild Animals",
    title: "Aquatic Life Preservation",
    slug: "aquatic-life-preservation",
  },
  {
    id: 5,
    img: "/assets/img/rv-8-project-1.jpg",
    subTitle: "Protecting Nature",
    title: "Biodiversity Conservation",
    slug: "biodiversity-conservation",
  },
  {
    id: 6,
    img: "/assets/img/rv-8-project-3.jpg",
    subTitle: "Protecting Nature",
    title: "Eco-Forest Regeneration",
    slug: "eco-forest-regeneration",
  },
];

const teamData3 = [
  {
    id: 1,
    img: "/assets/img/rv-9-member-1.jpg",
    subTitle: "Team Leader",
    title: "Desmond Eagle",
  },
  {
    id: 2,
    img: "/assets/img/rv-9-member-2.jpg",
    subTitle: "Project Manager",
    title: "Sophia Griffin",
  },
  {
    id: 3,
    img: "/assets/img/rv-9-member-3.jpg",
    subTitle: "Design Specialist",
    title: "Liam Parker",
  },
  {
    id: 4,
    img: "/assets/img/rv-3-member-1.jpg",
    subTitle: "Marketing Coordinator",
    title: "Olivia Fisher",
  },
  {
    id: 5,
    img: "/assets/img/rv-3-member-2.jpg",
    subTitle: "Development Expert",
    title: "Ethan Turner",
  },
  {
    id: 6,
    img: "/assets/img/rv-3-member-3.jpg",
    subTitle: "Communications Officer",
    title: "Ava Hayes",
  },
];

const productDetailsImage = [
  {
    thumbs: [
      "/assets/img/rv-12-pro-8.png",
      "/assets/img/rv-12-pro-5.png",
      "/assets/img/rv-12-pro-6.png",
      "/assets/img/rv-12-pro-7.png",
    ],
    main: [
      "/assets/img/rv-12-pro-8.png",
      "/assets/img/rv-12-pro-5.png",
      "/assets/img/rv-12-pro-6.png",
      "/assets/img/rv-12-pro-7.png",
    ],
  },
];

const blogData3 = [
  {
    id: 1,
    img: "/assets/img/org-blog-1.jpg",
    date: "June 15, 2023",
    comments: 5,
    title: "Stronger Communities Through Organic Engagement",
    slug: "stronger-communities-organic-engagement",
  },
  {
    id: 2,
    img: "/assets/img/org-blog-2.jpg",
    date: "July 20, 2023",
    comments: 12,
    title: "Mastering SEO: The Organic Approach",
    slug: "mastering-seo-organic-approach",
    big: true,
  },
  {
    id: 3,
    img: "/assets/img/org-blog-3.jpg",
    date: "August 1, 2023",
    comments: 8,
    title: "Attract & Retain with Organic Content Marketing",
    slug: "attract-retain-organic-content",
    small: true,
  },
  {
    id: 4,
    img: "/assets/img/org-blog-4.jpg",
    date: "September 10, 2023",
    comments: 3,
    title: "Finding Creative Flow in Organic Practices",
    slug: "finding-creative-flow-organic",
    big: true,
  },
  {
    id: 5,
    img: "/assets/img/org-blog-5.jpg",
    date: "October 5, 2023",
    comments: 15,
    title: "Build & Thrive: The Power of Organic Social Media",
    slug: "build-thrive-power-organic-social",
    small: true,
  },
  {
    id: 6,
    img: "/assets/img/org-blog-6.jpg",
    date: "November 1, 2023",
    comments: 7,
    title: "Boost Engagement: Insights into Organic Email Marketing",
    slug: "boost-engagement-insights-organic-email",
  },
  {
    id: 7,
    img: "/assets/img/org-blog-7.jpg",
    date: "December 15, 2023",
    comments: 20,
    title: "Productivity Hacks: Organic Methods for Entrepreneurs",
    slug: "productivity-hacks-organic-entrepreneurs",
    small: true,
  },
  {
    id: 8,
    img: "/assets/img/org-blog-8.jpg",
    date: "January 10, 2024",
    comments: 10,
    title: "Work Smarter Together: Mastering Collaboration",
    slug: "work-smarter-mastering-collaboration",
  },
  {
    id: 9,
    img: "/assets/img/org-blog-9.jpg",
    date: "February 2, 2024",
    comments: 4,
    title: "Cultivating Health with Organic Produce",
    slug: "cultivating-health-with-organic-procedure",
    big: true,
  },
  {
    id: 10,
    img: "/assets/img/org-blog-10.jpg",
    date: "December 15, 2023",
    category: "Organic",
    title: "Embrace Rainy Days With a Comforting Tea.",
    slug: "embrace-rainy-days-with-a-comforting-tea",
  },
  {
    id: 11,
    img: "/assets/img/org-blog-11.jpg",
    date: "January 10, 2024",
    category: "China Tea",
    title: "The Nature of Tea Captures Revitalizing Freshness.",
    slug: "the-nature-of-tea-captures-revitalizing-freshness",
  },
  {
    id: 12,
    img: "/assets/img/org-blog-12.jpg",
    date: "February 2, 2024",
    category: "Organic",
    title: "Tea Carries Natural Freshness Akin to The Outdoors.",
    slug: "tea-carries-natural-freshness-akin-to-the-outdoors",
  },
  {
    id: 13,
    img: "/assets/img/org-blog-13.jpg",
    mainImg: "/assets/img/rv-9-blog-1.jpg",
    comments: 5,
    date: "December 15, 2023",
    title: "Technology & Solutions For Saving The Environment.",
    slug: "technology-solutions-for-saving-the-environment",
  },
  {
    id: 14,
    img: "/assets/img/org-blog-14.jpg",
    mainImg: "/assets/img/rv-9-blog-2.jpg",
    comments: 5,
    date: "January 10, 2024",
    title: "Techniques to Ensure The Continuity of Wildlife.",
    slug: "techniques-to-ensure-the-continuity-of-wildlife",
  },
  {
    id: 15,
    img: "/assets/img/org-blog-15.jpg",
    mainImg: "/assets/img/rv-6-blog-1.jpg",
    comments: 5,
    date: "February 2, 2024",
    title: "3 Incentives For Emphasizing Community Building.",
    slug: "incentives-for-emphasizing-community-building.",
  },
];

const bannerData2 = [
  {
    id: 1,
    subTitle: "Heavenly Signature Tea",
    title: "Locate The Supreme Tailors Studio in Proximity.",
    slideStyle: "rv-12-banner__slide",
  },
  {
    id: 2,
    subTitle: "Heavenly Signature Tea",
    title: "Discover a World of Flavor in Every Teapot.",
    slideStyle: "rv-12-banner__slide rv-12-banner__slide--2",
  },
  {
    id: 3,
    subTitle: "Heavenly Signature Tea",
    title: "Elevate Your Tea Time With Our Exceptional Flavors.",
    slideStyle: "rv-12-banner__slide rv-12-banner__slide--3",
  },
];

export {
  shopData,
  serviceData,
  testimonialData,
  pricingData,
  portfolioData,
  teamData,
  blogData,
  categoryData,
  projectData,
  testimonialData2,
  partnerData,
  bannerData,
  projectData2,
  teamData2,
  blogData2,
  galleryData,
  speakersData,
  accordionData,
  projectData3,
  teamData3,
  productDetailsImage,
  blogData3,
  bannerData2,
};
