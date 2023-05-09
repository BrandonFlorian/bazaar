export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          name: string
          price: number
          seller_id: string
          sku: string | null
          status: string
          stock: number
          sub_category: string | null
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          name: string
          price: number
          seller_id: string
          sku?: string | null
          status: string
          stock: number
          sub_category?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          name?: string
          price?: number
          seller_id?: string
          sku?: string | null
          status?: string
          stock?: number
          sub_category?: string | null
          updated_at?: string
        }
      }
      users: {
        Row: {
          account_status: string
          address: string | null
          bio: string | null
          city: string | null
          country: string | null
          created_at: string
          date_of_birth: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          phone_number: string | null
          postal_code: string | null
          profile_image_url: string | null
          role: string
          state: string | null
          updated_at: string
          username: string
        }
        Insert: {
          account_status: string
          address?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          phone_number?: string | null
          postal_code?: string | null
          profile_image_url?: string | null
          role: string
          state?: string | null
          updated_at?: string
          username: string
        }
        Update: {
          account_status?: string
          address?: string | null
          bio?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          date_of_birth?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          phone_number?: string | null
          postal_code?: string | null
          profile_image_url?: string | null
          role?: string
          state?: string | null
          updated_at?: string
          username?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
