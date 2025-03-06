import { Injectable, OnInit  } from '@angular/core';
import { createClient,SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService implements OnInit {
  supabaseurl : string = 'https://uywhiabrkqfimzmgekbp.supabase.co';
  supabasekey : string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV5d2hpYWJya3FmaW16bWdla2JwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NjEyOTMsImV4cCI6MjA1MjIzNzI5M30.Uo17MHASbydKqeBpO5a8K3V3nnxy4OimF8KzkrhvHCU';
  supabase! : SupabaseClient;

  
  categories: Array<any> = [];
  constructor() {
    this.supabase = createClient(this.supabaseurl, this.supabasekey);
  }

  async ngOnInit(): Promise<void> {
    await this.getSupabaseData(); 
    // localStorage.setItem('food-category', JSON.stringify(this.categories)); 
    console.log(this.categories);// Wait for the data to be fetched
   // console.log(this.categories);  // Log categories once they are populate
  }
  async getSupabaseData(){
    try {
      let { data: categories_su, error } = await this.supabase
        .from('category')
        .select(`
          *,
          items (
            id,
            name,
            description,
            price
          )
        `).eq('restaurant_id', '1');

      if (error) {
        console.error('Error fetching data:', error);
        //return [];
      } else {
        this.categories = (categories_su || []).map(category => ({
          id: category.id,
          name: category.name,
          items: category.items || [] // Ensure items is always an array
        }));
        localStorage.setItem("food-category", JSON.stringify(this.categories));// Return the fetched data
         //this.categories; 
      }
    } catch (err) {
      console.error('Error in getSupabaseData:', err);
      //return [];
    }
  }

  // async fetchData() {
  //   // Call to fill the categories array
   
  // }
 



  flag = 0;

 async getAllItem(){
    try {
      let { data: categories_su, error } = await this.supabase
        .from('category')
        .select(`
          *,
          items (
            id,
            name,
            description,
            price
          )
        `).eq('restaurant_id', '1');

      if (error) {
        console.error('Error fetching data:', error);
        return [];
      } else {
        this.categories = (categories_su || []).map(category => ({
          id: category.id,
          name: category.name,
          items: category.items || [] // Ensure items is always an array
        }));
        // localStorage.setItem("food-category", JSON.stringify(this.categories));// Return the fetched data
         //this.categories; 
         return this.categories;
      }
    } catch (err) {
      console.error('Error in getSupabaseData:', err);
      return [];
    }
    //return JSON.parse (this.categories);
    // return JSON.parse(localStorage.getItem("food-category") || '{}');
  }


  async getCategories() {

    try {
      let { data: categories_su, error } = await this.supabase
        .from('category')
        .select(`
          *,
          items (
            id,
            name,
            description,
            price
          )
        `).eq('restaurant_id', '1');

      if (error) {
        console.error('Error fetching data:', error);
        return [];
      } else {
        this.categories = (categories_su || []).map(category => ({
          id: category.id,
          name: category.name,
          items: category.items || [] // Ensure items is always an array
        }));
        // localStorage.setItem("food-category", JSON.stringify(this.categories));// Return the fetched data
         //this.categories; 
         return this.categories;
      }
    } catch (err) {
      console.error('Error in getSupabaseData:', err);
      return [];
    }

  //   this.categories;
    // this.categories = JSON.parse(localStorage.getItem("food-category") || '{}');
  }

  setCategories() {
    // localStorage.setItem("food-category", JSON.stringify(this.categories));
  }

  addItem(ctegoryId: any, item: any): any {

    this.getCategories();

    this.flag = 0;
    this.categories.forEach((category: any) => {
      if (category.id == ctegoryId) {
        category.items.push(item);
        this.flag = 1;
      }
    });
    if (this.flag == 0) {
      return false;
    }
    else {
      this.setCategories();
      return this.categories;
    }

  }

  updateItem(RequestItem: any): any {

    this.getCategories();

    this.flag = 0;
    this.categories.forEach((category: any) => {
      category.items.forEach((item: any) => {
        if (item.id == RequestItem.id) {
          item = RequestItem;
          this.flag = 1;
        }
      });
    });
    if (this.flag == 0) {
      return false;
    }
    else {
      this.setCategories();
      return this.categories;
    }

  }


  deleteItem(RequestItem: any): any {

    this.getCategories();

    this.flag = 0;
    this.categories.forEach((category: any) => {
      category.items.forEach((item: any) => {
        if (item.id == RequestItem.id) {
          category.splice(category.indexOf(item), 1);
          this.flag = 1;
        }
      });
    });
    if (this.flag == 0) {
      return false;
    }
    else {
      this.setCategories();
      return this.categories;
    }

  }

  getItemByCategory(categoryId: any): any {
    this.getCategories();
    let filteredCategory: any;
    this.categories.forEach(category => {
      if (category.id == categoryId) {
        filteredCategory = category.items;
      }
    });
    return filteredCategory;
  }


  getOrderByTable(table: any) {
    return localStorage.getItem(table);
  }

}
