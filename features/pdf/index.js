const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
  LevelFormat, HeadingLevel
} = require('docx');
const fs = require('fs');

const GREEN = "1B6B2F";
const DARK_GREEN = "0D4A1F";
const LIGHT_GREEN = "E8F5E9";
const MID_GREEN = "C8E6C9";
const ACCENT = "F57F17";
const WHITE = "FFFFFF";
const DARK = "1A1A1A";
const GRAY = "5A5A5A";
const LIGHT_GRAY = "F5F5F5";

const border = (color = "DDDDDD") => ({ style: BorderStyle.SINGLE, size: 1, color });
const noBorder = () => ({ style: BorderStyle.NONE, size: 0, color: "FFFFFF" });
const allBorders = (color) => ({ top: border(color), bottom: border(color), left: border(color), right: border(color) });
const noBorders = () => ({ top: noBorder(), bottom: noBorder(), left: noBorder(), right: noBorder() });

function spacer(pt = 80) {
  return new Paragraph({ children: [new TextRun("")], spacing: { before: pt, after: pt } });
}

function sectionHeading(text) {
  return new Paragraph({
    children: [
      new TextRun({ text, font: "Arial", size: 26, bold: true, color: WHITE })
    ],
    shading: { fill: DARK_GREEN, type: ShadingType.CLEAR },
    spacing: { before: 200, after: 0 },
    indent: { left: 160, right: 160 },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT }
    }
  });
}

// HEADER — Company name banner
function makeHeader() {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: "GAUSIYA TYRE WORKS", font: "Arial", size: 56, bold: true, color: WHITE })
      ],
      alignment: AlignmentType.CENTER,
      shading: { fill: GREEN, type: ShadingType.CLEAR },
      spacing: { before: 240, after: 0 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Registered Scrap Tyre & Rubber Recycler  |  Est. in Mumbai", font: "Arial", size: 20, color: LIGHT_GREEN, italics: true })
      ],
      alignment: AlignmentType.CENTER,
      shading: { fill: GREEN, type: ShadingType.CLEAR },
      spacing: { before: 40, after: 0 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "Ph: +91-XXXXX XXXXX  |  Email: gausiyatyreworks@email.com  |  Mumbai, Maharashtra", font: "Arial", size: 18, color: MID_GREEN })
      ],
      alignment: AlignmentType.CENTER,
      shading: { fill: GREEN, type: ShadingType.CLEAR },
      spacing: { before: 40, after: 240 },
    }),
  ];
}

// QUOTATION TITLE BOX
function makeQuotationTitle() {
  return [
    new Paragraph({
      children: [
        new TextRun({ text: "PURCHASE QUOTATION", font: "Arial", size: 40, bold: true, color: DARK_GREEN })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 280, after: 40 },
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 8, color: GREEN },
      }
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "We Buy: Old Tyres  |  Used Tubes  |  Rubber Scraps", font: "Arial", size: 22, color: GRAY, italics: true })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 40, after: 60 },
    }),
    // Quotation meta table
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [2340, 2340, 2340, 2340],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: allBorders("CCCCCC"),
              shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
              width: { size: 2340, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: "Quotation No.", font: "Arial", size: 18, color: GRAY })], alignment: AlignmentType.CENTER }),
                new Paragraph({ children: [new TextRun({ text: "GTW-2025-001", font: "Arial", size: 20, bold: true, color: DARK })], alignment: AlignmentType.CENTER }),
              ]
            }),
            new TableCell({
              borders: allBorders("CCCCCC"),
              shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
              width: { size: 2340, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: "Date", font: "Arial", size: 18, color: GRAY })], alignment: AlignmentType.CENTER }),
                new Paragraph({ children: [new TextRun({ text: "March 2025", font: "Arial", size: 20, bold: true, color: DARK })], alignment: AlignmentType.CENTER }),
              ]
            }),
            new TableCell({
              borders: allBorders("CCCCCC"),
              shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
              width: { size: 2340, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: "Valid Until", font: "Arial", size: 18, color: GRAY })], alignment: AlignmentType.CENTER }),
                new Paragraph({ children: [new TextRun({ text: "30 Days", font: "Arial", size: 20, bold: true, color: DARK })], alignment: AlignmentType.CENTER }),
              ]
            }),
            new TableCell({
              borders: allBorders("CCCCCC"),
              shading: { fill: LIGHT_GRAY, type: ShadingType.CLEAR },
              width: { size: 2340, type: WidthType.DXA },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: "Payment", font: "Arial", size: 18, color: GRAY })], alignment: AlignmentType.CENTER }),
                new Paragraph({ children: [new TextRun({ text: "Instant Cash", font: "Arial", size: 20, bold: true, color: GREEN })], alignment: AlignmentType.CENTER }),
              ]
            }),
          ]
        })
      ]
    }),
  ];
}

