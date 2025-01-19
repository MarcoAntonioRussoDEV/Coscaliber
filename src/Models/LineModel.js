export default class Line {
    static id = 0;
    id;
    name;
    from;
    to;
    color;
    borderWith;
    size;
    isHidden = false;
    isReferenceLine;

    constructor() {
        this.name =
            Line.id === 0 ? "Altezza di riferimento" : `Linea ${Line.id}`;
        Line.id++;
        this.id = Line.id;
        this.isReferenceLine = Line.id === 1;
        this.color = "#fff";
        this.borderWith = 2;
    }

    setFrom(from) {
        this.from = from;
    }

    setTo(to) {
        this.to = to;
    }

    setColor(color) {
        this.color = color;
    }

    setBorderWith(borderWith) {
        this.borderWith = borderWith;
    }

    setSize(size) {
        this.size = size;
    }

    getDistanceInPx(mousePosition) {
        const { x: x1, y: y1 } = this.from;
        const { x: x2, y: y2 } = mousePosition;
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    getDistanceInCm(ratio, mousePosition) {
        const distanceInPx = this.getDistanceInPx(mousePosition);
        return (distanceInPx / ratio).toFixed(2);
    }
}
