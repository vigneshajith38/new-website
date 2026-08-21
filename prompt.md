Act as a senior full-stack developer, UI/UX designer, and e-commerce architect.

I am an Artificial Intelligence and Machine Learning student building a professional website for my family's utensils business. The business sells kitchen utensils, cookware, household products, storage products, bathroom products, pooja items, cutlery, dinnerware, stoves, and electronic kitchen appliances.

The website should look like a **real premium Indian kitchenware/utensils brand website**, not like a student project or generic AI-generated template.

## 1. Technology Stack

### Frontend

* Next.js using the App Router
* TypeScript
* Tailwind CSS
* Any latest professional icon library
* Responsive design for desktop, tablet, and mobile
* Component-based architecture

### Backend

* Django
* Django REST Framework
* PostgreSQL for production-ready database design
* Django Admin for managing products, categories, inventory, and orders
* REST API architecture
* Proper serializers, models, views, URLs, permissions, validation, and error handling

### Image Storage

Product images will be provided by me later for now just structure the images sections.

The architecture should allow product images to be easily added, replaced, and managed.

For development, local/static image storage can be used initially. Structure the project so that it can later be moved to Cloudinary or another production image-storage service without major code changes.

## 2. Overall Design Direction

The website must have a premium, elegant, modern kitchenware aesthetic.

Use a refined color palette based around:

* Deep green
* Warm cream/off-white
* Subtle gold accents
* Neutral charcoal/dark text
* White backgrounds where appropriate

Do not overuse gold.

The design should communicate:

* Quality
* Trust
* Premium craftsmanship
* Traditional Indian kitchenware
* Modern shopping experience

Avoid:

* Excessive gradients
* Excessive rounded cards
* Huge unnecessary text
* Cartoonish illustrations
* Excessive animations
* Neon colors
* Generic SaaS styling
* Excessive glassmorphism
* Emoji-based UI
* Visually cluttered layouts

Use icons instead of emojis.

Use Lucide icons or another consistent professional icon system for:

* Search
* Shopping cart
* User
* Menu
* Phone
* WhatsApp
* Location
* wishlist
* Filter
* Arrow
* Chevron
* Shopping bag
* Categories (filter required category added from backend)
* Account
* Orders
* Settings

Icons should be subtle and consistent.

## 3. Brand

Use the business/brand name:

Vignesh Metal Mart

The branding should feel professional and suitable for a real Indian utensils and kitchenware company.

Create a clean text-based logo treatment initially if a logo asset is not provided.

Do not invent a complicated logo.

The website should have strong visual hierarchy and consistent branding across every page.

## 4. Navigation

Create a professional responsive navbar.

Desktop navigation should include:

* Home
* Products
* Categories
* About Us
* Contact

Also include:

* Search
* Wishlist
* Account
* Cart

The navigation should remain clean and uncluttered.

On mobile, use a professional hamburger menu.

Create a sticky navbar where appropriate without making it intrusive.

## 5. Homepage

Build a high-quality homepage with the following sections.

### Hero Section

Create a premium hero section featuring the supplied product imagery.

Include:

* Strong headline
* Short supporting description
* Primary CTA: Explore Products
* Secondary CTA: Contact Us

The hero should immediately communicate that this is a premium utensils/kitchenware business.

Avoid generic marketing copy.

Use sophisticated typography and spacing.

### Featured Categories

Display major categories using attractive image cards or product imagery.

Categories should include:

* Cookware
* Household
* Pooja Items
* Cutlery
* Dinnerware
* Storage
* Bathroom
* Stoves & Electronic Appliances

Each category should link to the appropriate filtered product listing.

### Featured Products

Show selected products in a professional product grid.

Each card should contain:

* Product image
* Product name
* Product code/SKU
* Category
* Price if available
* Wishlist icon
* View Product button

Do not show fake prices.

If the price is unavailable, structure the UI for "Contact for Price" or another appropriate state.

### Why Choose Us

Create a professional section highlighting business strengths such as:

* Quality Products
* Wide Product Range
* Trusted Service
* Competitive Pricing
* Reliable Customer Support

Use icons instead of emojis.

### Brand/Business Section

Create a visually strong section explaining the business and its product philosophy.

### CTA Section

Add a premium call-to-action encouraging customers to explore the catalogue or contact the business.

### Footer

Include:

* Brand name
* Short description
* Navigation
* Categories
* Contact information
* Social links
* Location
* Copyright
* Privacy Policy
* Terms & Conditions

## 6. Product Catalogue

Create a professional product listing page.

Features:

* Search
* Category filtering
* Subcategory filtering
* Sorting
* Pagination or infinite loading
* Responsive product grid
* Product count
* Clear filter/reset functionality

Search should support product name, product code, category, and relevant searchable attributes.

