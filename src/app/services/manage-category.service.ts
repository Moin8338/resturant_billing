import { Injectable, OnInit } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ManageCategoryService {
  supabaseurl: string = 'https://uywhiabrkqfimzmgekbp.supabase.co';
  supabasekey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5d2hpYWJya3FmaW16bWdla2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NjEyOTMsImV4cCI6MjA1MjIzNzI5M30.Uo17MHASbydKqeBpO5a8K3V3nnxy4OimF8KzkrhvHCU';
  supabase!: SupabaseClient;


  categories: Array<any> = [];
  constructor() {
    this.supabase = createClient(this.supabaseurl, this.supabasekey);
  }

  async getCategories() {
    try {
      let { data: categories_su, error } = await this.supabase
        .from('category')
        .select('id,name,description').eq('restaurant_id' , '1');

      if (error) {
        console.error('Error fetching data:', error);
        return [];
      } else {
        this.categories = (categories_su || []).map(category => ({
          id: category.id,
          name: category.name,
          description: category.description
        }));
        return this.categories;
      }
    } catch (err) {
      console.error('Error in getSupabaseData:', err);
      return [];
    }
  }

  async deleteCateory(id: number) {

    try {
      const { error } = await this.supabase
        .from('category')
        .delete()
        .eq('id', id)
        .eq('restaurant_id' , '1');
      if (error) {
        console.log('Error During Delete Category : ', error);
        return null;
      }
      else {
        return 'Success';
      }

    } catch (error) {
      console.error(error);
      return null;
    }

  }

  // ----------------------------Create category -----------------------------

  async createCategory(category: any) {
    try {

      const { data, error } = await this.supabase
        .from('category')
        .insert([
          { name: category.name, description: category.description, restaurant_id: '1' },
        ])
        .select()
      if (error) {
        console.log('Error During add category : ', error);
        return null;
      }
      else {
        return data;
      }

    } catch (error) {
      console.error(error);
      return null;
    }
  }


// ------------------------------ Update Category ----------------------------------
  async updateCategory(category: any) {
    try {

      const { data, error } = await this.supabase
        .from('category')
        .update({ name: category.name, description: category.description  })
        .eq('id', category.id)
        .eq('restaurant_id' , '1')
        .select()
        if (error) {
          return error;
        }
        else{
          return data;
        }
    } catch (error) {
        return error;
    }
  }

}



