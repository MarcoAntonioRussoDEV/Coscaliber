import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const A4_WIDTH_CM = 21;
const A4_HEIGHT_CM = 29.7;
const PAGE_MARGIN_CM = 0.5;
const OVERLAP_CM = 1;
const TARGET_DPI = 150;

const CONTENT_W_CM = A4_WIDTH_CM - PAGE_MARGIN_CM * 2;
const CONTENT_H_CM = A4_HEIGHT_CM - PAGE_MARGIN_CM * 2;
const STEP_W_CM = CONTENT_W_CM - OVERLAP_CM;
const STEP_H_CM = CONTENT_H_CM - OVERLAP_CM;

const tileCount = (totalCm, contentCm, stepCm) =>
    totalCm <= contentCm ? 1 : Math.ceil((totalCm - contentCm) / stepCm) + 1;

const drawAssemblyMap = (pdf, { rows, cols, widthCm, heightCm, projectName }) => {
    const maxW = A4_WIDTH_CM - 4;
    const maxH = A4_HEIGHT_CM - 10;
    const scale = Math.min(maxW / widthCm, maxH / heightCm);
    const diagramW = widthCm * scale;
    const diagramH = heightCm * scale;
    const startX = (A4_WIDTH_CM - diagramW) / 2;
    const startY = 4;

    pdf.setFontSize(14);
    pdf.text(`${projectName} - stampa in scala reale 1:1`, A4_WIDTH_CM / 2, 2, {
        align: "center",
    });
    pdf.setFontSize(10);
    pdf.text(
        `Dimensioni reali: ${widthCm.toFixed(1)} x ${heightCm.toFixed(1)} cm - ${
            rows * cols
        } pagine (${cols} x ${rows})`,
        A4_WIDTH_CM / 2,
        2.8,
        { align: "center" }
    );

    pdf.setDrawColor(180);
    pdf.rect(startX, startY, diagramW, diagramH);

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const x = startX + c * STEP_W_CM * scale;
            const y = startY + r * STEP_H_CM * scale;
            const w = Math.min(CONTENT_W_CM, widthCm - c * STEP_W_CM) * scale;
            const h = Math.min(CONTENT_H_CM, heightCm - r * STEP_H_CM) * scale;
            pdf.rect(x, y, w, h);
            pdf.setFontSize(9);
            pdf.setTextColor(0);
            pdf.text(`${r + 1}.${c + 1}`, x + w / 2, y + h / 2, {
                align: "center",
            });
        }
    }

    pdf.setFontSize(9);
    pdf.setTextColor(80);
    pdf.text(
        "Stampa senza adattamento/scala (100%). Allinea le pagine sovrapponendole di 1 cm lungo le linee tratteggiate, seguendo la numerazione riga.colonna.",
        A4_WIDTH_CM / 2,
        startY + diagramH + 1.2,
        { align: "center", maxWidth: A4_WIDTH_CM - 3 }
    );
};

const drawOverlapGuides = (pdf, { tileWCm, tileHCm, hasRight, hasBottom }) => {
    pdf.setDrawColor(200, 60, 60);
    pdf.setLineDashPattern([0.2, 0.15], 0);

    if (hasRight) {
        const x = PAGE_MARGIN_CM + tileWCm - OVERLAP_CM;
        pdf.line(x, PAGE_MARGIN_CM, x, PAGE_MARGIN_CM + tileHCm);
    }
    if (hasBottom) {
        const y = PAGE_MARGIN_CM + tileHCm - OVERLAP_CM;
        pdf.line(PAGE_MARGIN_CM, y, PAGE_MARGIN_CM + tileWCm, y);
    }

    pdf.setLineDashPattern([], 0);
    pdf.setDrawColor(0);
};

export async function exportRealScalePdf({ pixelToCmRatio, projectName }) {
    const imageElement = document.querySelector(".reference-image");
    if (!imageElement || !pixelToCmRatio) {
        throw new Error("MISSING_REFERENCE");
    }

    const imageRect = imageElement.getBoundingClientRect();
    const widthCm = imageRect.width / pixelToCmRatio;
    const heightCm = imageRect.height / pixelToCmRatio;

    const targetPxPerCm = TARGET_DPI / 2.54;
    const captureScale = Math.min(4, Math.max(1, targetPxPerCm / pixelToCmRatio));

    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const sourceCanvas = await html2canvas(document.body, {
        x: imageRect.left + scrollX,
        y: imageRect.top + scrollY,
        width: imageRect.width,
        height: imageRect.height,
        scrollX: -scrollX,
        scrollY: -scrollY,
        scale: captureScale,
        backgroundColor: "#ffffff",
        useCORS: true,
    });

    const capturePxPerCm = sourceCanvas.width / widthCm;

    const cols = tileCount(widthCm, CONTENT_W_CM, STEP_W_CM);
    const rows = tileCount(heightCm, CONTENT_H_CM, STEP_H_CM);

    const pdf = new jsPDF({ unit: "cm", format: "a4", orientation: "portrait" });
    drawAssemblyMap(pdf, { rows, cols, widthCm, heightCm, projectName });

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const startXCm = c * STEP_W_CM;
            const startYCm = r * STEP_H_CM;
            const tileWCm = Math.min(CONTENT_W_CM, widthCm - startXCm);
            const tileHCm = Math.min(CONTENT_H_CM, heightCm - startYCm);

            const tileCanvas = document.createElement("canvas");
            tileCanvas.width = Math.round(tileWCm * capturePxPerCm);
            tileCanvas.height = Math.round(tileHCm * capturePxPerCm);
            const ctx = tileCanvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, tileCanvas.width, tileCanvas.height);
            ctx.drawImage(
                sourceCanvas,
                startXCm * capturePxPerCm,
                startYCm * capturePxPerCm,
                tileCanvas.width,
                tileCanvas.height,
                0,
                0,
                tileCanvas.width,
                tileCanvas.height
            );

            pdf.addPage("a4", "portrait");
            pdf.addImage(
                tileCanvas.toDataURL("image/jpeg", 0.92),
                "JPEG",
                PAGE_MARGIN_CM,
                PAGE_MARGIN_CM,
                tileWCm,
                tileHCm
            );

            drawOverlapGuides(pdf, {
                tileWCm,
                tileHCm,
                hasRight: c < cols - 1,
                hasBottom: r < rows - 1,
            });

            pdf.setFontSize(8);
            pdf.setTextColor(120);
            pdf.text(
                `${projectName} - pagina ${r + 1}.${c + 1} di ${rows}x${cols}`,
                PAGE_MARGIN_CM,
                A4_HEIGHT_CM - 0.15
            );
        }
    }

    pdf.save(`${projectName}-scala-reale.pdf`);
}

export default exportRealScalePdf;
