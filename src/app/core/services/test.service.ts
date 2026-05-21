import { Injectable } from '@angular/core';

import { supabase } from '../supabase/supabase.client';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  async testConnection() {

    const { data, error } = await supabase
      .from('site_settings')
      .select('*');

    console.log('DATA:', data);

    console.log('ERROR:', error);

  }

}