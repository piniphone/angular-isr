export function wait(time: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, time));
}