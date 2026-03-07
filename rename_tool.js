const fs = require('fs');
const path = require('path');

const claudeFile = path.join(__dirname, 'knowledge', 'Claude code skill for notebooklm slide templates.md');
const gemsFile = path.join(__dirname, 'knowledge', 'Gems Custom Instruction for notebooklm slide templates.md');

function replaceTerms(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Specifically handle some compound words first for better grammar
    content = content.replace(/NotebookLM-ready/g, 'AI-ready');
    content = content.replace(/NotebookLM-compatible/g, 'AI-compatible');
    content = content.replace(/NotebookLM-generated/g, 'AI-generated');
    content = content.replace(/NotebookLM-focused/g, 'AI-focused');
    content = content.replace(/awesome-notebookLM-prompts/g, 'awesome-ai-slide-prompts');

    // Replace standalone variations
    content = content.replace(/NotebookLM's/gi, "the AI's");
    content = content.replace(/NotebookLM/gi, 'AI Slide Generator');
    content = content.replace(/notebooklm/g, 'ai-slide-generator');

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${filePath}`);
}

replaceTerms(claudeFile);
replaceTerms(gemsFile);

// Rename the files themselves
const newClaudeFile = path.join(__dirname, 'knowledge', 'Claude code skill for AI slide templates.md');
const newGemsFile = path.join(__dirname, 'knowledge', 'Gems Custom Instruction for AI slide templates.md');

fs.renameSync(claudeFile, newClaudeFile);
fs.renameSync(gemsFile, newGemsFile);

console.log('Files successfully updated and renamed.');
