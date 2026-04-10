"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  SlidersHorizontal,
  X,
  ArrowLeft,
  Tag,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WHATSAPP = "2347035088106";
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const PAGE_SIZE = 16;

// ─── Types ────────────────────────────────────────────────────────────────────

interface CategoryTree {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  productCount: number;
  subcategories: CategoryTree[];
}

interface ProductImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
}

interface Product {
  id: string;
  name: string;
  description?: string;
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

type SortOption = "name" | "price_asc" | "price_desc";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNGN(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

function buildWhatsAppUrl(p: Product) {
  const msg =
    `Hello Emjay! 👋\n\n` +
    `I'm interested in:\n\n` +
    `*${p.name}*\n` +
    `Price: ${formatNGN(p.retailPrice)}\n` +
    `SKU: ${p.sku}\n\n` +
    `Please help me place an order. Thank you! 😊`;
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const arr = [...products];
  if (sort === "price_asc") arr.sort((a, b) => a.retailPrice - b.retailPrice);
  if (sort === "price_desc") arr.sort((a, b) => b.retailPrice - a.retailPrice);
  return arr; // "name" is handled server-side
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function Skeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 animate-pulse">
      <div className="aspect-square bg-gray-100" />
      <div className="p-4 space-y-2.5">
        <div className="h-4 bg-gray-100 rounded w-4/5" />
        <div className="h-3 bg-gray-100 rounded w-1/2" />
        <div className="h-10 bg-gray-100 rounded-full mt-3" />
      </div>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function ProductCard({ product, index }: { product: Product; index: number }) {
  const img = product.images?.find((i) => i.isPrimary) ?? product.images?.[0];
  const inStock = product.status === "ACTIVE" && product.stockQuantity > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.32) }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/8 transition-all duration-300 flex flex-col"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={img.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-gray-200" />
          </div>
        )}
        {!inStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-white/90 text-ink text-xs font-semibold px-3 py-1.5 rounded-full">
              Out of Stock
            </span>
          </div>
        )}
        {product.categoryName && (
          <span className="absolute top-2 left-2 bg-white/90 text-primary text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-sm">
            {product.categoryName}
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1 gap-1.5">
        <h3 className="text-sm font-semibold text-ink leading-snug line-clamp-2">
          {product.name}
        </h3>
        {product.description && (
          <p className="text-xs text-ink/50 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        )}
        <p className="text-base font-bold text-primary mt-auto pt-1">
          {formatNGN(product.retailPrice)}
        </p>
        <a
          href={inStock ? buildWhatsAppUrl(product) : undefined}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => !inStock && e.preventDefault()}
          className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-full text-xs font-semibold transition-all duration-300 mt-1 ${
            inStock
              ? "bg-[#25D366] hover:bg-[#1eb355] text-white shadow-sm hover:shadow-md hover:-translate-y-0.5"
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

// ─── Category Tree Node ───────────────────────────────────────────────────────

function CategoryNode({
  node,
  depth,
  selectedId,
  onSelect,
}: {
  node: CategoryTree;
  depth: number;
  selectedId: string | null;
  onSelect: (id: string, name: string) => void;
}) {
  const [open, setOpen] = useState(depth === 0 && node.subcategories.length > 0);
  const hasKids = node.subcategories.filter((s) => s.isActive).length > 0;
  const isSelected = selectedId === node.id;

  return (
    <div>
      <div
        className={`flex items-center justify-between rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-200 group ${
          isSelected
            ? "bg-brand-gradient text-white shadow-md shadow-primary/20"
            : "hover:bg-primary/5 text-ink"
        } ${depth > 0 ? "ml-3 text-sm" : "font-semibold"}`}
        onClick={() => {
          onSelect(node.id, node.name);
          if (hasKids) setOpen((o) => !o);
        }}
      >
        <span className={`flex-1 leading-snug ${isSelected ? "text-white" : ""}`}>
          {node.name}
          {node.productCount > 0 && (
            <span
              className={`ml-1.5 text-xs font-normal ${
                isSelected ? "text-white/70" : "text-ink/40"
              }`}
            >
              ({node.productCount})
            </span>
          )}
        </span>
        {hasKids && (
          <ChevronDown
            className={`w-4 h-4 shrink-0 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            } ${isSelected ? "text-white/80" : "text-ink/30"}`}
          />
        )}
      </div>
      <AnimatePresence initial={false}>
        {open && hasKids && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-0.5 space-y-0.5">
              {node.subcategories
                .filter((s) => s.isActive)
                .map((sub) => (
                  <CategoryNode
                    key={sub.id}
                    node={sub}
                    depth={depth + 1}
                    selectedId={selectedId}
                    onSelect={onSelect}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Category Sidebar ─────────────────────────────────────────────────────────

function CategorySidebar({
  tree,
  selectedId,
  onSelect,
  onClear,
}: {
  tree: CategoryTree[];
  selectedId: string | null;
  onSelect: (id: string, name: string) => void;
  onClear: () => void;
}) {
  const active = tree.filter((c) => c.isActive);

  return (
    <div className="space-y-1">
      <p className="text-xs font-bold text-ink/40 uppercase tracking-widest px-3 mb-3">
        Categories
      </p>

      {/* All products */}
      <div
        onClick={onClear}
        className={`flex items-center gap-2 rounded-xl px-3 py-2.5 cursor-pointer transition-all duration-200 font-semibold ${
          !selectedId
            ? "bg-brand-gradient text-white shadow-md shadow-primary/20"
            : "hover:bg-primary/5 text-ink"
        }`}
      >
        <Tag className="w-4 h-4 shrink-0" />
        <span>All Products</span>
      </div>

      {active.length === 0 ? (
        <p className="text-xs text-ink/30 px-3 py-2">No categories yet.</p>
      ) : (
        <div className="space-y-0.5">
          {active.map((node) => (
            <CategoryNode
              key={node.id}
              node={node}
              depth={0}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductsPage() {
  // Category state
  const [tree, setTree] = useState<CategoryTree[]>([]);
  const [selectedCatId, setSelectedCatId] = useState<string | null>(null);
  const [selectedCatName, setSelectedCatName] = useState<string | null>(null);

  // Product state
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  // UI state
  const [searchInput, setSearchInput] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState<SortOption>("name");
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(searchInput);
      setPage(0);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  // Fetch category tree once
  useEffect(() => {
    fetch(`${API}/api/v1/categories/tree`)
      .then((r) => r.json())
      .then((data: CategoryTree[]) => setTree(data))
      .catch(() => {}); // non-critical
  }, []);

  // Fetch products
  const fetchProducts = useCallback(() => {
    const ctrl = new AbortController();
    setLoading(true);
    setError(null);

    const params = new URLSearchParams({
      page: String(page),
      size: String(PAGE_SIZE),
      sortBy: "name",
    });

    let url: string;
    if (debouncedSearch) {
      url = `${API}/api/v1/products/search?searchTerm=${encodeURIComponent(debouncedSearch)}&${params}`;
    } else if (selectedCatId) {
      url = `${API}/api/v1/products/category/${selectedCatId}?${params}`;
    } else {
      url = `${API}/api/v1/products?${params}`;
    }

    fetch(url, { signal: ctrl.signal })
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
          setError("Could not load products. Please try again.");
      })
      .finally(() => setLoading(false));

    return () => ctrl.abort();
  }, [page, debouncedSearch, selectedCatId]);

  useEffect(() => {
    const cleanup = fetchProducts();
    return cleanup;
  }, [fetchProducts]);

  const handleCategorySelect = (id: string, name: string) => {
    setSelectedCatId(id);
    setSelectedCatName(name);
    setPage(0);
    setSearchInput("");
    setDrawerOpen(false);
  };

  const handleClearCategory = () => {
    setSelectedCatId(null);
    setSelectedCatName(null);
    setPage(0);
    setDrawerOpen(false);
  };

  const displayedProducts = sortProducts(products, sort);

  return (
    <>
      <Navbar />

      {/* ── Hero strip ──────────────────────────────────────────────────── */}
      <div className="bg-brand-gradient pt-28 pb-14 px-5 sm:px-8 text-white text-center relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div className="relative max-w-3xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
          <h1
            className="text-4xl sm:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Our Beauty Collection
          </h1>
          <p className="text-white/75 text-lg">
            Premium cosmetics, skincare, hair care and more — all in one place.
          </p>
        </div>
      </div>

      {/* ── Body ────────────────────────────────────────────────────────── */}
      <div className="bg-cream min-h-screen">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">

          {/* ── Top bar: search + sort + mobile filter btn ──────────────── */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {/* Search */}
            <div className="relative flex-1">
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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="border border-primary/20 bg-white rounded-full px-4 py-3 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-primary/25 shadow-sm cursor-pointer"
            >
              <option value="name">Sort: A–Z</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>

            {/* Mobile filter toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 border border-primary/20 bg-white rounded-full px-4 py-3 text-sm text-ink shadow-sm"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Categories
              {selectedCatName && (
                <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                  1
                </span>
              )}
            </button>
          </div>

          {/* Active filter breadcrumb */}
          {(selectedCatName || debouncedSearch) && (
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-xs text-ink/40">Filtering by:</span>
              {selectedCatName && (
                <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                  {selectedCatName}
                  <button onClick={handleClearCategory}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {debouncedSearch && (
                <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                  "{debouncedSearch}"
                  <button onClick={() => setSearchInput("")}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {totalElements > 0 && !loading && (
                <span className="text-xs text-ink/40 ml-auto">
                  {totalElements} result{totalElements !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          )}

          {/* ── Two-column layout ────────────────────────────────────────── */}
          <div className="flex gap-8">

            {/* Sidebar (desktop) */}
            <aside className="hidden lg:block w-60 shrink-0">
              <div className="bg-white rounded-2xl border border-primary/8 shadow-sm p-4 sticky top-24">
                <CategorySidebar
                  tree={tree}
                  selectedId={selectedCatId}
                  onSelect={handleCategorySelect}
                  onClear={handleClearCategory}
                />
              </div>
            </aside>

            {/* Product grid */}
            <div className="flex-1 min-w-0">
              {error ? (
                <div className="text-center py-24 text-ink/40">
                  <ShoppingBag className="w-14 h-14 mx-auto mb-4 opacity-25" />
                  <p className="font-medium mb-3">{error}</p>
                  <button
                    onClick={fetchProducts}
                    className="text-sm text-primary underline underline-offset-4"
                  >
                    Try again
                  </button>
                </div>
              ) : loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                  {Array.from({ length: PAGE_SIZE }).map((_, i) => (
                    <Skeleton key={i} />
                  ))}
                </div>
              ) : displayedProducts.length === 0 ? (
                <div className="text-center py-24 text-ink/40">
                  <ShoppingBag className="w-14 h-14 mx-auto mb-4 opacity-25" />
                  <p className="font-medium">No products found.</p>
                  {(searchInput || selectedCatId) && (
                    <button
                      onClick={() => {
                        setSearchInput("");
                        handleClearCategory();
                      }}
                      className="mt-3 text-sm text-primary underline underline-offset-4"
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
                  {displayedProducts.map((p, i) => (
                    <ProductCard key={p.id} product={p} index={i} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {!loading && totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10 flex-wrap">
                  <button
                    onClick={() => setPage((p) => Math.max(0, p - 1))}
                    disabled={page === 0}
                    className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary disabled:opacity-30 hover:bg-primary/5 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                    // Show ellipsis for large page counts
                    const totalShown = Math.min(totalPages, 7);
                    let pageNum = i;
                    if (totalPages > 7) {
                      if (page < 4) pageNum = i;
                      else if (page > totalPages - 4) pageNum = totalPages - totalShown + i;
                      else pageNum = page - 3 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setPage(pageNum)}
                        className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${
                          pageNum === page
                            ? "bg-brand-gradient text-white shadow-md"
                            : "border border-primary/20 text-ink hover:bg-primary/5"
                        }`}
                      >
                        {pageNum + 1}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                    disabled={page === totalPages - 1}
                    className="w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center text-primary disabled:opacity-30 hover:bg-primary/5 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── WhatsApp nudge banner ────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-16">
          <div className="bg-brand-gradient rounded-3xl px-8 py-10 text-white text-center relative overflow-hidden shadow-2xl shadow-primary/30">
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <div className="relative z-10">
              <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-2">
                Can't find what you need?
              </p>
              <h3
                className="text-2xl font-bold mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Chat us — we stock more than what's listed here.
              </h3>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
                  "Hello Emjay! 👋 I'm looking for a product I couldn't find on your website. Can you help me?"
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary font-bold px-7 py-3.5 rounded-full hover:bg-cream transition-colors shadow-md text-sm"
              >
                <MessageCircle className="w-4 h-4" />
                Ask us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile category drawer ───────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setDrawerOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <span className="font-bold text-ink">Browse Categories</span>
                <button
                  onClick={() => setDrawerOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-ink/50"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <CategorySidebar
                  tree={tree}
                  selectedId={selectedCatId}
                  onSelect={handleCategorySelect}
                  onClear={handleClearCategory}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
