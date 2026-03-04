# NotebookLM Slide Design Templates

This guide outlines how to leverage **NotebookLM's** customization features to create professional, brand-aligned slide decks. By using strategic prompts and external resources, you can transform standard outputs into high-end presentations.

---

## 🛠️ Native Customization Workflow

NotebookLM provides built-in tools to adjust the core structure of your slides before generation.

### 1. Access the Customization Panel
- Open the **Studio Panel** on the right side of the interface.
- Select **"Slide Deck"** and click the **Pencil Icon** (Edit) to open the customization settings.

### 2. Configure Key Parameters
*   **Format**: 
    *   *Detailed Deck*: Comprehensive, text-heavy slides for independent reading.
    *   *Presenter Slides*: Visual-first with concise key points for live talks.
*   **Length**: Choose between *Short*, *Default*, or *Long*.
*   **Language**: Support for 35+ languages.
*   **Custom Prompt**: The most critical field for defining visual aesthetics.

---

## 🎨 Crafting Custom Design Prompts

The "Custom Prompt" field allows you to specify a complete design system. For best results, include details on:

| Element | Examples |
| :--- | :--- |
| **Visual Style** | Bold and playful, Modern Minimalist, Magazine Editorial, Tech-Forward. |
| **Color Palette** | "Dark mode with neon cyan accents", "White background with deep navy text". |
| **Typography** | "Large dynamic serif fonts", "Clean geometric sans-serif for body text". |
| **Layout** | Asymmetrical, Bauhaus-inspired, High negative space, Grid-based. |
| **Focus** | "Designed for executive stakeholders", "Educational for beginners". |

### **Starter Template:**
```text
Create a deck using a [Style] aesthetic. Use a [Color Palette] with [Font Type] typography. Focus on [Layout Strategy] and ensure the tone is [Tone].
```

---

## 📚 Proven Style Templates

The **[awesome-notebookLM-prompts](https://github.com/serenakeyitan/awesome-notebookLM-prompts)** repository is a curated collection of field-tested designs.

### 📰 Modern Newspaper (Swiss Style)
> **Goal:** High-impact, authoritative business media look.
```text
Role: Top art director for a new-economy business media.
Style: Swiss International Typographic Style (Bauhaus).
Palette: White (#FFFFFF) or Cool Gray (#F5F5F5) background, Black (#111111) text, Electric Yellow (#FFCC00) accents.
Layout: Ultra-massive headlines (30-50% area), asymmetrical, bold negative space.
```

### 📖 Sophisticated Magazine
> **Goal:** High-end editorial feel, perfect for lifestyle or creative pitches.
```text
Style: Mature-cute, sophisticated magazine-style editorial.
Palette: Matte pink background (Dusty/Shell pink).
Visuals: Large cutout photos with movement, asymmetric speech bubbles, L-shaped crop marks.
```

### 🚀 Tech/Modern (Anti-Gravity Style)
> **Goal:** Professional, clean, and forward-thinking.
```text
Concept: Anti-Gravity / Living Artifact Presentation.
Palette: Pure white background, soft blue → cyan → violet gradients.
Typography: Clean modern sans-serif, medium-bold.
Layout: High negative space, thin-line icons, left-aligned with wide margins.
```

---

## 🏢 MonoMind Brand Alignment

For **MonoMind** consulting materials, use a workflow that ensures consistency across all AI-generated collateral.

### 1. Brand Parameter Checklist
- **Primary Colors**: Purple accent (`#8B5CF6`), Black/White base.
- **Aesthetic**: AI-Native, Minimalist, Sophisticated.
- **Tone**: Technical but approachable.

### 2. Copy-Paste Reusable Brand Prompt
```text
Design a presentation deck for an AI-first digital agency (MonoMind). 
Visuals: Clean white or light gray background with subtle geometric accents.
Colors: Primary accent #8B5CF6 (Purple).
Typography: Modern bold sans-serif headings. 
Layout: Minimalist with high negative space.
Aesthetic: Tech-forward and professional.
```

---

## 🔧 Post-Processing & Tools

1.  **Export to PPTX**: NotebookLM supports downloading as PowerPoint files.
2.  **Final Polish**: Import the PPTX into **Canva** or **PowerPoint** to apply master slides and brand-specific assets.
3.  **Citations**: Use the [Citation Checker Skill](https://github.com/serenakeyitan/citation-check-skill) to verify generated data.

### 🔗 Useful Links
- [Official Guide: 8 Ways to Maximize Slides](https://blog.google/innovation-and-ai/models-and-research/google-labs/8-ways-to-make-the-most-out-of-slide-decks-in-notebooklm/)
- [Awesome NotebookLM Prompts Repo](https://github.com/serenakeyitan/awesome-notebookLM-prompts)