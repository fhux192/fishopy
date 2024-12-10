export default function getRawPrice(value) {
    return Number(value.replace(/,/g, ""));
}