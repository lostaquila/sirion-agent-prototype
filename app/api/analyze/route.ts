import { createClient } from '@supabase/supabase-js';
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

// Initialize OpenAI client for OpenRouter
const apiKey = process.env.OPENROUTER_API_KEY;
const openai = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: apiKey || 'dummy-key',
});

if (!apiKey || apiKey === 'dummy-key') {
  console.warn('WARNING: OPENROUTER_API_KEY is missing or invalid. API calls will fail.');
}

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'dummy-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  console.log('--- Starting Analysis Request ---');
  try {
    let contractText = '';

    // Check content type to determine how to parse
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      console.log('Processing File Upload...');
      const formData = await req.formData();
      const file = formData.get('file') as File;

      if (!file) {
        throw new Error('No file uploaded');
      }

      console.log(`File received: ${file.name} (${file.size} bytes)`);

      const arrayBuffer = await file.arrayBuffer();

      // Use pdfjs-dist to extract text
      try {
        // Dynamic import to avoid build-time issues with canvas
        const pdfjs = await import('pdfjs-dist/legacy/build/pdf.mjs');

        // Set worker to null to avoid worker loading issues in Node
        pdfjs.GlobalWorkerOptions.workerSrc = '';

        const loadingTask = pdfjs.getDocument({
          data: new Uint8Array(arrayBuffer),
          useSystemFonts: true,
        });

        const pdfDocument = await loadingTask.promise;
        console.log(`PDF Loaded. Pages: ${pdfDocument.numPages}`);

        let fullText = '';
        for (let i = 1; i <= pdfDocument.numPages; i++) {
          const page = await pdfDocument.getPage(i);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += pageText + '\n';
        }

        contractText = fullText;
        console.log('PDF Text Extraction Success. Length:', contractText.length);

      } catch (pdfError) {
        console.error('PDF Parse Error:', pdfError);
        throw new Error('Failed to parse PDF file. Please ensure it is a valid PDF.');
      }

    } else {
      console.log('Processing JSON Text Input...');
      const body = await req.json();
      contractText = body.contractText;
    }

    if (!contractText || !contractText.trim()) {
      throw new Error('No contract text found in request');
    }

    // Step 1: Identify Counterparty Name
    console.log('Step 1: Identifying Counterparty...');
    const identificationResponse = await openai.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        {
          role: 'system',
          content: 'You are a legal AI assistant. Extract the exact "Counterparty Name" from the provided contract text. Return a JSON object in this format: { "counterparty_name": "Name Here" }',
        },
        {
          role: 'user',
          content: contractText.substring(0, 20000),
        },
      ],
      response_format: { type: 'json_object' },
    });

    const idContent = identificationResponse.choices[0]?.message?.content;
    if (!idContent) throw new Error('AI returned empty response for counterparty identification');

    const idJson = JSON.parse(idContent);
    const counterpartyName = idJson.counterparty_name?.trim();

    if (!counterpartyName) {
      console.log('Step 1 Failed: No counterparty found.');
      return NextResponse.json({
        summary: 'Could not identify counterparty.',
        clause_analysis: []
      });
    }

    console.log(`Step 1 Success: Identified Counterparty: "${counterpartyName}"`);

    // Step 2: Query Supabase for existing contracts
    console.log('Step 2: Querying Supabase for existing agreements...');
    const { data: existingContracts, error: dbError } = await supabase
      .from('contracts')
      .select('content')
      .ilike('counterparty', `%${counterpartyName}%`)
      .order('id', { ascending: false })
      .limit(1);

    if (dbError) {
      console.error('Supabase Error:', dbError);
      throw new Error(`Database query failed: ${dbError.message}`);
    }

    if (!existingContracts || existingContracts.length === 0) {
      console.log('Step 2 Result: No existing contract found.');
      return NextResponse.json({
        summary: `No existing Master Agreement found for ${counterpartyName}. Safe to proceed as new agreement.`,
        clause_analysis: [],
      });
    }

    const existingText = existingContracts[0].content;
    console.log('Step 2 Success: Found existing Master Agreement.');

    // Step 3: Detailed Clause-by-Clause Comparison
    console.log('Step 3: Starting detailed AI comparison...');
    const comparisonResponse = await openai.chat.completions.create({
      model: 'anthropic/claude-3.5-sonnet',
      messages: [
        {
          role: 'system',
          content: `You are a Senior Legal Risk Analyst. Compare the NEW contract draft against the EXISTING Master Agreement. 
          
          For each of the following key clauses—Liability, Termination, Payment Terms, Governing Law, and Indemnity—you must provide a status update.
          
          - If the terms match, state 'Aligned' and quote both sections.
          - If the terms differ but are acceptable, state 'Variation Detected' and explain the difference.
          - If the terms contradict or increase risk, state 'Conflict' and explain the specific risk exposure.

          Return a JSON object with this structure:
          {
            "summary": "A 2-sentence executive summary of the overall risk level.",
            "clause_analysis": [
              {
                "clause_name": "Liability Cap",
                "status": "Conflict" | "Variation" | "Aligned",
                "old_term": "Capped at $50k",
                "new_term": "Capped at $1M",
                "risk_analysis": "The new draft increases liability exposure by 20x..."
              },
              ...
            ]
          }
          
          Return ONLY valid JSON.`,
        },
        {
          role: 'user',
          content: `EXISTING MASTER AGREEMENT:\n${existingText}\n\nNEW CONTRACT DRAFT:\n${contractText.substring(0, 50000)}`,
        },
      ],
      response_format: { type: 'json_object' },
    });

    const comparisonContent = comparisonResponse.choices[0]?.message?.content;
    if (!comparisonContent) throw new Error('AI returned empty response for comparison');

    const analysisResult = JSON.parse(comparisonContent);
    console.log('Step 3 Success: Analysis complete.');

    return NextResponse.json(analysisResult);

  } catch (error: any) {
    console.error('CRITICAL ERROR in /api/analyze:', error);
    return NextResponse.json(
      {
        error: error.message || 'Internal Server Error',
        details: error.toString()
      },
      { status: 500 }
    );
  }
}