// INTRO paragraph
function makeIntro() {
  return [
    spacer(120),
    sectionHeading("  DEAR FLEET OWNER / TYRE SHOP PARTNER"),
    new Paragraph({
      children: [
        new TextRun({
          text: "Gausiya Tyre Works is pleased to present this exclusive purchase quotation for your old tyres, used tubes, and rubber scrap. We offer the most competitive rates in the market with the convenience of FREE doorstep collection and INSTANT CASH payment. Turn your waste into wealth — hassle-free!",
          font: "Arial", size: 22, color: DARK
        })
      ],
      spacing: { before: 160, after: 160 },
      shading: { fill: LIGHT_GREEN, type: ShadingType.CLEAR },
      indent: { left: 160, right: 160 },
      border: {
        left: { style: BorderStyle.SINGLE, size: 18, color: GREEN },
      }
    }),
  ];
}

// PRICE TABLE
function makePriceTable() {
  const headerCell = (text, width) => new TableCell({
    borders: allBorders(GREEN),
    shading: { fill: DARK_GREEN, type: ShadingType.CLEAR },
    width: { size: width, type: WidthType.DXA },
    margins: { top: 100, bottom: 100, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({ children: [new TextRun({ text, font: "Arial", size: 20, bold: true, color: WHITE })], alignment: AlignmentType.CENTER })]
  });

  const makeRow = (sno, item, condition, unitPrice, bulkBonus, bg) => new TableRow({
    children: [
      new TableCell({
        borders: allBorders("BBBBBB"),
        shading: { fill: bg, type: ShadingType.CLEAR },
        width: { size: 500, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text: sno, font: "Arial", size: 20, bold: true, color: DARK_GREEN })], alignment: AlignmentType.CENTER })]
      }),
      new TableCell({
        borders: allBorders("BBBBBB"),
        shading: { fill: bg, type: ShadingType.CLEAR },
        width: { size: 2800, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: item, font: "Arial", size: 20, bold: true, color: DARK })] })]
      }),
      new TableCell({
        borders: allBorders("BBBBBB"),
        shading: { fill: bg, type: ShadingType.CLEAR },
        width: { size: 2300, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children: [new Paragraph({ children: [new TextRun({ text: condition, font: "Arial", size: 19, color: GRAY })] })]
      }),
      new TableCell({
        borders: allBorders("BBBBBB"),
        shading: { fill: bg, type: ShadingType.CLEAR },
        width: { size: 1960, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text: unitPrice, font: "Arial", size: 22, bold: true, color: GREEN })], alignment: AlignmentType.CENTER })]
      }),
      new TableCell({
        borders: allBorders("BBBBBB"),
        shading: { fill: bg, type: ShadingType.CLEAR },
        width: { size: 1800, type: WidthType.DXA },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text: bulkBonus, font: "Arial", size: 19, bold: true, color: ACCENT })], alignment: AlignmentType.CENTER })]
      }),
    ]
  });

  return [
    spacer(100),
    sectionHeading("  OUR PURCHASE RATES — PER PIECE"),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [500, 2800, 2300, 1960, 1800],
      rows: [
        new TableRow({
          children: [
            headerCell("S.No", 500),
            headerCell("Item Description", 2800),
            headerCell("Condition", 2300),
            headerCell("Rate / Piece", 1960),
            headerCell("Bulk Bonus", 1800),
          ]
        }),
        makeRow("1", "Truck Tyre (10.00-20 / 11.00-20)", "Worn / Scrap", "Rs. 300 - 600", "+Rs. 50/pc", WHITE),
        makeRow("2", "Truck Tyre (12.00-20 / 13.00-20)", "Worn / Scrap", "Rs. 500 - 800", "+Rs. 75/pc", LIGHT_GREEN),
        makeRow("3", "Truck Tyre (Retreaded/Used)", "Retreadable", "Rs. 800 - 1,500", "+Rs. 100/pc", WHITE),
        makeRow("4", "Truck Inner Tube (Standard)", "Used / Punctured", "Rs. 80 - 150", "+Rs. 20/pc", LIGHT_GREEN),
        makeRow("5", "Truck Inner Tube (Large/Heavy)", "Used / Punctured", "Rs. 150 - 250", "+Rs. 30/pc", WHITE),
        makeRow("6", "Tyre Flap", "Any condition", "Rs. 30 - 60", "+Rs. 10/pc", LIGHT_GREEN),
        makeRow("7", "Rubber Scrap / Buffing Waste", "Any", "Rs. 15 - 25/kg", "Negotiable", WHITE),
        makeRow("8", "Tractor / Farm Tyres", "Worn / Scrap", "Rs. 400 - 900", "+Rs. 80/pc", LIGHT_GREEN),
      ]
    }),
    new Paragraph({
      children: [new TextRun({ text: "* Final rates determined upon inspection. Higher rates for better-quality material. Bulk lots negotiable.", font: "Arial", size: 18, italics: true, color: GRAY })],
      spacing: { before: 80, after: 80 },
    })
  ];
}

