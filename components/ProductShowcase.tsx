"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBag, MessageCircle, Search, ChevronLeft, ChevronRight, X, ArrowRight } from "lucide-react";

const WHATSAPP_NUMBER = "2347035088106";
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const PAGE_SIZE = 8;

// ─── Types ────────────────────────────────────────────────────────────────────

interface ProductImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  sku: string;
  retailPrice: number;
  stockQuantity: number;
  status: string;
  images: ProductImage[];
  categoryName?: string;
}

interface PageResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNGN(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(amount);
}

function buildWhatsAppUrl(product: Product) {
  const msg =
    `Hello Emjay! 👋\n\n` +
    `I'm interested in purchasing:\n\n` +
    `*${product.name}*\n` +
    `Price: ${formatNGN(product.retailPrice)}\n` +
    `SKU: ${product.sku}\n\n` +
    `Please help me place an order. Thank you! 😊`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-100 rounded-lg w-3/4" />
        <div className="h-3 bg-gray-100 rounded-lg w-1/2" />
        <div className="h-10 bg-gray-100 rounded-full mt-2" />
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const primaryImg =
    product.images?.find((img) => img.isPrimary) ?? product.images?.[0];
  const inStock = product.status === "ACTIVE" && product.stockQuantity > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {primaryImg ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={primaryImg.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-gray-200" />
          </div>
        )}

        {/* Out of stock overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white/90 text-ink text-xs font-semibold px-3 py-1.5 rounded-full shadow">
              Out of Stock
            </span>
          </div>
        )}

        {/* Category badge */}
        {product.categoryName && (
          <span className="absolute top-2 left-2 bg-white/90 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
            {product.categoryName}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1 gap-1.5">
        <h3 className="text-sm font-semibold text-ink leading-snug line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-ink/50 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}
        <p className="text-base font-bold text-primary mt-auto pt-1">
          {formatNGN(product.retailPrice)}
        </p>

        {/* WhatsApp CTA */}
        <a
          href={inStock ? buildWhatsAppUrl(product) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => !inStock && e.preventDefault()}
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-semibold transition-all duration-300 mt-1 ${
            inStock
              ? "bg-[#25D366] hover:bg-[#1eb355] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
        >
          <MessageCircle className="w-3.5 h-3.5" />
          {inStock ? "Order via WhatsApp" : "Unavailable"}
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // Debounce search input
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(0);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Fetch products
  const fetchProducts = useCallback(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: String(page),
      size: String(PAGE_SIZE),
      sortBy: "name",
    });

    const url = debouncedSearch
      ? `${API_URL}/api/v1/products/search?searchTerm=${encodeURIComponent(debouncedSearch)}&${params}`
      : `${API_URL}/api/v1/products?${params}`;

    fetch(url, { signal: controller.signal })
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json() as Promise<PageResponse>;
      })
      .then((data) => {
        setProducts(data.content ?? []);
        setTotalPages(data.totalPages ?? 0);
        setTotalElements(data.totalElements ?? 0);
      })
      .catch((e) => {
        if (e.name !== "AbortError")
          setError("Could not load products right now. Please try again.");
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [page, debouncedSearch]);

  useEffect(() => {
    const cleanup = fetchProducts();
    return cleanup;
  }, [fetchProducts]);

  const showPagination = !loading && totalPages > 1;

  return (
    <section id="products" className="relative py-24 md:py-32 bg-cream overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-primary/5 -translate-x-1/3 -translate-y-1/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/5 translate-x-1/3 translate-y-1/3 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-accent font-semibold text-sm tracking-widest uppercase mb-3"
          >
            Our Products
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-ink leading-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Shop Our{" "}
            <span className="text-gradient">Beauty Collection</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-ink/60 text-lg max-w-2xl mx-auto"
          >
            See something you love? Tap <strong className="text-primary">Order via WhatsApp</strong> and we'll
            sort you out — fast, easy, no fuss. Or browse the full collection below.
          </motion.p>
        </div>

        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="max-w-lg mx-auto mb-10"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30 w-4 h-4 pointer-events-none" />
            <input
              type="text"
              placeholder="Search products…"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-full border border-primary/20 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/25 text-ink text-sm placeholder:text-ink/30"
            />
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          {totalElements > 0 && !loading && (
            <p className="text-center text-xs text-ink/40 mt-2">
              {totalElements} product{totalElements !== 1 ? "s" : ""} found
            </p>
          )}
        </motion.div>

        {/* States */}
        {error ? (
          <div className="text-center py-20 text-ink/40">
            <ShoppingBag className="w-14 h-14 mx-auto mb-4 opacity-25" />
            <p className="font-medium">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 text-sm text-primary underline underline-offset-4"
            >
              Try again
            </button>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => <Skeleton key={i} />)}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-ink/40">
            <ShoppingBag className="w-14 h-14 mx-auto mb-4 opacity-25" />
            <p className="font-medium">No products found.</p>
            {searchInput && (
              <button
                onClick={() => setSearchInput("")}
                className="mt-3 text-sm text-primary underline underline-offset-4"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {showPagination && (
          <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary disabled:opacity-30 hover:bg-primary/5 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                  i === page
                    ? "bg-brand-gradient text-white shadow-md"
                    : "border border-primary/20 text-ink hover:bg-primary/5"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary disabled:opacity-30 hover:bg-primary/5 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* View all link */}
        {!loading && totalElements > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-8 border-t border-primary/10"
          >
            <p className="text-ink/50 text-sm">
              Showing <strong className="text-ink">{products.length}</strong> of{" "}
              <strong className="text-ink">{totalElements}</strong> products
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-gradient text-white font-semibold px-7 py-3 rounded-full hover:opacity-90 hover:scale-105 transition-all duration-300 shadow-md shadow-primary/25 text-sm"
            >
              View Full Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        )}

        {/* WhatsApp nudge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center bg-brand-gradient rounded-3xl px-8 py-10 text-white relative overflow-hidden shadow-2xl shadow-primary/30"
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, white 1px, transparent 1px), radial-gradient(circle at 80% 80%, white 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />
          <div className="relative z-10">
            <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-3">
              Can't find what you need?
            </p>
            <h3
              className="text-2xl sm:text-3xl font-bold mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Chat us — we stock more than what's listed.
            </h3>
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello Emjay! 👋 I'm looking for a product and couldn't find it on your website. Can you help me?")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-white text-primary font-bold px-7 py-3.5 rounded-full hover:bg-cream transition-colors duration-300 shadow-md text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              Ask us on WhatsApp
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
