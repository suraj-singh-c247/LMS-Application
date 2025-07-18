const headerRoutes = [
  { page: "Home", route: "/dashboard" },
  { page: "About", route: "/about" },
  { page: "Contact", route: "/contact" },
];

const footerRoutes = [
  {
    title: "About",
    routes: [
      { label: "About us", path: "/about-us" },
      { label: "Careers", path: "/careers" },
      { label: "Contact us", path: "/contact" },
      { label: "Blog", path: "/blog" },
      { label: "Investors", path: "/investors" },
    ],
  },
  {
    title: "Discover Udemy",
    routes: [
      { label: "Get the app", path: "/get-the-app" },
      { label: "Teach on coursue", path: "/teach-on-coursue" },
      { label: "Plans and Pricing", path: "/plans-pricing" },
      { label: "Affiliate", path: "/affiliate" },
    ],
  },
  {
    title: "Help and Support",
    routes: [
      { label: "Coursue for Business", path: "/coursue-for-business" },
      { label: "Coursue Business", path: "/coursue-business" },
    ],
  },
  {
    title: "Legal & Accessibility",
    routes: [
      { label: "Accessibility statement", path: "/accessibility" },
      { label: "Privacy policy", path: "/privacy-policy" },
      { label: "Sitemap", path: "/sitemap" },
      { label: "Terms", path: "/terms" },
    ],
  },
];

export { headerRoutes, footerRoutes };
