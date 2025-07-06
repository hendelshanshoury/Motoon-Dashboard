export function generateNumber() {
    let randomNumber = Math.floor(Math.random() * 999900) + 100;
    return `${randomNumber}`;
}
