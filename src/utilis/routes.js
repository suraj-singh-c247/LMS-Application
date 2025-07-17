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
      { label: "Teach on Udemy", path: "/teach-on-udemy" },
      { label: "Plans and Pricing", path: "/plans-pricing" },
      { label: "Affiliate", path: "/affiliate" },
    ],
  },
  {
    title: "Help and Support",
    routes: [
      { label: "Udemy for Business", path: "/udemy-for-business" },
      { label: "Udemy Business", path: "/udemy-business" },
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
