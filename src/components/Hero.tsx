import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/hooks/useProducts";
import { shopifyImage, shopifyImageSrcSet } from "@/lib/shopify";

export const Hero = () => {
  const { data: products } = useProducts();
  const featured = products?.[0];
  const featuredImage = featured?.node.images.edges[0]?.node;

  return (
    <section className="relative overflow-hidden bg-hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 md:pt-16 pb-16 md:pb-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-border text-xs font-medium"
          >
            <Sparkles className="w-3 h-3 text-accent" />
            New drop — built for the scroll
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="font-display mt-5 text-[14vw] sm:text-7xl lg:text-[7.5rem] font-bold tracking-[-0.04em] leading-[0.92] text-balance"
          >
            Tiny upgrades.
            <br />
            <span className="italic font-medium bg-accent-gradient bg-clip-text text-transparent">
              massive vibes.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-lg text-base md:text-lg text-muted-foreground text-balance"
          >
            Obsession-worthy products engineered for the algorithm generation. Free US shipping,
            ships in 24 hours, 30-day guarantee.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-9 flex flex-col sm:flex-row gap-3"
          >
            <Button
              size="lg"
              className="h-14 px-8 text-base bg-foreground text-background hover:bg-accent rounded-full"
              asChild
            >
              <a href="#bestsellers">
                Shop the drop <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-8 text-base rounded-full border-foreground/20" asChild>
              <Link to="/about">Our story</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Free US shipping</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> Ships in 24h</span>
            <span className="inline-flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-accent" /> 30-day refund</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lift bg-secondary">
            {featuredImage && (
              <img
                src={shopifyImage(featuredImage.url, 1200)}
                srcSet={shopifyImageSrcSet(featuredImage.url, [600, 900, 1200, 1600])}
                sizes="(min-width: 1024px) 40vw, 100vw"
                alt={featuredImage.altText ?? featured?.node.title ?? "Featured product"}
                fetchPriority="high"
                width={800}
                height={1000}
                className="w-full h-full object-cover"
              />
            )}
            <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent text-background">
              {featured && (
                <Link
                  to="/product/$handle"
                  params={{ handle: featured.node.handle }}
                  className="inline-flex items-center gap-2 text-sm font-semibold backdrop-blur-md bg-background/20 px-4 py-2 rounded-full hover:bg-background/30 transition"
                >
                  Shop {featured.node.title} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden md:flex absolute -left-6 top-10 items-center gap-2 px-4 py-2.5 rounded-full bg-card shadow-lift border border-border text-xs font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-accent pulse-ring" />
            Trending now
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute -bottom-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
};
