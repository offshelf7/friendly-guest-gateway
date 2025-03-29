
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';
import { v4 as uuidv4 } from 'https://esm.sh/uuid@9.0.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { items, amount, email, name, phone, address } = await req.json();
    
    if (!items || items.length === 0 || !amount) {
      throw new Error('Invalid order data');
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    );

    // Get authentication data if present
    let user = null;
    const authHeader = req.headers.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data } = await supabaseClient.auth.getUser(token);
      user = data.user;
    }

    // Generate a unique transaction reference
    const txRef = `CHAPA-${uuidv4()}`;

    // Create payload for Chapa API
    const payload = {
      amount: amount,
      currency: 'ETB',
      email: email,
      first_name: name.split(' ')[0],
      last_name: name.split(' ').slice(1).join(' '),
      tx_ref: txRef,
      callback_url: `${req.headers.get('origin')}/booking-success?tx_ref=${txRef}`,
      return_url: `${req.headers.get('origin')}/booking-success?tx_ref=${txRef}`,
      customization: {
        title: 'Hotel Food Order',
        description: 'Payment for food and drinks',
      },
      "meta": {
        user_id: user?.id || 'anonymous',
        order_items: JSON.stringify(items.map(item => ({ 
          id: item.id,
          name: item.name, 
          quantity: item.quantity 
        }))),
        phone: phone,
        address: address
      }
    };

    // Make request to Chapa API
    const response = await fetch('https://api.chapa.co/v1/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('CHAPA_SECRET_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const chapaData = await response.json();

    if (!response.ok) {
      throw new Error(chapaData.message || 'Failed to initialize Chapa transaction');
    }

    // Store transaction in database for future reference
    const { error: orderError } = await supabaseClient.from('orders').insert([
      {
        user_id: user?.id || null,
        total_amount: amount,
        status: 'pending',
        payment_intent_id: txRef,
        shipping_address: {
          name,
          email,
          phone,
          address
        }
      }
    ]);

    if (orderError) {
      console.error('Error storing order:', orderError);
    }

    return new Response(
      JSON.stringify({ url: chapaData.data.checkout_url }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error creating Chapa checkout session:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});
