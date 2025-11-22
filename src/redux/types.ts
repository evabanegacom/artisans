const { createAction } = require('@reduxjs/toolkit');

const startLoading = createAction('START_LOADING');

const successLoading = createAction('SUCCESS_LOADING');

const failureLoading = createAction('FAILURE_LOADING');

export interface Sale {
    id: number;
    sale_id: string;
    status: string;
    created_at: string;
    downloaded_at: string | null;
    buyer_name: string;
    buyer_email: string;
    product_name: string;
    product_image: string;
    product_category: string;
    store_name: string;
    amount_formatted: string;
  }
  
  export interface PaginationTypes {
    current_page: number;
    total_pages: number;
    total_sales: number;
    per_page: number;
    has_next: boolean;
    has_prev: boolean;
  }
  
  export interface Summary {
    total_revenue: string;
    total_orders: number;
    completed_orders: number;
    pending_orders: number;
  }
