
// Simple demo function for addition
const add = (a:number, b: number): number => a + b;

// Simple demo function for division
const divide = (a:number, b: number) => {
    if (b === 0) {
        throw new Error('Cannot divide by zero');
    }
    return a / b;
};

// Simulating an async function with a Promise
const fetchData = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('data received');
        }, 1000);
    });
};

// Basic synchronous tests
describe('Basic math functions', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(add(1, 2)).toBe(3);
    });

    test('divides 6 by 2 to equal 3', () => {
        expect(divide(6, 2)).toBe(3);
    });

    test('throws an error when dividing by zero', () => {
        expect(() => divide(6, 0)).toThrow('Cannot divide by zero');
    });
});

// Asynchronous test
describe('Async function', () => {
    test('fetchData should return "data received"', async () => {
        const data = await fetchData();
        expect(data).toBe('data received');
    });
});
