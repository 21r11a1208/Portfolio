// Replace these with real quotes from your manager, teammates, or mentors at RealPage.
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "Anish co-owned PMOrbit from zero to production. He ran user interviews in the morning and wrote specs the same evening — without losing clarity on either. That range is rare at any level.",
    name: "[ Name ]",
    role: "Senior Product Manager",
    company: "RealPage",
  },
  {
    quote:
      "What impressed me most was how quickly Anish could translate ambiguous executive asks into structured requirements the engineering team could actually build from.",
    name: "[ Name ]",
    role: "Engineering Lead",
    company: "RealPage",
  },
  {
    quote:
      "Anish doesn't just ship features — he ships the right features. He consistently asked 'why' before 'how', which is exactly the instinct you want on a 0-to-1 product.",
    name: "[ Name ]",
    role: "Director",
    company: "RealPage",
  },
];
