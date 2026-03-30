import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  priceId: string;
  interval: 'month' | 'year';
  features: string[];
}

export const pricingPlans: PricingPlan[] = [
  {
    id: 'pro',
    name: 'Pro',
    price: 49,
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID_PRO || '',
    interval: 'month',
    features: [
      'Everything in Free',
      'Up to 15 suggestions per scan',
      'Advanced analysis tools',
      'Internal linking graph',
      'Competitor comparison',
      'Historical tracking',
      'Priority email support',
    ],
  },
  {
    id: 'managed',
    name: 'Managed',
    price: 499,
    priceId: import.meta.env.VITE_STRIPE_PRICE_ID_MANAGED || '',
    interval: 'month',
    features: [
      'Everything in Pro',
      'Unlimited suggestions',
      'Dedicated account manager',
      'Custom optimization strategy',
      'Weekly strategy calls',
      'API access',
      'White-label reports',
    ],
  },
];

export async function createCheckoutSession(priceId: string, email: string) {
  try {
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        priceId,
        email,
        successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/pricing`,
      }),
    });

    if (!response.ok) throw new Error('Failed to create checkout session');

    const session = await response.json();
    const stripe = await stripePromise;

    if (!stripe) throw new Error('Stripe failed to load');

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) throw new Error(result.error.message);
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
}

export async function getStripe() {
  return stripePromise;
}
