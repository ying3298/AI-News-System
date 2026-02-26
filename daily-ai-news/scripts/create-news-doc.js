#!/usr/bin/env node
/**
 * Daily AI News Document Generator
 * Creates a formatted .docx file with AI news using emoji headers
 *
 * Usage: node create-news-doc.js <date> <output-path>
 * Example: node create-news-doc.js "2026-02-10" "./2026-02-10-ai-news.docx"
 */

const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = require('docx');
const fs = require('fs');

// News content structure - this will be populated by Claude before running
const newsTemplate = {
    headline: {
        emoji: "📰",
        title: "TODAY'S HEADLINE",
        content: ""
    },
    date: {
        emoji: "📅",
        content: ""
    },
    simple: {
        emoji: "😊",
        title: "TODAY IN SIMPLE WORDS",
        content: ""
    },
    tools: {
        emoji: "🛠️",
        title: "TOOLS & PRODUCTS",
        items: []
    },
    research: {
        emoji: "🔬",
        title: "RESEARCH BREAKTHROUGHS",
        items: []
    },
    business: {
        emoji: "💰",
        title: "INDUSTRY & BUSINESS",
        items: []
    },
    policy: {
        emoji: "🌐",
        title: "GOVERNMENT & POLICY",
        items: []
    },
    concerns: {
        emoji: "⚠️",
        title: "CONCERNS & QUESTIONS",
        items: []
    },
    quote: {
        emoji: "💡",
        title: "QUOTE OF THE DAY",
        text: "",
        author: ""
    },
    sources: {
        emoji: "📚",
        title: "SOURCES",
        items: []
    }
};

function createSectionHeader(emoji, title) {
    return new Paragraph({
        children: [
            new TextRun({
                text: `${emoji} ${title}`,
                bold: true,
                size: 28, // 14pt
                font: "Helvetica"
            })
        ],
        spacing: { before: 400, after: 200 }
    });
}

function createContentParagraph(text) {
    return new Paragraph({
        children: [
            new TextRun({
                text: text,
                size: 24, // 12pt
                font: "Helvetica"
            })
        ],
        spacing: { after: 200 }
    });
}

function createBulletItem(text) {
    return new Paragraph({
        children: [
            new TextRun({
                text: `• ${text}`,
                size: 24,
                font: "Helvetica"
            })
        ],
        spacing: { after: 100 },
        indent: { left: 360 }
    });
}

