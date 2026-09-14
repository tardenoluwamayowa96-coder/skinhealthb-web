export type Brand = {
  id: number;
  slug: string;
  name: string;
  country: string | null;
  verified: boolean;
};

export type Category = {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  sort_order: number;
};

export type ProductCard = {
  id: number;
  slug: string;
  name: string;
  brand_id: number;
  brand_name: string;
  brand_slug: string;
  category_id: number;
  category_slug: string;
  category_name: string;
  price_xof: number;
  compare_at_xof: number | null;
  stock: number;
  image_url: string;
  format_label: string | null;
  skin_types: string | null;
  is_featured: boolean;
  is_new: boolean;
  is_bestseller: boolean;
  is_active: boolean;
};

export type ProductDetail = ProductCard & {
  description: string;
  ingredients: string | null;
  usage_tips: string | null;
  precautions: string | null;
  origin: string | null;
  authenticity_note: string | null;
  sku: string | null;
  hair_types: string | null;
  lot_number: string | null;
  expires_on: string | null;
};

export type PublicSettings = {
  announcement: string;
  whatsapp: string;
  paygate_test_mode: boolean;
  store_phone: string;
  store_email: string;
  flooz_number: string;
  tmoney_number: string;
};

