-- Criar tabelas para gerenciamento completo do site
CREATE TABLE IF NOT EXISTS public.site_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES public.site_pages(id) ON DELETE CASCADE,
  name text NOT NULL,
  type text NOT NULL,
  content jsonb,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.menus (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text DEFAULT 'header',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_id uuid REFERENCES public.menus(id) ON DELETE CASCADE,
  parent_id uuid REFERENCES public.menu_items(id) ON DELETE CASCADE,
  title text NOT NULL,
  url text,
  order_index integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.redirects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_path text NOT NULL,
  destination_url text NOT NULL,
  type text NOT NULL CHECK (type IN ('301', '302', '308')) DEFAULT '301',
  is_regex boolean DEFAULT false,
  priority integer DEFAULT 0,
  notes text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.seo_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES public.site_pages(id) ON DELETE CASCADE,
  meta_title text,
  meta_description text,
  keywords text[],
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  twitter_title text,
  twitter_description text,
  twitter_image text,
  structured_data jsonb,
  noindex boolean DEFAULT false,
  nofollow boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.site_header (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text,
  logo_alt text,
  menu_id uuid REFERENCES public.menus(id),
  cta_text text,
  cta_url text,
  show_search boolean DEFAULT false,
  theme_color text DEFAULT '#3B82F6',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.site_footer (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  columns jsonb,
  social_links jsonb,
  copyright_text text,
  legal_menu_id uuid REFERENCES public.menus(id),
  theme_color text DEFAULT '#1F2937',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.automation_workflows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  trigger_type text NOT NULL,
  trigger_config jsonb,
  actions jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  config jsonb,
  data jsonb,
  generated_at timestamptz DEFAULT now(),
  created_by uuid,
  created_at timestamptz DEFAULT now()
);

-- Habilitar RLS nas novas tabelas
ALTER TABLE public.site_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redirects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seo_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_header ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_footer ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Authenticated users can manage site_sections" ON public.site_sections FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage menus" ON public.menus FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage menu_items" ON public.menu_items FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage redirects" ON public.redirects FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage seo_settings" ON public.seo_settings FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage site_header" ON public.site_header FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage site_footer" ON public.site_footer FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage automation_workflows" ON public.automation_workflows FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can manage reports" ON public.reports FOR ALL USING (auth.uid() IS NOT NULL);

-- Triggers para updated_at
CREATE TRIGGER update_site_sections_updated_at BEFORE UPDATE ON public.site_sections FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_menus_updated_at BEFORE UPDATE ON public.menus FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_menu_items_updated_at BEFORE UPDATE ON public.menu_items FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_redirects_updated_at BEFORE UPDATE ON public.redirects FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_seo_settings_updated_at BEFORE UPDATE ON public.seo_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_header_updated_at BEFORE UPDATE ON public.site_header FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_footer_updated_at BEFORE UPDATE ON public.site_footer FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_automation_workflows_updated_at BEFORE UPDATE ON public.automation_workflows FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();