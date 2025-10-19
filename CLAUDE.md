# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Start development server**: `npm run dev` (runs on localhost:8081)
- **Build for production**: `npm run build`
- **Build for development**: `npm run build:dev`
- **Lint code**: `npm run lint`
- **Preview build**: `npm run preview`

## Project Architecture

This is a **React + TypeScript + Vite** application for Blue Orange Nexus, a digital agency website. Built with modern web technologies and a focus on performance.

### Core Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom configurations
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: React Router DOM with nested routes
- **Backend**: Supabase for database and authentication
- **Internationalization**: i18next with support for pt-BR, pt-PT, en, es
- **Forms**: React Hook Form with Zod validation

### Application Structure

The app has three main sections:

1. **Public Website** (`/`) - Marketing site with services, blog, contact forms
2. **Admin Panel** (`/admin/*`) - Content management for blog articles and users
3. **SaaS Dashboard** (`/saas/*`) - Comprehensive project management system

### Key Directories

- `src/pages/` - Route components organized by section (blog/, services/, saas/, admin/)
- `src/components/` - Reusable components including complete shadcn/ui library
- `src/hooks/` - Custom React hooks for data fetching, forms, and business logic
- `src/integrations/supabase/` - Database client and type definitions
- `src/i18n/` - Internationalization setup with locale files

### Authentication & Data Management

- **Supabase Client**: Configured in `src/integrations/supabase/client.ts`
- **Authentication**: Custom auth provider with role-based access (admin, user)
- **Data Fetching**: TanStack Query hooks in `src/hooks/use*Queries.tsx`
- **Mutations**: Separate mutation hooks for CRUD operations

### Routing Architecture

- **Public routes**: Marketing pages, blog articles, services
- **Protected admin routes**: Blog management, user administration
- **SaaS routes**: Nested under `/saas` with comprehensive dashboard features
- **Dynamic blog routes**: Support for both static and dynamic article pages

### Form Handling

- All forms use React Hook Form with Zod schemas
- Multi-step forms supported (see `src/pages/Agendar.tsx`)
- Form state persistence with local storage hooks

### Internationalization

- Default language: Portuguese (Brazil) `pt-BR`
- Supported: Portuguese (Portugal), English, Spanish
- Language detection from browser/localStorage
- Translation files in `src/i18n/locales/`

### Development Notes

- Uses `@` alias for `src/` directory imports
- Component library follows shadcn/ui patterns
- Extensive use of custom hooks for separation of concerns
- Type-safe Supabase integration with generated types
- Mobile-responsive design with Tailwind utilities