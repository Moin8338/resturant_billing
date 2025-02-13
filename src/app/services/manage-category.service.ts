import { Injectable, OnInit  } from '@angular/core';
import { createClient,SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class ManageCategoryService {
 supabaseurl : string = 'https://uywhiabrkqfimzmgekbp.supabase.co';
  supabasekey : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5d2hpYWJya3FmaW16bWdla2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NjEyOTMsImV4cCI6MjA1MjIzNzI5M30.Uo17MHASbydKqeBpO5a8K3V3nnxy4OimF8KzkrhvHCU';
  supabase! : SupabaseClient;

  
  categories: Array<any> = [];
  constructor() {
    this.supabase = createClient(this.supabaseurl, this.supabasekey);
  }

  async getCategories(){
    try {
      let { data: categories_su, error } = await this.supabase
        .from('category')
        .select('id,name,description');

      if (error) {
        console.error('Error fetching data:', error);
        return [];
      } else {
        this.categories = (categories_su || []).map(category => ({
          id: category.id,
          name: category.name,
          description : category.description
        }));
         return this.categories;
      }
    } catch (err) {
      console.error('Error in getSupabaseData:', err);
      return [];
    }
  }

  async deleteCateory(id : number) {
        
      try {
        const { error } = await this.supabase
        .from('category')
        .delete()
        .eq('id', id);
        if (error) {
          console.log('Error During Delete Category : ',error);
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

}
