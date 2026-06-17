import { createFileRoute } from "@tanstack/react-router";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import { Phone, Mail, MapPin, Truck, Clock, MessageCircle, Star, Package, BadgePercent } from "lucide-react";
import heroImg from "@/assets/sweets-hero.jpg";
import heroSweets2 from "@/assets/hero-sweets-2.jpg";
import heroDairy from "@/assets/hero-dairy.jpg";
import logoImg from "@/assets/logo.png";
import kajuImg from "@/assets/sweet-kaju.jpg";
import gulabImg from "@/assets/sweet-gulab.jpg";
import laddooImg from "@/assets/sweet-laddoo.jpg";
import jalebiImg from "@/assets/sweet-jalebi.jpg";
import rasgullaImg from "@/assets/sweet-rasgulla.jpg";
import pistaImg from "@/assets/sweet-pista.jpg";
import milkImg from "@/assets/dairy-milk.jpg";
import paneerImg from "@/assets/dairy-paneer.jpg";
import dahiImg from "@/assets/dairy-dahi.jpg";
import desiGheeImg from "@/assets/dairy-desi-ghee.jpg";
import { Button } from "@/components/ui/button";

const SHOP = {
  name: "D C Bikaneri Sweets",
  tagline: "Authentic Bikaneri sweets, freshly made in Ludhiana",
  phone: "+91 99881 01000",
  phoneRaw: "919988101000",
  email: "surjeetsinghdc71@gmail.com",
  address: "Subhash Nagar, Main Road, near Greenland School, Ludhiana, Punjab 141007",
  mapsLink: "https://maps.app.goo.gl/91et7bq4Xkb6Y1Uu5",
  mapsEmbed: "https://maps.google.com/maps?q=DC+bikaneri+sweets,+Subhash+Nagar+Rd,+near+greenland+school,+Ludhiana&output=embed",
  hours: "7:00 AM – 10:00 PM • Open all days",
};

const SPECIALS = [
  { name: "Kaju Katli", desc: "Premium cashew diamonds with silver leaf", img: kajuImg },
  { name: "Gulab Jamun", desc: "Warm golden khoya dumplings, soaked sweet", img: gulabImg },
  { name: "Motichoor Laddoo", desc: "Tiny boondi pearls bound in ghee & sugar", img: laddooImg },
  { name: "Jalebi", desc: "Crisp spirals dunked in saffron syrup", img: jalebiImg },
  { name: "Rasgulla", desc: "Soft spongy cottage cheese balls in syrup", img: rasgullaImg },
  { name: "Pista Barfi", desc: "Rich pistachio milk fudge, hand-cut", img: pistaImg },
];

const DAIRY = [
  { name: "Fresh Milk", desc: "Pure, farm-fresh full-cream milk delivered daily", img: milkImg },
  { name: "Paneer", desc: "Premium paneer with a creamy bite and homemade freshness", img: paneerImg },
  { name: "Dahi & Makhan", desc: "Thick set curd & home-churned white butter", img: dahiImg },
  { name: "Premium Desi Ghee", desc: "Rich, aromatic ghee that brings purity, taste, and tradition to every bite", img: desiGheeImg },
];

const SITE_URL = "https://dcbikanerisweets.com";

// schema.org LocalBusiness data — this is what powers Google's rich/local results.
const LD_JSON = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  "@id": `${SITE_URL}/#business`,
  name: "D C Bikaneri Sweets",
  description: "Authentic Bikaneri sweets, mithai and fresh dairy in Ludhiana with same-day home delivery.",
  image: `${SITE_URL}/og-cover.jpg`,
  url: `${SITE_URL}/`,
  telephone: "+919988101000",
  email: "surjeetsinghdc71@gmail.com",
  priceRange: "₹₹",
  servesCuisine: ["Indian Sweets", "Bikaneri Mithai", "Dairy"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Subhash Nagar, Main Road, near Greenland School",
    addressLocality: "Ludhiana",
    addressRegion: "Punjab",
    postalCode: "141007",
    addressCountry: "IN",
  },
  areaServed: { "@type": "City", name: "Ludhiana" },
  hasMap: "https://maps.app.goo.gl/91et7bq4Xkb6Y1Uu5",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "22:00",
    },
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "D C Bikaneri Sweets — Best Sweet Shop in Ludhiana | Home Delivery" },
      { name: "description", content: "D C Bikaneri Sweets in Ludhiana. Authentic Bikaneri mithai — kaju katli, rasgulla, laddoo, jalebi & fresh dairy. Order on WhatsApp with same-day home delivery." },
      { property: "og:title", content: "D C Bikaneri Sweets — Best Sweet Shop in Ludhiana" },
      { property: "og:description", content: "Authentic Bikaneri sweets & fresh dairy in Ludhiana with doorstep home delivery. Call or WhatsApp to order." },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: `${SITE_URL}/og-cover.jpg` },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(LD_JSON),
      },
    ],
  }),
  component: Index,
});