function createNewsDocument(newsData, dateStr) {
    const children = [];

    // Title
    children.push(new Paragraph({
        children: [
            new TextRun({
                text: "Daily AI News",
                bold: true,
                size: 48, // 24pt
                font: "Helvetica"
            })
        ],
        alignment: AlignmentType.CENTER,
        spacing: { after: 400 }
    }));

    // Headline section
    children.push(createSectionHeader(newsData.headline.emoji, newsData.headline.title));
    if (newsData.headline.content) {
        children.push(createContentParagraph(newsData.headline.content));
    }

    // Date
    children.push(new Paragraph({
        children: [
            new TextRun({
                text: `${newsData.date.emoji} ${newsData.date.content || dateStr}`,
                bold: true,
                size: 28,
                font: "Helvetica"
            })
        ],
        spacing: { before: 300, after: 300 }
    }));

    // Simple explanation
    children.push(createSectionHeader(newsData.simple.emoji, newsData.simple.title));
    if (newsData.simple.content) {
        children.push(createContentParagraph(newsData.simple.content));
    }

    // Tools & Products
    children.push(createSectionHeader(newsData.tools.emoji, newsData.tools.title));
    newsData.tools.items.forEach(item => {
        children.push(createBulletItem(item));
    });

    // Research Breakthroughs
    children.push(createSectionHeader(newsData.research.emoji, newsData.research.title));
    newsData.research.items.forEach(item => {
        children.push(createBulletItem(item));
    });

    // Industry & Business
    children.push(createSectionHeader(newsData.business.emoji, newsData.business.title));
    newsData.business.items.forEach(item => {
        children.push(createBulletItem(item));
    });

    // Government & Policy
    children.push(createSectionHeader(newsData.policy.emoji, newsData.policy.title));
    newsData.policy.items.forEach(item => {
        children.push(createBulletItem(item));
    });

    // Concerns & Questions
    children.push(createSectionHeader(newsData.concerns.emoji, newsData.concerns.title));
    newsData.concerns.items.forEach(item => {
        children.push(createBulletItem(item));
    });

    // Quote of the Day
    children.push(createSectionHeader(newsData.quote.emoji, newsData.quote.title));
    if (newsData.quote.text) {
        children.push(new Paragraph({
            children: [
                new TextRun({
                    text: `"${newsData.quote.text}"`,
                    italics: true,
                    size: 24,
                    font: "Helvetica"
                }),
                new TextRun({
                    text: ` — ${newsData.quote.author}`,
                    size: 24,
                    font: "Helvetica"
                })
            ],
            spacing: { after: 200 },
            indent: { left: 360 }
        }));
    }

    // Sources
    children.push(createSectionHeader(newsData.sources.emoji, newsData.sources.title));
    newsData.sources.items.forEach(item => {
        children.push(createBulletItem(item));
    });

    // Create document with US Letter size
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    size: {
                        width: 12240,  // 8.5 inches in DXA
                        height: 15840  // 11 inches in DXA
                    },
                    margin: {
                        top: 1440,     // 1 inch
                        right: 1440,
                        bottom: 1440,
                        left: 1440
                    }
                }
            },
            children: children
        }]
    });

    return doc;
}

// Main execution
async function main() {
    const args = process.argv.slice(2);

    if (args.length < 1) {
        console.log("Usage: node create-news-doc.js <date> [output-path]");
        console.log("Example: node create-news-doc.js 2026-02-10 ./output.docx");
        console.log("\nNote: Edit the newsData object in this script with actual content before running.");
        process.exit(1);
    }

    const dateStr = args[0];
    const outputPath = args[1] || `./${dateStr}-ai-news.docx`;

    // Sample data - replace with actual news content
    const sampleNews = {
        headline: {
            emoji: "📰",
            title: "TODAY'S HEADLINE",
            content: "Sample headline content goes here."
        },
        date: {
            emoji: "📅",
            content: dateStr
        },
        simple: {
            emoji: "😊",
            title: "TODAY IN SIMPLE WORDS",
            content: "Explanation in simple terms goes here."
        },
        tools: {
            emoji: "🛠️",
            title: "TOOLS & PRODUCTS",
            items: ["Tool 1 description", "Tool 2 description"]
        },
        research: {
            emoji: "🔬",
            title: "RESEARCH BREAKTHROUGHS",
            items: ["Research item 1", "Research item 2"]
        },
        business: {
            emoji: "💰",
            title: "INDUSTRY & BUSINESS",
            items: ["Business news 1", "Business news 2"]
        },
        policy: {
            emoji: "🌐",
            title: "GOVERNMENT & POLICY",
            items: ["Policy update 1", "Policy update 2"]
        },
        concerns: {
            emoji: "⚠️",
            title: "CONCERNS & QUESTIONS",
            items: ["Concern 1", "Concern 2"]
        },
        quote: {
            emoji: "💡",
            title: "QUOTE OF THE DAY",
            text: "Sample quote text",
            author: "Author Name, Title"
        },
        sources: {
            emoji: "📚",
            title: "SOURCES",
            items: ["https://example.com/source1", "https://example.com/source2"]
        }
    };

    try {
        const doc = createNewsDocument(sampleNews, dateStr);
        const buffer = await Packer.toBuffer(doc);
        fs.writeFileSync(outputPath, buffer);
        console.log(`Document created: ${outputPath}`);
    } catch (error) {
        console.error("Error creating document:", error);
        process.exit(1);
    }
}

main();

// Export for use as module
module.exports = { createNewsDocument, newsTemplate };
