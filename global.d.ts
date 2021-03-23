declare global {
   interface String {
      padStart(targetLength: number, padString: string): string;
   }
}

export {};
