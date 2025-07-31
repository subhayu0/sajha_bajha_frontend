# Sajha Bajha Frontend

A modern, responsive e-commerce frontend for Sajha Bajha - Premium Musical Instruments Store, built with React, Vite, and Tailwind CSS.

## 🚀 Features

### User Features
- **Homepage** - Featured products, categories, and promotional content
- **Product Catalog** - Browse and search musical instruments with filters
- **Product Details** - Detailed product information with image gallery
- **Shopping Cart** - Add, remove, and manage cart items
- **User Authentication** - Login, signup, and password recovery
- **User Dashboard** - Order history, profile management
- **Checkout Process** - Secure payment and order placement
- **Responsive Design** - Mobile-first approach with Tailwind CSS

### Admin Features
- **Admin Dashboard** - Overview of sales, orders, and inventory
- **Product Management** - Add, edit, and delete products
- **Order Management** - View and update order status
- **Customer Management** - View customer information and queries
- **Inventory Management** - Stock tracking and updates

### Technical Features
- **Modern React** - Built with React 18 and modern hooks
- **Vite Build Tool** - Fast development and optimized builds
- **Tailwind CSS** - Utility-first CSS framework
- **State Management** - Context API for global state
- **API Integration** - Axios for backend communication
- **Form Handling** - React Hook Form for form management
- **Toast Notifications** - React Hot Toast for user feedback
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - Comprehensive error boundaries and fallbacks

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Form Management**: React Hook Form
- **Notifications**: React Hot Toast
- **Icons**: Lucide React
- **Image Gallery**: React Image Gallery
- **Loading**: React Loading Skeleton
- **Pagination**: React Paginate
- **Testing**: Vitest + Testing Library

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Modal, Loading, etc.)
│   ├── Header.jsx      # Main navigation header
│   ├── Footer.jsx      # Site footer
│   └── ProductCard.jsx # Product display component
├── pages/              # Page components
│   ├── admin/          # Admin-specific pages
│   ├── HomePage.jsx    # Landing page
│   ├── ShopPage.jsx    # Product catalog
│   ├── CartPage.jsx    # Shopping cart
│   └── ...             # Other pages
├── context/            # React Context providers
│   ├── AuthContext.jsx # Authentication state
│   └── CartContext.jsx # Shopping cart state
├── hooks/              # Custom React hooks
│   ├── useLocalStorage.js
│   ├── useDebounce.js
│   └── useApi.js
├── services/           # API services
│   └── api.js          # Axios configuration and endpoints
├── utils/              # Utility functions
│   └── helpers.js      # Common helper functions
├── styles/             # Additional styles
├── assets/             # Static assets
└── __tests__/          # Test files
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sajha_bajha_frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp env.example .env
   ```
   Update the `.env` file with your configuration values.

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## 📝 Environment Variables

Copy `env.example` to `.env` and configure the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api
VITE_FRONTEND_URL=http://localhost:3000

# App Configuration
VITE_APP_NAME=Sajha Bajha
VITE_APP_DESCRIPTION=Premium Musical Instruments Store

# Cloudinary Configuration
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_DEBUG_MODE=true
```

## 🧪 Testing

### Run Tests
```bash
npm test
```

### Run Tests with Coverage
```bash
npm run test:coverage
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

## 🏗️ Build

### Development Build
```bash
npm run build:dev
```

### Production Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:coverage` - Run tests with coverage
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## 🎨 Styling

This project uses Tailwind CSS for styling. Key features:

- **Custom Color Palette** - Primary, secondary, and accent colors
- **Custom Components** - Pre-built component classes
- **Responsive Design** - Mobile-first approach
- **Dark Mode Ready** - Prepared for future dark mode implementation

### Custom CSS Classes

```css
/* Buttons */
.btn-primary, .btn-secondary, .btn-outline, .btn-ghost

/* Cards */
.card, .card-hover

/* Forms */
.input

/* Layout */
.container-custom, .section-padding

/* Utilities */
.text-gradient, .bg-gradient-primary, .animate-fade-in
```

## 🔧 Development Guidelines

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for better type safety (future enhancement)
- Write meaningful component and function names
- Add comments for complex logic

### Component Structure
```jsx
import React from 'react';
import PropTypes from 'prop-types';

const ComponentName = ({ prop1, prop2 }) => {
  // Hooks and logic here
  
  return (
    <div className="component-classes">
      {/* JSX content */}
    </div>
  );
};

ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

export default ComponentName;
```

### State Management
- Use Context API for global state (auth, cart)
- Use local state for component-specific data
- Consider Zustand for complex state management (future enhancement)

### API Integration
- Use the centralized `api.js` service
- Handle loading and error states
- Implement proper error boundaries
- Use React Query for caching (future enhancement)

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Configure environment variables

### Manual Deployment
1. Build the project: `npm run build`
2. Upload the `dist` folder to your web server
3. Configure your server to serve the SPA correctly

## 🔒 Security Considerations

- Environment variables are prefixed with `VITE_` for client-side access
- Sensitive data should be handled server-side
- Implement proper CORS configuration
- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting (server-side)

## 📱 PWA Features (Future)

- Service Worker for offline functionality
- App manifest for installable app
- Push notifications
- Background sync

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Add tests for new functionality
5. Run tests and ensure they pass
6. Commit your changes: `git commit -m 'Add feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions:
- Email: info@sajhabajha.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

## 🔗 Related Links

- [Backend Repository](../sajha_bajha_backend)
- [API Documentation](../sajha_bajha_backend/README.md#api-documentation)
- [Design System](./docs/design-system.md)
- [Component Library](./docs/components.md)
