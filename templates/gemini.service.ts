import { GoogleGenerativeAI } from '@google/generative-ai';
import type { AuditReport } from '../types';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

const responseSchema: Record<string, any> = {
  type: "object",
  properties: {
    domain: { type: "string", description: "The domain name being audited" },
    overallScore: { type: "number", description: "Overall SEO score (0-100)" },
    subscores: {
      type: "object",
      properties: {
        crawlability: { type: "number" },
        onPage: { type: "number" },
        aiReadiness: { type: "number" },
      },
      required: ["crawlability", "onPage", "aiReadiness"],
    },
    suggestions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          issue: { type: "string" },
          impact: { type: "string" },
          fix: { type: "string" },
          evidence: { type: "string" },
          category: { type: "string" },
        },
      },
    },
  },
  required: ["domain", "overallScore", "subscores", "suggestions"]
};

export async function analyzeWebsite(domain: string, plan: string = 'FREE'): Promise<AuditReport> {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: responseSchema as any,
      },
    });

    const suggestionLimit = plan === 'FREE' ? 6 : plan === 'PRO' ? 15 : 50;

    const prompt = `Analyze the website "${domain}" for SEO and AI Search Readiness.

Provide a comprehensive audit that includes:
1. Overall SEO score (0-100)
2. Crawlability score
3. On-Page SEO score
4. AI Search Readiness score
5. Top ${suggestionLimit} actionable suggestions

For each suggestion, provide:
- Issue: What's the problem?
- Impact: How does it affect rankings?
- Fix: How to solve it?
- Evidence: What did you find?
- Category: Technical/Content/Structure/AI

Return ONLY valid JSON matching the schema.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const parsed = JSON.parse(text);

    return {
      ...parsed,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to analyze website');
  }
}
