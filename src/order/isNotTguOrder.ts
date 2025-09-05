export function isNotTguOrder(orderId: string): boolean {
    return orderId.startsWith('2') || orderId.startsWith('3') || orderId.startsWith('EX-');
}
