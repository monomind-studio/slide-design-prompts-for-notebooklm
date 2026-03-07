require('dotenv').config();
const fs = require('fs');
const { OpenAI } = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are an expert Presentation Prompt Designer. Your task is to rewrite a given NotebookLM prompt template to precisely match the following highly structured format, without changing its core theme or color scheme.

CRITICAL INSTRUCTIONS:
1. REMOVE LIMITS: Remove any limits on the number of slides or word/character counts per slide.
2. EXPAND LAYOUTS: Add 3 dynamic layout options for the slide-generating AI:
   - Layout A: The Hook (Title & Vision)
   - Layout B: The Proof (KPIs & Revenue/Specs)
   - Layout C: The Strategy (Comparison or Flow)
3. TYPOGRAPHY: Generalize fonts. Replace specific web fonts (like "Barlow" or "JetBrains Mono") with standard descriptive terms (e.g., "Massive, bold condensed sans-serif" or "Monospace").
4. STRUCTURE: STRICTLY follow the section headers provided in the Sample Prompt exactly. Ensure there is a "Layout Intelligence" section.
5. VISUAL CONTRAST & FOOTER: Ensure high legibility contrast rules and ALWAYS add this critical line: "CRITICAL: Every slide MUST include a small, subtle copyright note in the footer: 'monomind by 1TM'."
6. TRANSLATION: The original templates contain rough Korean translations or odd terms. FIX THESE to sound natural and professional in English. (e.g., "24city energy" -> "24hr Convenient Store", "dwelling" -> "Residential", "UniversitiesA" -> "Campus/Academic"). Correct any other awkward phrasing to professional corporate English.
7. NO WRAPPING: Output ONLY the raw structured text. Do NOT include phrases like "### OUTPUT FORMAT" or "Here is the rewritten prompt". Start immediately with "Role: ". Do not include closing conversational text.

Role: [High-impact 1-sentence role]
Aesthetic: "[Theme Name]" — [1-sentence description of the visual vibe].

Core Design System:

Palette: [Primary Background]. Primary Text: [Main Text]. Secondary Text: [Sub Text]. Accents: [Accent 1] and [Accent 2].

Typography: [Title Typography instructions]. [Body Typography instructions]. [KPI Typography instructions].

Layout Intelligence:

Title/Cover: [Cover slide instructions].

KPI/Spec Slides: [Spec slide instructions].

Comparison/Data: [Comparison and data slide instructions].

Visual Elements: [Visual imagery instructions].
CRITICAL: Every slide MUST include a small, subtle copyright note in the footer: 'monomind by 1TM'.

Tone: [Tone description].

📋 Individual Layout Prompts
Use these if you want to regenerate specific slides for better precision.

Layout A: The Hook (Title & Vision)
"[Prompt for Layout A]"

Layout B: The Proof (KPIs & Revenue/Specs)
"[Prompt for Layout B]"

Layout C: The Strategy (Comparison/Options)
"[Prompt for Layout C]"`;

async function processPrompts() {
    const rawData = fs.readFileSync('prompts_seed.json', 'utf8');
    const prompts = JSON.parse(rawData);

    // We already generated about 60, let's load what we have to prevent re-running
    let savedProgress = [];
    if (fs.existsSync('prompts_seed_v2.json')) {
        savedProgress = JSON.parse(fs.readFileSync('prompts_seed_v2.json', 'utf8'));
        console.log(`Loaded ${savedProgress.length} previously saved prompts.`);
    }

    const testPrompts = prompts;
    const updatedPrompts = [...savedProgress];

    // Start index based on what we already completed
    const startIndex = savedProgress.length;

    // Process in batches of 5 concurrently to respect OpenAI rate limits while being faster
    const BATCH_SIZE = 5;
    const delay = (ms) => new Promise(res => setTimeout(res, ms));

    for (let i = startIndex; i < testPrompts.length; i += BATCH_SIZE) {
        const batch = testPrompts.slice(i, i + BATCH_SIZE);
        console.log(`Processing batch ${i + 1} to ${Math.min(i + BATCH_SIZE, testPrompts.length)} of ${testPrompts.length}...`);

        const promises = batch.map(async (promptObj, index) => {
            try {
                const response = await openai.chat.completions.create({
                    model: "gpt-4o",
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        { role: "user", content: `Rewrite this template:\n\n${promptObj.template}` }
                    ],
                    temperature: 0.2,
                });

                return {
                    ...promptObj,
                    template: response.choices[0].message.content.trim()
                };
            } catch (error) {
                console.error(`Failed to process ${promptObj.title}:`, error.message);
                return promptObj; // Fallback to original on failure
            }
        });

        // Run batch concurrently
        const batchResults = await Promise.all(promises);
        updatedPrompts.push(...batchResults);

        fs.writeFileSync('prompts_seed_v2.json', JSON.stringify(updatedPrompts, null, 2));
        console.log(`Saved intermediate progress (total: ${updatedPrompts.length}).`);

        // Wait briefly between batches
        await delay(1000);
    }

    console.log('Full batch completed and saved to prompts_seed_v2.json');
}

processPrompts();
