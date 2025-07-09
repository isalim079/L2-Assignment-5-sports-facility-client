# SFORCE - Sports Facility Management System

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Introduction

**SFORCE** is a comprehensive sports facility management platform that revolutionizes how users discover, book, and manage sports facilities worldwide. With an intuitive interface and powerful features, users can effortlessly find the perfect venue for their athletic needs - simply select your location, date, and time, and you're ready to play!

## Features

### 🏟️ **Facility Management**
- **Comprehensive Facility Listing**: Browse through extensive sports facilities with detailed information
- **Advanced Search & Filtering**: Find facilities by name, location, and price range
- **Facility Types**: Support for both premium "Top Facilities" and standard facilities
- **Image Management**: High-quality facility images with ImgBB integration

### 📅 **Booking System**
- **Real-time Availability**: Check facility availability instantly
- **Flexible Time Slots**: Book facilities with custom time ranges
- **Booking Management**: View, track, and manage all bookings
- **Booking Status Tracking**: Monitor confirmed, unconfirmed, and cancelled bookings

### 💳 **Payment Integration**
- **Stripe Payment Gateway**: Secure payment processing
- **Transaction History**: Complete payment and booking history
- **Payment Confirmation**: Instant payment confirmation with transaction IDs

### 👥 **User Management**
- **Role-Based Access Control**: Separate admin and user dashboards
- **User Profiles**: Comprehensive user information management
- **Admin Panel**: Full administrative control over users and facilities

### 📊 **Analytics & Reporting**
- **Dashboard Analytics**: Visual charts and statistics
- **Booking Analytics**: Monthly spending and booking trends
- **Revenue Tracking**: Complete financial overview for administrators

### 🎨 **User Experience**
- **Responsive Design**: Optimized for all devices
- **Interactive UI**: Smooth animations and transitions
- **Real-time Notifications**: Instant feedback with toast notifications
- **Pagination**: Efficient data browsing with customizable page sizes

## Technology Stack

### **Frontend**
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management
- **RTK Query** - Data fetching and caching
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library

### **UI Components**
- **Shadcn/ui** - Modern component library
- **Lucide React** - Icon library
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Sonner** - Toast notifications

### **Additional Libraries**
- **Stripe** - Payment processing
- **Moment.js** - Date manipulation
- **React Fast Marquee** - Scrolling animations
- **React Rating** - Star rating components
- **Chart.js** - Data visualization
- **Animate.css** - CSS animations

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- Git

### Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd sports-facility-client
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_IMAGE_HOSTING_KEY=your_imgbb_api_key
   VITE_Payment_Gateway_PK=your_stripe_publishable_key
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_IMAGE_HOSTING_KEY` | ImgBB API key for image uploads | Yes |
| `VITE_Payment_Gateway_PK` | Stripe publishable key | Yes |

### API Configuration

The application is configured to work with the backend API. Ensure your backend server is running and accessible.

## Usage

### For Users
1. **Registration/Login**: Create an account or log in to existing account
2. **Browse Facilities**: Explore available sports facilities
3. **Filter & Search**: Use advanced filters to find perfect facilities
4. **Book Facility**: Select date, time, and make reservation
5. **Payment**: Complete booking with secure Stripe payment
6. **Manage Bookings**: View and manage all your bookings in user dashboard

### For Administrators
1. **Admin Dashboard**: Access comprehensive administrative panel
2. **Facility Management**: Add, update, or delete facilities
3. **User Management**: Manage all registered users
4. **Booking Management**: Oversee all bookings and payments
5. **Analytics**: Monitor platform performance and revenue

## API Integration

The application integrates with various external services:

- **ImgBB API**: For image hosting and management
- **Stripe API**: For payment processing
- **Backend API**: For all data operations

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── redux/              # Redux store and slices
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── assets/             # Static assets
└── shared/             # Shared components
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request


