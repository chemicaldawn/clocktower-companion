export function floorMod(n : number, divisor : number) {
    while (n < 0) {
        n += divisor
    }

    return n % divisor
}