---
name: ai-search-audit-builder
description: Build production-ready AI Search Audit tools with React, TypeScript, Tailwind CSS, Google Gemini AI, and Stripe payments. Use for creating SaaS platforms that analyze websites for SEO and AI search readiness with freemium pricing models.
---

# AI Search Audit Builder Skill

Build high-end, production-ready AI Search Audit applications that analyze websites for SEO and AI search readiness. This skill provides a complete workflow for creating freemium SaaS platforms with Gemini AI integration and Stripe payment processing.

## What This Skill Provides

- **Complete project setup** with Vite, React, TypeScript, and Tailwind CSS
- **Reusable components** for audit flows, pricing pages, and payment checkout
- **AI integration** with Google Gemini 2.0 Flash for website analysis
- **Payment processing** with Stripe for subscription management
- **Deployment ready** with Vercel configuration and environment setup
- **Professional design** with modern UI patterns and animations

## When to Use This Skill

Use this skill when you need to:
- Build a website audit/analysis SaaS platform
- Create an AI-powered analysis tool with freemium pricing
- Integrate Gemini AI for structured data analysis
- Set up Stripe payments for subscription management
- Deploy to Vercel with automatic GitHub integration

## Quick Start

### 1. Initialize Project

```bash
bash /home/ubuntu/skills/ai-search-audit-builder/scripts/setup_project.sh my-audit-tool
cd my-audit-tool
```

This creates a complete Vite + React + TypeScript project with:
- Tailwind CSS configured
- Stripe and Framer Motion installed
- Git repository initialized
- `.env.example` template

### 2. Configure Environment

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API keys:
- `VITE_GEMINI_API_KEY` - Get from https://aistudio.google.com
- `VITE_STRIPE_PUBLIC_KEY` - Get from https://stripe.com
- `VITE_STRIPE_PRICE_ID_PRO` - Create product in Stripe
- `VITE_STRIPE_PRICE_ID_MANAGED` - Create product in Stripe

See `references/gemini-setup.md` and `references/stripe-setup.md` for detailed setup.

### 3. Generate Components

Create new components using the generator:

```bash
python /home/ubuntu/skills/ai-search-audit-builder/scripts/generate_components.py component MyComponent
python /home/ubuntu/skills/ai-search-audit-builder/scripts/generate_components.py page MyPage
```

### 4. Copy Service Templates

Copy service templates to your project:

```bash
cp /home/ubuntu/skills/ai-search-audit-builder/templates/gemini.service.ts src/services/
cp /home/ubuntu/skills/ai-search-audit-builder/templates/stripe.service.ts src/services/
cp /home/ubuntu/skills/ai-search-audit-builder/templates/types.ts src/
```

### 5. Build Core Pages

Create these essential pages:

**Home.tsx** - Landing page with domain input
**Audit.tsx** - Audit report with scores and suggestions
**Pricing.tsx** - Pricing tiers with upgrade buttons
**Checkout.tsx** - Stripe checkout flow
**Success.tsx** - Payment confirmation page

### 6. Deploy to Vercel

```bash
git push origin main
# Go to https://vercel.com/new
# Import your GitHub repository
# Add environment variables
# Deploy!
```

See `references/deployment.md` for detailed instructions.

## Architecture

### Project Structure

```
src/
├── components/
│   ├── Navbar.tsx          - Navigation with branding
│   ├── Footer.tsx          - Footer with links
│   ├── ScoreCircle.tsx     - Animated score indicator
│   ├── SuggestionCard.tsx  - Audit suggestion card
│   ├── LockedSection.tsx   - Premium feature placeholder
│   ├── EmailGate.tsx       - Lead capture modal
│   └── LoadingState.tsx    - Animated loading
├── pages/
│   ├── Home.tsx            - Landing page
│   ├── Audit.tsx           - Audit report
│   ├── Pricing.tsx         - Pricing page
│   ├── Checkout.tsx        - Payment checkout
│   └── Success.tsx         - Payment confirmation
├── services/
│   ├── gemini.ts           - Gemini AI integration
│   ├── stripe.ts           - Stripe payment integration
│   └── api.ts              - Backend API calls
├── types.ts                - TypeScript definitions
├── App.tsx                 - Main app with routing
└── index.css               - Global styles with Tailwind
```

## Key Components

### ScoreCircle
Animated circular progress indicator for audit scores.

```tsx
<ScoreCircle score={85} label="Overall" size="md" />
```

### SuggestionCard
Card displaying actionable audit suggestions.

```tsx
<SuggestionCard suggestion={suggestion} index={0} />
```

### LockedSection
Blurred card for premium features.

```tsx
<LockedSection title="Advanced Feature" description="..." />
```

## Services

### Gemini Service

Analyze websites using Google Gemini AI:

```typescript
import { analyzeWebsite } from './services/gemini';

const report = await analyzeWebsite('example.com', 'FREE');
// Returns: AuditReport with scores and suggestions
```

### Stripe Service

Handle subscription payments:

```typescript
import { createCheckoutSession } from './services/stripe';

await createCheckoutSession(priceId, email);
// Redirects to Stripe checkout
```

## Customization

### Branding

Edit `src/components/Navbar.tsx` to change logo and brand name.

### Colors

Modify `tailwind.config.js` to customize the color palette.

### Pricing Tiers

Edit `src/services/stripe.ts` to add/remove pricing plans.

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Go to https://vercel.com/new
3. Import repository
4. Add environment variables
5. Deploy

See `references/deployment.md` for detailed steps.

## API Setup

### Google Gemini API

1. Visit https://aistudio.google.com
2. Click "Get API Key"
3. Copy key to `.env.local`

See `references/gemini-setup.md` for details.

### Stripe API

1. Create account at https://stripe.com
2. Create products and prices
3. Copy keys to `.env.local`

See `references/stripe-setup.md` for details.

## Troubleshooting

### Build Errors

```bash
rm -rf node_modules .vite
npm install
npm run build
```

### API Key Issues

- Verify key format (starts with `pk_test_` or `pk_live_`)
- Check `.env.local` file exists
- Ensure no extra spaces in keys

### Stripe Checkout Not Loading

- Check public key is correct
- Verify price IDs exist in Stripe
- Check browser console for errors

### Gemini Analysis Fails

- Verify API key is valid
- Check rate limits in Google Cloud Console
- Ensure domain is accessible

## Security

- Never commit `.env.local` to Git
- Use environment variables for all secrets
- Validate email addresses before checkout
- Implement CSRF protection
- Use HTTPS only in production

## Performance Tips

- Use Vercel Edge Functions for API routes
- Cache Gemini responses in database
- Implement request debouncing
- Use React.memo for heavy components
- Lazy load pages with React.lazy()

## Next Steps

1. Customize branding and colors
2. Add database for storing reports
3. Implement user authentication
4. Create admin dashboard
5. Add email notifications
6. Set up analytics tracking

## Resources

- **scripts/**: Automation scripts for project setup and component generation
- **references/**: Detailed guides for Gemini, Stripe, and Vercel deployment
- **templates/**: Reusable service files and configuration templates