// BENEFITS SECTION
function makeBenefits() {
  const benefitRow = (icon, title, desc, bg) => new TableRow({
    children: [
      new TableCell({
        borders: noBorders(),
        shading: { fill: bg, type: ShadingType.CLEAR },
        width: { size: 500, type: WidthType.DXA },
        margins: { top: 100, bottom: 100, left: 120, right: 80 },
        verticalAlign: VerticalAlign.CENTER,
        children: [new Paragraph({ children: [new TextRun({ text: icon, font: "Arial", size: 36, bold: true, color: ACCENT })], alignment: AlignmentType.CENTER })]
      }),
      new TableCell({
        borders: noBorders(),
        shading: { fill: bg, type: ShadingType.CLEAR },
        width: { size: 4180, type: WidthType.DXA },
        margins: { top: 100, bottom: 100, left: 80, right: 120 },
        children: [
          new Paragraph({ children: [new TextRun({ text: title, font: "Arial", size: 22, bold: true, color: DARK_GREEN })] }),
          new Paragraph({ children: [new TextRun({ text: desc, font: "Arial", size: 20, color: GRAY })] }),
        ]
      }),
    ]
  });

  return [
    spacer(100),
    sectionHeading("  WHY SELL TO GAUSIYA TYRE WORKS?"),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [500, 4180, 500, 4180],
      rows: [
        new TableRow({
          children: [
            new TableCell({
              borders: noBorders(),
              shading: { fill: LIGHT_GREEN, type: ShadingType.CLEAR },
              width: { size: 500, type: WidthType.DXA },
              margins: { top: 120, bottom: 120, left: 120, right: 80 },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ children: [new TextRun({ text: ">>", font: "Arial", size: 36, bold: true, color: ACCENT })], alignment: AlignmentType.CENTER })]
            }),
            new TableCell({
              borders: noBorders(),
              shading: { fill: LIGHT_GREEN, type: ShadingType.CLEAR },
              width: { size: 4180, type: WidthType.DXA },
              margins: { top: 120, bottom: 120, left: 80, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: "FREE Doorstep Pickup", font: "Arial", size: 22, bold: true, color: DARK_GREEN })] }),
                new Paragraph({ children: [new TextRun({ text: "We come to YOUR location — no transport cost, no effort needed from your side.", font: "Arial", size: 20, color: GRAY })] }),
              ]
            }),
            new TableCell({
              borders: noBorders(),
              shading: { fill: WHITE, type: ShadingType.CLEAR },
              width: { size: 500, type: WidthType.DXA },
              margins: { top: 120, bottom: 120, left: 120, right: 80 },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ children: [new TextRun({ text: ">>", font: "Arial", size: 36, bold: true, color: ACCENT })], alignment: AlignmentType.CENTER })]
            }),
            new TableCell({
              borders: noBorders(),
              shading: { fill: WHITE, type: ShadingType.CLEAR },
              width: { size: 4180, type: WidthType.DXA },
              margins: { top: 120, bottom: 120, left: 80, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: "INSTANT Cash Payment", font: "Arial", size: 22, bold: true, color: DARK_GREEN })] }),
                new Paragraph({ children: [new TextRun({ text: "Cash in hand at pickup — no waiting, no cheques, no delays whatsoever.", font: "Arial", size: 20, color: GRAY })] }),
              ]
            }),
          ]
        }),
        new TableRow({
          children: [
            new TableCell({
              borders: noBorders(),
              shading: { fill: WHITE, type: ShadingType.CLEAR },
              width: { size: 500, type: WidthType.DXA },
              margins: { top: 120, bottom: 120, left: 120, right: 80 },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ children: [new TextRun({ text: ">>", font: "Arial", size: 36, bold: true, color: ACCENT })], alignment: AlignmentType.CENTER })]
            }),
            new TableCell({
              borders: noBorders(),
              shading: { fill: WHITE, type: ShadingType.CLEAR },
              width: { size: 4180, type: WidthType.DXA },
              margins: { top: 120, bottom: 120, left: 80, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: "BULK BONUS Rates", font: "Arial", size: 22, bold: true, color: DARK_GREEN })] }),
                new Paragraph({ children: [new TextRun({ text: "Sell 50+ pieces in one lot and earn bonus per piece on top of listed rates.", font: "Arial", size: 20, color: GRAY })] }),
              ]
            }),
            new TableCell({
              borders: noBorders(),
              shading: { fill: LIGHT_GREEN, type: ShadingType.CLEAR },
              width: { size: 500, type: WidthType.DXA },
              margins: { top: 120, bottom: 120, left: 120, right: 80 },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ children: [new TextRun({ text: ">>", font: "Arial", size: 36, bold: true, color: ACCENT })], alignment: AlignmentType.CENTER })]
            }),
            new TableCell({
              borders: noBorders(),
              shading: { fill: LIGHT_GREEN, type: ShadingType.CLEAR },
              width: { size: 4180, type: WidthType.DXA },
              margins: { top: 120, bottom: 120, left: 80, right: 120 },
              children: [
                new Paragraph({ children: [new TextRun({ text: "Best Market Rates — Guaranteed", font: "Arial", size: 22, bold: true, color: DARK_GREEN })] }),
                new Paragraph({ children: [new TextRun({ text: "We benchmark market rates daily. You always get the fairest price available.", font: "Arial", size: 20, color: GRAY })] }),
              ]
            }),
          ]
        }),
      ]
    }),
  ];
}

