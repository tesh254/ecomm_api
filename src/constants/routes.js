export default {
  api: {
    root: "/api/v1",
    auth: {
      signin: "/in",
      signup: "/join",
      social_auth: "/auth",
      verify: "/email-verify/:token",
      password_reset: "/password-reset/:token",
      password_reset_email_endpoint: "/password-reset/email",
      activate: "/activate",
      confirm: "/confirm/:id",
      checker: "/seller-account-checker"
    },
    profile: {
      get: "/user/:username",
      update: "/profile",
      create: "/profile",
      all: "/users",
      by_email: "/user/:email"
    },
    product: {
      all: "/products",
      single: "/products/:product_id",
      by_category: "/products/category/:category_name",
      by_style: "/products/style/:style_name",
      by_store: "/products/store/:store_id",
      all_styles: "/styles",
      all_categories: "/categories"
    },
    order: {
      all: "/orders",
      single: "/orders/:order_id",
      checkout: "/orders/checkout",
      user_orders: "/orders/user"
    },
    checkout: "/checkout"
  }
};
