# Google Gemini API Setup

## Prerequisites
- Google account
- Access to Google AI Studio

## Step 1: Get API Key

1. Go to https://aistudio.google.com
2. Click "Get API Key"
3. Create new API key in Google Cloud
4. Copy the key

## Step 2: Configure Environment

Add to `.env.local`:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

## Step 3: API Quotas

### Free Tier
- 60 requests per minute
- Generous daily limits
- No credit card required

### Paid Tier
- Higher rate limits
- Pay per request
- Recommended for production

## Step 4: Testing

### Test Query
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
const result = await model.generateContent("Hello!");
console.log(result.response.text());
```

## Models Available

- `gemini-2.0-flash` - Fastest, best for real-time
- `gemini-1.5-pro` - Most capable
- `gemini-1.5-flash` - Balanced

## Structured Responses

For audit reports, use JSON schema:

```typescript
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: { /* schema */ },
  },
});
```

## Rate Limiting

- Monitor usage in Google Cloud Console
- Implement exponential backoff for retries
- Cache responses when possible

## Troubleshooting

### "API key not valid"
- Verify key is copied correctly
- Check environment variable name
- Ensure key is in `.env.local`

### "Quota exceeded"
- Check rate limits
- Implement request queuing
- Consider upgrading tier

### "Invalid request"
- Verify schema matches response
- Check prompt format
- Ensure model name is correct