// TERMS
function makeTerms() {
  const termItem = (num, text) => new Paragraph({
    children: [
      new TextRun({ text: `${num}.  `, font: "Arial", size: 20, bold: true, color: GREEN }),
      new TextRun({ text, font: "Arial", size: 20, color: DARK }),
    ],
    spacing: { before: 60, after: 60 },
    indent: { left: 200 },
  });

  return [
    spacer(100),
    sectionHeading("  TERMS & CONDITIONS"),
    spacer(60),
    termItem("1", "Rates are per piece unless mentioned otherwise. Final rate decided after physical inspection."),
    termItem("2", "Payment will be made in CASH at the time of collection. No advance needed from seller's side."),
    termItem("3", "Bulk bonus applies on lots of 50 pieces or more in a single transaction."),
    termItem("4", "FREE pickup available within Mumbai & Navi Mumbai. Outstation pickup negotiable for large lots."),
    termItem("5", "This quotation is valid for 30 days from the date of issue."),
    termItem("6", "All types of tyres accepted — worn, scrap, retreaded, or beyond repair."),
    termItem("7", "We accept tyres from truck fleets, tyre shops, workshops, and individual sellers."),
  ];
}

// CALL TO ACTION
function makeCTA() {
  return [
    spacer(120),
    new Paragraph({
      children: [
        new TextRun({ text: "READY TO SELL? CALL US NOW!", font: "Arial", size: 32, bold: true, color: WHITE })
      ],
      alignment: AlignmentType.CENTER,
      shading: { fill: ACCENT, type: ShadingType.CLEAR },
      spacing: { before: 200, after: 100 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "+91-XXXXX XXXXX  |  +91-XXXXX XXXXX", font: "Arial", size: 28, bold: true, color: WHITE })
      ],
      alignment: AlignmentType.CENTER,
      shading: { fill: ACCENT, type: ShadingType.CLEAR },
      spacing: { before: 80, after: 80 },
    }),
    new Paragraph({
      children: [
        new TextRun({ text: "WhatsApp also available. We respond within 2 hours!", font: "Arial", size: 20, color: WHITE, italics: true })
      ],
      alignment: AlignmentType.CENTER,
      shading: { fill: ACCENT, type: ShadingType.CLEAR },
      spacing: { before: 60, after: 200 },
    }),
    spacer(60),
    new Paragraph({
      children: [
        new TextRun({ text: "Gausiya Tyre Works — Turning Your Scrap Into Cash Since Day One", font: "Arial", size: 20, italics: true, color: GRAY })
      ],
      alignment: AlignmentType.CENTER,
      spacing: { before: 80, after: 80 },
    }),
  ];
}

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: { top: 720, right: 1080, bottom: 720, left: 1080 }
      }
    },
    children: [
      ...makeHeader(),
      ...makeQuotationTitle(),
      ...makeIntro(),
      ...makePriceTable(),
      ...makeBenefits(),
      ...makeTerms(),
      ...makeCTA(),
    ]
  }]
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync("/mnt/user-data/outputs/Gausiya_Tyre_Works_Quotation.docx", buf);
  console.log("Done!");
});