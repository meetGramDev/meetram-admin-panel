<div align="center">
    <h1>
        <a href="https://admin.meetgram.org/">Meetgram Admin Panel</a>
    </h1>
    <h4><b>This is the codebase for the Meetgram Admin Panel.</b></h4>
    <h4>
        <a href="#links">Links</a>
        •
        <a href="#features">Features</a>
        •
        <a href="#stack">Tech stack</a>
        •
        <a href="#structure">Project structure</a>
    </h4>
    <h3>
        <a href="https://admin.meetgram.org/">
            <img src="https://img.shields.io/website?url=http%3A%2F%2Fmeetgram.org%2F">
        </a>
        <a href="https://www.github.com/meetGramDev/meetram-admin-panel/commits/dev">
            <img src="https://img.shields.io/github/last-commit/meetGramDev/meetram-admin-panel?color=blue&label=updated">
        </a>
        <span>
            <img src="https://img.shields.io/badge/licence-%C2%A9-orange">
        </span>
    </h3>
</div>

#### A comprehensive administrative dashboard built with Next.js for managing the Meetgram platform. This admin panel provides a robust interface for managing users, posts, payments, and other platform features.

# Links

The different hosted versions of the website can be found at the following locations, where the staging server is the site based-on the latest `dev`:

- 🌐 **Production: https://admin.meetgram.org**
- 🧪 **Staging: https://meetram-admin-panel.vercel.app**

## Features

- 🌐 **Internationalization**: Supports multiple languages (English, Russian, Belarusian, Spanish, Ukrainian)
- 👥 **User Management**: View and manage user profiles and their data
- 📝 **Posts Management**: Monitor and moderate all platform posts
- 💳 **Payment Tracking**: View and manage payment transactions
- 📊 **Analytics Dashboard**: Track platform metrics and performance
- 🔒 **Authentication**: Secure admin authentication system

## 🛠 Stack

- **Framework**: Next.js 14
- **Styling**: TailwindCSS, SCSS
- **State Management**: Apollo Client
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Custom UI Kit (@meetgram/ui-kit)
- **API**: GraphQL with Apollo Client
- **Internationalization**: next-intl
- **Development Tools**: TypeScript, ESLint, Prettier, Stylelint
- **Testing**: Storybook

## 📁 Structure

```
├── app/                    # Next.js app directory with route groups
│   ├── [locale]/          # Internationalized routes
│   ├── (auth)/            # Authentication routes
│   └── (with-sidebar)/    # Main dashboard routes
├── src/
│   ├── app_layer/         # Application-wide configurations
│   ├── entities/          # Business entities
│   ├── features/          # Feature modules
│   ├── pages_layer/       # Page components
│   ├── shared/            # Shared utilities and components
│   └── widgets/           # Complex UI components
└── dictionaries/          # Translation files
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:production` - Build with production env
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run storybook` - Start Storybook development
- `npm run api-codegen` - Generate GraphQL types