Do not load hundreds of products unnecessarily on the initial page.

Use backend pagination.

## 7. Categories

Use the following primary categories:

1. Cookware
2. Household
3. Pooja Items
4. Cutlery
5. Dinnerware
6. Storage
7. Bathroom
8. Stoves & Electronic Appliances

Cookware should support subcategories such as:

* Steel
* Aluminium
* Non-Stick
* Cast Iron

The architecture must allow me to add more categories and subcategories later from Django Admin.

## 8. Product Details Page

Create a premium product details page.

Include:

* Large product image
* Image gallery if multiple images exist
* Product name
* SKU/product code
* Category
* Subcategory
* Description
* Material
* Size/capacity where applicable
* Price where available
* Stock status
* Quantity selector
* Add to Cart
* Wishlist
* Contact/WhatsApp enquiry
* Related products

The layout should be visually polished and work extremely well on mobile.

## 9. Shopping Cart

Create a proper cart system.

Include:

* Product image
* Product name
* Product code
* Quantity controls
* Remove item
* Price
* Subtotal
* Total
* Continue Shopping
* Proceed to Checkout

The cart should persist across page refreshes where appropriate.

Do not require a backend database for an anonymous cart unless necessary.

Use a clean client-side cart architecture and synchronize with the backend when the user checks out.

## 10. Checkout

Create a professional checkout flow.

Collect:

* Customer name
* Phone number
* Email
* Delivery address
* City
* State
* PIN code
* Order notes

Include:

* Order summary
* Product quantities
* Subtotal
* Delivery charge if applicable
* Final total

Design the checkout so a payment gateway can be integrated later.

Do not implement fake payment functionality.

If payment is not configured, clearly structure the system for future integration.

## 11. Order System

Django should manage:

* Customers
* Orders
* Order items
* Product information
* Product stock
* Order status

Order statuses should support:

* Pending
* Confirmed
* Processing
* Shipped
* Delivered
* Cancelled

Generate a unique order number for every order.

Do not expose sensitive customer information unnecessarily.

## 12. Django Database Architecture

Create clean Django models for at least:

### Category

Fields:

* name
* slug
* description
* image
* parent category
* active
* created_at
* updated_at

### Product

Fields:

* name
* slug
* SKU
* description
* category
* subcategory
* material
* size/capacity
* price
* sale_price if required
* stock_quantity
* image
* additional images
* active
* featured
* created_at
* updated_at

### Customer

Include appropriate customer information.

### Order

Include:

* order number
* customer
* status
* subtotal
* delivery charge
* total
* address
* created_at
* updated_at

### OrderItem

Include:

* order
* product
* quantity
* unit price
* total price

Use appropriate Django relationships, indexes, constraints, and validation.

## 13. Django Admin

Make Django Admin genuinely useful.

Admin should allow me to:

* Add products
* Edit products
* Delete/deactivate products
* Upload product images
* Set prices
* Update stock
* Mark products as featured
* Create categories
* Create subcategories
* View orders
* Change order status
* Search products
* Search orders
* Filter products
* Filter orders

Use Django Admin customizations where useful.

## 14. API Design

Create clean REST APIs.

Examples:

GET /api/products/
GET /api/products/{slug}/
GET /api/categories/
GET /api/categories/{slug}/
GET /api/products/?search=
GET /api/products/?category=
GET /api/products/?subcategory=
GET /api/products/?featured=true
POST /api/orders/
GET /api/orders/{order_number}/

Use Django REST Framework serializers and proper HTTP status codes.

Do not put business logic directly into React components.

Keep backend logic in Django.

## 15. Frontend Architecture

Organize the Next.js project professionally.

Use reusable components such as:

* Navbar
* Footer
* Hero
* CategoryCard
* ProductCard
* ProductGrid
* SearchBar
* FilterSidebar
* ProductGallery
* CartItem
* CartSummary
* Button
* Modal
* LoadingState
* EmptyState
* ErrorState

Avoid creating huge components containing everything.

Use reusable components and clean folder structure.

## 16. State Management

Use an appropriate state-management solution for:

* Cart
* Wishlist
* User state
* Filters where required

Do not introduce a large state-management library unless necessary.

Keep the architecture simple and maintainable.

## 17. API Integration

Create a centralized API layer in Next.js.

Do not scatter fetch calls throughout random components.

Handle:

* Loading
* Errors
* Empty results
* Network failures
* API validation errors

Use environment variables for backend URLs.

Example:

NEXT_PUBLIC_API_URL

Do not hardcode production API URLs throughout the codebase.

## 18. Responsive Design

The website must be fully responsive.

Test layouts for:

* Mobile
* Tablet
* Laptop
* Large desktop

Pay particular attention to:

