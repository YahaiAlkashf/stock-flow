CREATE TABLE `categories` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `products` (
  `id` integer PRIMARY KEY,
  `category_id` integer,
  `name` varchar(255),
  `nots` varchar(255),
  `barcode` varchar(255),
  `cost_price` decimal,
  `sale_price` decimal,
  `quantity` integer,
  `min_quantity` integer,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `clients` (
  `id` integer PRIMARY KEY,
  `name` varchar(255),
  `phone_number` varchar(255),
  `notes` text,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `invoices` (
  `id` integer PRIMARY KEY,
  `invoice_number` varchar(255),
  `client_id` integer,
  `total_amount` decimal,
  `discount` decimal,
  `final_amount` decimal,
  `paid_amount` decimal,
  `remaining_amount` decimal,
  `total_profit` decimal,
  `status` varchar(255),
  `payment_method` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `invoice_items` (
  `id` integer PRIMARY KEY,
  `invoice_id` integer,
  `product_id` integer,
  `quantity` integer,
  `unit_price` decimal,
  `unit_cost` decimal,
  `subtotal` decimal,
  `profit` decimal
);

CREATE TABLE `payments` (
  `id` integer PRIMARY KEY,
  `client_id` integer,
  `invoice_id` integer,
  `amount` decimal,
  `payment_method` varchar(255),
  `notes` text,
  `created_at` timestamp,
  `updated_at` timestamp
);

ALTER TABLE `products` ADD FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`);

ALTER TABLE `invoices` ADD FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

ALTER TABLE `invoice_items` ADD FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`);

ALTER TABLE `invoice_items` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`client_id`) REFERENCES `clients` (`id`);

ALTER TABLE `payments` ADD FOREIGN KEY (`invoice_id`) REFERENCES `invoices` (`id`);
