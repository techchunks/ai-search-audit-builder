# Deployment Guide

## Vercel Deployment

### Prerequisites
- GitHub repository with your AI Search Audit project
- Vercel account (free tier available)
- Environment variables configured

### Step 1: Push to GitHub

```bash
git remote add origin https://github.com/YOUR_ORG/ai-search-audit.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repository
4. Vercel auto-detects Vite configuration
5. Add environment variables:
   - `VITE_GEMINI_API_KEY`
   - `VITE_STRIPE_PUBLIC_KEY`
   - `VITE_STRIPE_PRICE_ID_PRO`
   - `VITE_STRIPE_PRICE_ID_MANAGED`
6. Click "Deploy"

### Step 3: Configure Custom Domain (Optional)

1. In Vercel dashboard, go to Settings → Domains
2. Add your custom domain
3. Update DNS records at your domain registrar
4. Vercel provides SSL automatically

## Environment Variables

### Development (.env.local)
```
VITE_GEMINI_API_KEY=your_key
VITE_STRIPE_PUBLIC_KEY=pk_test_...
VITE_STRIPE_PRICE_ID_PRO=price_...
VITE_STRIPE_PRICE_ID_MANAGED=price_...
```

### Production (Vercel)
Same variables, but with production keys:
- Use `pk_live_` for Stripe public key
- Use live Gemini API key

## Monitoring

### Vercel Analytics
- Dashboard shows deployment history
- Performance metrics
- Error tracking

### Error Handling
- Check Vercel logs for build errors
- Use browser DevTools for client-side issues
- Monitor Stripe webhook events

## Scaling

### Performance Optimization
- Vercel automatically optimizes images
- Edge caching enabled by default
- CDN distribution worldwide

### Database (if added)
- Use managed services (Supabase, PlanetScale)
- Configure connection pooling
- Set up backups

## Rollback

If deployment fails:
1. Go to Vercel dashboard
2. Select previous deployment
3. Click "Redeploy"
