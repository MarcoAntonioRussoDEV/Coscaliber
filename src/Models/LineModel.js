import { calculateDistanceInPx } from "@/lib/utils";

export default class Line {
    static id = 0;
    id;
    name;
    from;
    to;
    absoluteFrom;
    absoluteTo;
    color;
    borderWidth;
    size;
    isHidden = false;
    isReferenceLine;

    constructor(color) {
        this.name =
            Line.id === 0 ? "Altezza di riferimento" : `Linea ${Line.id}`;
        Line.id++;
        this.id = Line.id;
        this.isReferenceLine = Line.id === 1;
        this.color = color;
        this.borderWidth = 2;
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

    //deprecated
    getDistanceInPx(mousePosition) {
        const { x: x1, y: y1 } = this.from;
        const { x: x2, y: y2 } = mousePosition;
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    }

    //deprecated
    // getDistanceInCm(ratio, mousePosition) {
    //     const distanceInPx = this.getDistanceInPx(mousePosition);
    //     return (distanceInPx / ratio).toFixed(2);
    // }

    getDistanceInCm(ratio, mousePosition) {
        const { x: x1, y: y1 } = this.absoluteFrom;
        const { x: x2, y: y2 } = mousePosition;

        const distanceInPx = calculateDistanceInPx(x1, y1, x2, y2);
        const distanceInCm = ratio ? distanceInPx / ratio : 0;
        return distanceInCm.toFixed(2);
    }

    static fromSerializable(serializable) {
        const line = new Line(serializable.color);
        Object.assign(line, serializable);
        Line.id--;
        return line;
    }

    toSerializable() {
        return { ...this };
    }
}
