export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_requests: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string | null
          requested_at: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          message?: string | null
          requested_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          requested_at?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      article_analytics: {
        Row: {
          article_id: string
          created_at: string | null
          id: string
          likes_count: number | null
          shares_count: number | null
          view_date: string | null
          views_count: number | null
        }
        Insert: {
          article_id: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          shares_count?: number | null
          view_date?: string | null
          views_count?: number | null
        }
        Update: {
          article_id?: string
          created_at?: string | null
          id?: string
          likes_count?: number | null
          shares_count?: number | null
          view_date?: string | null
          views_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "article_analytics_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
      articles: {
        Row: {
          author_id: string
          category: string | null
          content: string
          cover_image_url: string | null
          created_at: string | null
          id: string
          likes: number | null
          published_at: string | null
          read_time: number | null
          scheduled_at: string | null
          shares: number | null
          slug: string
          status: Database["public"]["Enums"]["article_status"] | null
          subtitle: string | null
          summary: string
          title: string
          updated_at: string | null
          views: number | null
        }
        Insert: {
          author_id: string
          category?: string | null
          content: string
          cover_image_url?: string | null
          created_at?: string | null
          id?: string
          likes?: number | null
          published_at?: string | null
          read_time?: number | null
          scheduled_at?: string | null
          shares?: number | null
          slug: string
          status?: Database["public"]["Enums"]["article_status"] | null
          subtitle?: string | null
          summary: string
          title: string
          updated_at?: string | null
          views?: number | null
        }
        Update: {
          author_id?: string
          category?: string | null
          content?: string
          cover_image_url?: string | null
          created_at?: string | null
          id?: string
          likes?: number | null
          published_at?: string | null
          read_time?: number | null
          scheduled_at?: string | null
          shares?: number | null
          slug?: string
          status?: Database["public"]["Enums"]["article_status"] | null
          subtitle?: string | null
          summary?: string
          title?: string
          updated_at?: string | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "articles_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "authors"
            referencedColumns: ["id"]
          },
        ]
      }
      authors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          id: string
          name: string
          social_links: Json | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string
          name: string
          social_links?: Json | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          id?: string
          name?: string
          social_links?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          language: string
          message: string
          name: string
          phone: string | null
          service: string | null
          status: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          language?: string
          message: string
          name: string
          phone?: string | null
          service?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          language?: string
          message?: string
          name?: string
          phone?: string | null
          service?: string | null
          status?: string | null
        }
        Relationships: []
      }
      newsletter_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          language: string
          status: string | null
          subscribed_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          language?: string
          status?: string | null
          subscribed_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          language?: string
          status?: string | null
          subscribed_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          admin_level: Database["public"]["Enums"]["admin_level"] | null
          approved: boolean | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          admin_level?: Database["public"]["Enums"]["admin_level"] | null
          approved?: boolean | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          admin_level?: Database["public"]["Enums"]["admin_level"] | null
          approved?: boolean | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      schedule_submissions: {
        Row: {
          budget: string | null
          company_name: string
          company_size: string
          created_at: string
          deadline: string
          email: string
          id: string
          language: string
          name: string
          phone: string
          prefer_calendly: boolean | null
          prefer_email: boolean | null
          prefer_phone: boolean | null
          prefer_whatsapp: boolean | null
          project_description: string
          role: string
          segment: string
          service_type: string
          status: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          budget?: string | null
          company_name: string
          company_size: string
          created_at?: string
          deadline: string
          email: string
          id?: string
          language?: string
          name: string
          phone: string
          prefer_calendly?: boolean | null
          prefer_email?: boolean | null
          prefer_phone?: boolean | null
          prefer_whatsapp?: boolean | null
          project_description: string
          role: string
          segment: string
          service_type: string
          status?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          budget?: string | null
          company_name?: string
          company_size?: string
          created_at?: string
          deadline?: string
          email?: string
          id?: string
          language?: string
          name?: string
          phone?: string
          prefer_calendly?: boolean | null
          prefer_email?: boolean | null
          prefer_phone?: boolean | null
          prefer_whatsapp?: boolean | null
          project_description?: string
          role?: string
          segment?: string
          service_type?: string
          status?: string | null
          updated_at?: string
          website?: string | null
        }
        Relationships: []
      }
      user_articles: {
        Row: {
          article_id: string
          created_at: string | null
          id: string
          user_id: string
        }
        Insert: {
          article_id: string
          created_at?: string | null
          id?: string
          user_id: string
        }
        Update: {
          article_id?: string
          created_at?: string | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_articles_article_id_fkey"
            columns: ["article_id"]
            isOneToOne: false
            referencedRelation: "articles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      approve_admin_request: {
        Args: { request_id: string }
        Returns: undefined
      }
      increment_article_likes: {
        Args: { article_slug: string }
        Returns: undefined
      }
      increment_article_shares: {
        Args: { article_slug: string }
        Returns: undefined
      }
      increment_article_views: {
        Args: { article_slug: string }
        Returns: undefined
      }
    }
    Enums: {
      admin_level: "root" | "admin"
      article_status: "draft" | "published" | "scheduled"
      request_status: "pending" | "approved" | "rejected"
      user_role: "admin" | "author_admin" | "author"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      admin_level: ["root", "admin"],
      article_status: ["draft", "published", "scheduled"],
      request_status: ["pending", "approved", "rejected"],
      user_role: ["admin", "author_admin", "author"],
    },
  },
} as const