const HERO_SLIDES: string[] = [heroImg, heroSweets2, heroDairy];

const QR_TARGET = "https://maps.app.goo.gl/tcjYzrZ3dJeAUzDB6?g_st=iw";

function Index() {
  const [heroIndex, setHeroIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setHeroIndex((i) => (i + 1) % HERO_SLIDES.length), 4000);
    return () => clearInterval(id);
  }, []);

  const waLink = `https://wa.me/${SHOP.phoneRaw}?text=${encodeURIComponent("Hello! I'd like to order sweets from D C Bikaneri Sweets.")}`;
  const mapsLink = SHOP.mapsLink;

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-30 backdrop-blur bg-background/80 border-b border-border">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-background ring-2 ring-primary/20">
              <img src={logoImg} alt="D C Bikaneri Sweets logo" className="h-full w-full object-cover" />
            </div>
            <div className="leading-tight">
              <div className="font-bold text-sm sm:text-base">{SHOP.name}</div>
              <div className="text-[10px] sm:text-xs text-muted-foreground">Sweetness Crafted with Care</div>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <a href="#specials" className="hover:text-primary transition">Sweets</a>
            <a href="#dairy" className="hover:text-primary transition">Dairy</a>
            <a href="#wholesale" className="hover:text-primary transition">Wholesale</a>
            <a href="#delivery" className="hover:text-primary transition">Delivery</a>
            <a href="#contact" className="hover:text-primary transition">Contact</a>
          </nav>
          <a href={waLink} target="_blank" rel="noreferrer">
            <Button size="sm" className="bg-accent text-accent-foreground hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> Order
            </Button>
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="absolute inset-0">
          {HERO_SLIDES.map((src, i) => (
            <img
              key={src}
              src={src}
              alt="D C Bikaneri Sweets — sweets and fresh dairy"
              width={1600}
              height={900}
              className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
              style={{ opacity: i === heroIndex ? 1 : 0 }}
            />
          ))}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, oklch(0.22 0.06 30 / 0.55), oklch(0.22 0.06 30 / 0.85))" }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:py-32 text-center text-primary-foreground">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-secondary text-secondary-foreground">
            ✦ LUDHIANA'S FAVOURITE MITHAI SHOP ✦
          </span>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold leading-tight">
            D C Bikaneri Sweets
          </h1>
          <p className="mt-4 text-base sm:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
            {SHOP.tagline}. Order now and we’ll deliver straight to your door.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <a href={waLink} target="_blank" rel="noreferrer">
              <Button size="lg" className="bg-accent text-accent-foreground hover:opacity-90 shadow-lg">
                <MessageCircle className="h-5 w-5" /> Order on WhatsApp
              </Button>
            </a>
            <a href={`tel:${SHOP.phoneRaw}`}>
              <Button size="lg" variant="outline" className="bg-background/10 text-primary-foreground border-primary-foreground/40 hover:bg-background/20">
                <Phone className="h-5 w-5" /> Call Now
              </Button>
            </a>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/80">
            <div className="flex items-center gap-2"><Truck className="h-4 w-4" /> Same-day home delivery</div>
            <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {SHOP.hours}</div>
            <div className="flex items-center gap-2"><Star className="h-4 w-4" /> 100% pure desi ghee</div>
          </div>
        </div>
      </section>

      {/* Specials */}
      <section id="specials" className="py-20" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Our Signature Sweets</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Hand-crafted daily using traditional Bikaneri recipes, pure ghee and the finest dry fruits.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SPECIALS.map((s) => (
              <div key={s.name} className="rounded-2xl bg-card border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-soft)" }}>
                {s.img ? (
                  <img src={s.img} alt={s.name} loading="lazy" width={1024} height={1024} className="h-48 w-full object-cover" />
                ) : (
                  <div className="h-48 w-full" style={{ background: "var(--gradient-hero)" }} />
                )}
                <div className="p-6">
                  <div className="h-1 w-12 rounded-full mb-3" style={{ background: "var(--gradient-hero)" }} />
                  <h3 className="text-xl font-bold">{s.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dairy */}
      <section id="dairy" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold text-primary">FRESH DAIRY</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Pure Milk, Paneer, Dahi & Makhan</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Sourced and prepared fresh every morning — the same quality we use in our sweets.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {DAIRY.map((d) => (
              <div key={d.name} className="rounded-2xl bg-card border border-border overflow-hidden" style={{ boxShadow: "var(--shadow-soft)" }}>
                <img src={d.img} alt={d.name} loading="lazy" width={1024} height={1024} className="h-52 w-full object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{d.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wholesale */}
      <section id="wholesale" className="py-20 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-background/15 backdrop-blur">
              WHOLESALE & BULK ORDERS
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl font-bold">Wholesale supply at the best prices</h2>
            <p className="mt-4 text-primary-foreground/90">
              We supply sweets and dairy in bulk to shops, caterers, halwais, hotels and event organisers across Punjab.
              Reliable quality, on-time delivery, and the most competitive wholesale rates in Ludhiana.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3"><BadgePercent className="h-5 w-5" /> Best wholesale prices — discounts on bulk quantity</li>
              <li className="flex gap-3"><Package className="h-5 w-5" /> Custom packing for resale, weddings & corporate gifting</li>
              <li className="flex gap-3"><Truck className="h-5 w-5" /> Bulk delivery across Ludhiana & nearby cities</li>
              <li className="flex gap-3"><Star className="h-5 w-5" /> Trusted by retailers, caterers and event planners</li>
            </ul>
            <div className="mt-8 flex gap-3 flex-wrap">
              <a href={`https://wa.me/${SHOP.phoneRaw}?text=${encodeURIComponent("Hi, I'd like a wholesale / bulk order quote from D C Bikaneri Sweets.")}`} target="_blank" rel="noreferrer">
                <Button size="lg" className="bg-accent text-accent-foreground hover:opacity-90"><MessageCircle className="h-5 w-5" /> Get Wholesale Quote</Button>
              </a>
              <a href={`tel:${SHOP.phoneRaw}`}>
                <Button size="lg" variant="outline" className="bg-background/10 text-primary-foreground border-primary-foreground/40 hover:bg-background/20"><Phone className="h-5 w-5" /> Call {SHOP.phone}</Button>
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <img src={kajuImg} alt="Bulk kaju katli" loading="lazy" width={1024} height={1024} className="rounded-2xl h-44 w-full object-cover" />
            <img src={laddooImg} alt="Bulk laddoo" loading="lazy" width={1024} height={1024} className="rounded-2xl h-44 w-full object-cover mt-6" />
            <img src={paneerImg} alt="Bulk paneer" loading="lazy" width={1024} height={1024} className="rounded-2xl h-44 w-full object-cover" />
            <img src={milkImg} alt="Bulk milk" loading="lazy" width={1024} height={1024} className="rounded-2xl h-44 w-full object-cover mt-6" />
          </div>
        </div>
      </section>

      {/* Delivery + QR */}
      <section id="delivery" className="py-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-sm font-semibold text-primary">HOME DELIVERY</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Fresh sweets, delivered to your doorstep</h2>
            <p className="mt-4 text-muted-foreground">
              We deliver across Ludhiana. Perfect for festivals, weddings, gifting, or just a sudden craving.
              Place your order on WhatsApp or call us directly.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              <li className="flex gap-3"><Truck className="h-5 w-5 text-primary" /> Same-day delivery within Ludhiana</li>
              <li className="flex gap-3"><Star className="h-5 w-5 text-primary" /> Custom gift boxes & wedding orders</li>
              <li className="flex gap-3"><Clock className="h-5 w-5 text-primary" /> Bulk orders for festivals — order in advance</li>
            </ul>
            <div className="mt-8 flex gap-3 flex-wrap">
              <a href={waLink} target="_blank" rel="noreferrer">
                <Button className="bg-accent text-accent-foreground hover:opacity-90"><MessageCircle className="h-4 w-4" /> WhatsApp Order</Button>
              </a>
              <a href={`tel:${SHOP.phoneRaw}`}>
                <Button variant="outline"><Phone className="h-4 w-4" /> {SHOP.phone}</Button>
              </a>
            </div>
          </div>

          <div className="rounded-3xl p-8 text-center" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-warm)" }}>
            <div className="text-primary-foreground">
              <h3 className="text-2xl font-bold">Scan to find us</h3>
              <p className="mt-2 text-sm text-primary-foreground/85">Point your phone camera at the QR code to open our location in Google Maps.</p>
            </div>
            <div className="mt-6 inline-block rounded-2xl bg-background p-5">
              <QRCodeSVG value={QR_TARGET} size={200} level="H" bgColor="#ffffff" fgColor="#5a1a0a" />
            </div>
            <p className="mt-4 text-xs text-primary-foreground/80 break-all">{QR_TARGET}</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20" style={{ background: "var(--gradient-warm)" }}>
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold">Get in Touch</h2>
            <p className="mt-3 text-muted-foreground">We’re always happy to take your order or answer your questions.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            <a href={`tel:${SHOP.phoneRaw}`} className="rounded-2xl bg-card p-6 border border-border hover:-translate-y-1 transition" style={{ boxShadow: "var(--shadow-soft)" }}>
              <Phone className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-bold">Call us</h3>
              <p className="text-sm text-muted-foreground mt-1">{SHOP.phone}</p>
            </a>
            <a href={waLink} target="_blank" rel="noreferrer" className="rounded-2xl bg-card p-6 border border-border hover:-translate-y-1 transition" style={{ boxShadow: "var(--shadow-soft)" }}>
              <MessageCircle className="h-7 w-7 text-accent" />
              <h3 className="mt-4 font-bold">WhatsApp</h3>
              <p className="text-sm text-muted-foreground mt-1">Chat & order instantly</p>
            </a>
            <a href={`mailto:${SHOP.email}`} className="rounded-2xl bg-card p-6 border border-border hover:-translate-y-1 transition" style={{ boxShadow: "var(--shadow-soft)" }}>
              <Mail className="h-7 w-7 text-primary" />
              <h3 className="mt-4 font-bold">Email</h3>
              <p className="text-sm text-muted-foreground mt-1 break-all">{SHOP.email}</p>
            </a>
          </div>
        </div>
      </section>

      {/* Visit / Map */}
      <section id="visit" className="py-20">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-stretch">
          <div className="flex flex-col justify-center">
            <span className="text-sm font-semibold text-primary">VISIT THE SHOP</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold">Find us in Ludhiana</h2>
            <p className="mt-4 text-muted-foreground flex items-start gap-2">
              <MapPin className="h-5 w-5 text-primary mt-0.5" /> {SHOP.address}
            </p>
            <p className="mt-2 text-muted-foreground flex items-start gap-2">
              <Clock className="h-5 w-5 text-primary mt-0.5" /> {SHOP.hours}
            </p>
            <div className="mt-6">
              <a href={mapsLink} target="_blank" rel="noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90">
                  <MapPin className="h-5 w-5" /> Get Directions
                </Button>
              </a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border border-border" style={{ boxShadow: "var(--shadow-soft)" }}>
            <iframe
              title="D C Bikaneri Sweets location in Ludhiana"
              src={SHOP.mapsEmbed}
              className="w-full h-[400px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10 bg-card">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          <div className="font-bold text-foreground text-base">{SHOP.name}</div>
          <p className="mt-1">{SHOP.address} • {SHOP.phone}</p>
          <p className="mt-3 text-xs">© {new Date().getFullYear()} {SHOP.name}. Made with love & ghee.</p>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href={waLink}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 h-14 w-14 rounded-full bg-accent text-accent-foreground grid place-items-center shadow-lg hover:scale-110 transition"
      >
        <MessageCircle className="h-7 w-7" />
      </a>
    </div>
  );
}
