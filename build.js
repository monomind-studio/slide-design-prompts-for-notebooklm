const fs = require('fs');
const claudeContent = fs.readFileSync('Claude code skill for notebooklm slide templates.md', 'utf8');
const gemsContent = fs.readFileSync('Gems Custom Instruction for notebooklm slide templates.md', 'utf8');

const escapeHTML = (str) => str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generate Your Own Prompts | MonoMind</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&family=Playfair+Display:ital,wght@0,400;1,500;1,700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg-color: #000000;
            --text-primary: #ffffff;
            --text-secondary: #a1a1aa;
            --border-color: rgba(255, 255, 255, 0.1);
        }
        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            font-family: 'Inter', sans-serif;
            -webkit-font-smoothing: antialiased;
        }
        .serif { font-family: 'Playfair Display', serif; }
        .section-padding { padding: 80px 2rem; }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }

        .copy-btn {
            background: #2563eb;
            border: none;
            color: white;
            padding: 6px 16px;
            border-radius: 9999px;
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.12em;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            white-space: nowrap;
        }
        .copy-btn:hover { 
            background: #1d4ed8;
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
        }
        .copy-btn:active { transform: translateY(0); }
    </style>

    <meta name="description" content="Upgrade your NotebookLM slide output with our curated library of premium slide design prompts. Select an industry to begin.">
    <meta property="og:title" content="Slide Design Prompts | MonoMind">
    <meta property="og:description" content="Upgrade your NotebookLM slide output with our curated library of premium slide design prompts.">
    <meta property="og:image" content="https://prompts.monomind.one/assets/monomind.png">
    <meta property="og:url" content="https://prompts.monomind.one/">
    <meta property="og:type" content="website">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Slide Design Prompts | MonoMind">
    <meta name="twitter:description" content="Upgrade your NotebookLM slide output with our curated library of premium slide design prompts.">
    <meta name="twitter:image" content="https://prompts.monomind.one/assets/monomind.png">
</head>
<body class="overflow-x-hidden">
    <nav class="w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center">
        <div class="h-6 flex items-center gap-2 cursor-pointer transition-opacity hover:opacity-80" onclick="window.parent !== window ? window.parent.postMessage({type: 'SHOW_HOME'}, '*') : window.location.href='NotebookLM Slide Prompts by MonoMind.html'">
            <span class="text-xl font-black tracking-tighter uppercase">monomind</span>
        </div>
    </nav>
    <section class="flex flex-col px-6 md:px-12 pt-10 pb-20">
        <div class="max-w-5xl mx-auto w-full">
            <h1 class="text-5xl md:text-6xl font-black tracking-tighter mb-6">GENERATE <span class="serif italic font-medium lowercase">Your Own</span></h1>
            <p class="text-lg md:text-xl text-zinc-400 font-light mb-16 leading-relaxed max-w-3xl">
                Have an existing slide deck you love? You can extract its entire visual system and turn it into a reusable NotebookLM style prompt. Below are the specialized system instructions we use. Copy them into your preferred AI tool (Claude or Google Gems), upload your reference deck, and let it generate perfect NotebookLM prompts for you!
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
                <!-- Claude Prompt -->
                <div class="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden relative group">
                    <div class="p-8 border-b border-white/10 bg-white/[0.03] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold mb-2 flex items-center gap-3">
                                <span class="w-3 h-3 rounded-full bg-[#d97757]"></span> 
                                Claude System Prompt
                            </h2>
                            <p class="text-sm text-white/50 leading-tight">Optimized for Claude Projects or Code</p>
                        </div>
                        <button class="copy-btn shrink-0 self-start sm:self-auto" onclick="copyText('claude-content', this)">Copy Prompt</button>
                    </div>
                   <div class="p-8 h-[600px] overflow-y-auto custom-scrollbar relative">
                       <!-- We use JS to populate so formatting is preserved -->
                       <pre id="claude-content" class="text-xs text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed"></pre>
                   </div>
                </div>

                <!-- Gems Prompt -->
                <div class="border border-white/10 rounded-2xl bg-white/[0.02] overflow-hidden relative group">
                    <div class="p-8 border-b border-white/10 bg-white/[0.03] flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div class="flex-1">
                            <h2 class="text-2xl font-bold mb-2 flex items-center gap-3">
                                <span class="w-3 h-3 rounded-full bg-[#4285F4]"></span> 
                                Google Gems Instruction
                            </h2>
                            <p class="text-sm text-white/50 leading-tight">Optimized for Gems Custom Instructions</p>
                        </div>
                        <button class="copy-btn shrink-0 self-start sm:self-auto" onclick="copyText('gems-content', this)">Copy Prompt</button>
                    </div>
                   <div class="p-8 h-[600px] overflow-y-auto custom-scrollbar relative">
                       <pre id="gems-content" class="text-xs text-zinc-400 whitespace-pre-wrap font-mono leading-relaxed"></pre>
                   </div>
                </div>
            </div>
            
            <div class="mt-20 p-8 border border-white/10 rounded-xl bg-white/[0.02] max-w-3xl mx-auto text-center">
                 <h3 class="text-lg font-bold mb-4 uppercase tracking-widest">How it works</h3>
                 <ol class="text-white/60 text-sm md:text-base text-left space-y-4 font-light max-w-xl mx-auto">
                     <li><strong class="text-white">1.</strong> Copy one of the system instructions above.</li>
                     <li><strong class="text-white">2.</strong> Paste it into the 'System Instructions' of your AI tool.</li>
                     <li><strong class="text-white">3.</strong> Upload your reference slide deck (PDF or screenshots).</li>
                     <li><strong class="text-white">4.</strong> The AI will instantly generate a master NotebookLM layout prompt!</li>
                 </ol>
            </div>
        </div>
    </section>
    
    <script>
        function copyText(elementId, btn) {
            const text = document.getElementById(elementId).textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = btn.innerText;
                btn.innerText = 'Copied!';
                btn.style.background = 'white';
                btn.style.color = 'black';
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '#2563eb';
                    btn.style.color = 'white';
                    btn.style.boxShadow = 'none';
                    btn.style.transform = 'translateY(0)';
                }, 2000);
            });
        }
        
        document.getElementById('claude-content').textContent = \`${escapeHTML(claudeContent).replace(/\\/g, "\\\\").replace(/\`/g, "\\`").replace(/\$/g, "\\$")}\`;
        document.getElementById('gems-content').textContent = \`${escapeHTML(gemsContent).replace(/\\/g, "\\\\").replace(/\`/g, "\\`").replace(/\$/g, "\\$")}\`;
    </script>
</body>
</html>`;

fs.writeFileSync('pages/generator.html', htmlTemplate);
console.log('generator.html created successfully.');