* Navbar
* Product grids
* Product details
* Filters
* Cart
* Checkout
* Images
* Typography

The mobile experience should not feel like a reduced desktop version.

## 19. Animations

Use subtle professional animations.

Examples:

* Card hover
* Image transitions
* Button interactions
* Page transitions where appropriate
* Smooth scrolling

Keep animations fast and subtle.

Do not make the website feel like a flashy portfolio animation demo.

## 20. Accessibility

Follow accessibility best practices.

Include:

* Semantic HTML
* Proper heading hierarchy
* Alt text
* Keyboard navigation
* Visible focus states
* Accessible buttons
* Accessible forms
* Proper labels
* Sufficient contrast

Do not rely on icons alone when meaning could be unclear.

## 21. SEO

Implement professional SEO.

Include:

* Page titles
* Meta descriptions
* Open Graph metadata
* Clean URLs
* Product-friendly slugs
* Semantic HTML
* Sitemap
* robots.txt
* Structured metadata where appropriate

Product pages should have SEO-friendly URLs.

Example:

/products/stainless-steel-cookware-set

## 22. Performance

Optimize the website for production.

Use:

* Next.js image optimization
* Lazy loading where appropriate
* Backend pagination
* Efficient database queries
* Proper indexes
* Minimal unnecessary client-side JavaScript
* Caching where appropriate

Do not download all 400+ products to the browser at once.

## 23. Security

Follow production security practices.

Django:

* CSRF protection
* CORS configuration
* Environment variables
* Secure secret key
* Input validation
* Authentication/authorization
* Proper permissions
* SQL/database safety

Never expose:

* Django secret key
* Database credentials
* API keys
* Payment secrets

Do not place private secrets in NEXT_PUBLIC_ environment variables.

## 24. Product Images

I will provide the actual product images.

Build the image system around those images.

Do not use placeholder images once actual images are available.

Do not generate fake product photographs.

Create sensible image naming conventions and make the product model capable of supporting multiple images.

## 25. Business Information

Keep business-specific information configurable.

Do not hardcode business details throughout components.

Create a central configuration or backend-managed business profile containing:

* Business name
* Phone
* WhatsApp
* Email
* Address
* Google Maps location
* Social media links
* Opening hours

This will make future changes easy.

## 26. UI Quality Standard

The final UI should look comparable to a professionally designed commercial website.

Prioritize:

* Excellent spacing
* Strong typography
* Consistent alignment
* High-quality product imagery
* Clear hierarchy
* Premium color usage
* Consistent buttons
* Consistent cards
* Professional navigation
* Good whitespace
* Mobile responsiveness

Do not make every section look like a separate design.

The entire website must feel like one coherent brand.

## 27. Development Rules

IMPORTANT:

Do not generate the entire project as one giant code block.

Build it systematically.

First provide:

1. Recommended architecture
2. Folder structure
3. Database schema
4. API specification
5. Frontend page structure
6. Component architecture
7. Setup instructions

Then implement the project step-by-step.

For every implementation step:

* Explain what is being built
* Provide the exact files to create/change
* Provide complete code for those files
* Clearly indicate where each file belongs
* Do not omit important code with statements such as "rest of the code remains the same"
* Keep code production-oriented
* Ensure imports are correct
* Ensure frontend and backend APIs match
* Do not invent nonexistent files or dependencies

Before moving to the next major section, verify that the previous section is logically complete.

## 28. Coding Quality

Write clean, maintainable code.

Use:

* TypeScript types
* Django model validation
* DRF serializers
* Reusable React components
* Meaningful variable names
* Proper error handling
* Environment variables
* Separation of concerns

Avoid:

* Duplicate code
* Giant components
* Hardcoded product data
* Hardcoded API URLs
* Fake backend functionality
* Fake payment systems
* Unnecessary dependencies
* Unnecessary complexity

## 29. Future AI Integration

The architecture should be designed so AI features can be added later without rebuilding the website.

Potential future features:

* AI product recommendation
* Natural-language product search
* AI shopping assistant
* Product similarity
* Demand forecasting
* Sales analytics
* Intelligent customer support

Do not add unnecessary AI features to the first version unless requested.

First make the core website stable.

## 30. Final Goal

The final result should be a professional, production-ready utensils business platform with:

Next.js frontend
+
Django REST backend
+
PostgreSQL database
+
Django Admin
+
Professional responsive UI
+
Real product images
+
Product catalogue
+
Search/filtering
+
Product details
+
Cart
+
Checkout architecture
+
Order management
+
SEO
+
Security
+
Future AI integration capability

The result should look like a real business website that can be shown to customers and used as a serious portfolio project by an AIML student.

Start by designing the complete architecture and folder structure. Do not start by generating random UI code.
