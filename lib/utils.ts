import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
// import { customAlphabet } from "nanoid";
import { Tax } from "@/database/schema/tax";
import { PgVarcharConfig } from "drizzle-orm/pg-core";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// export function randomNumericId(length = 13) {
// 	const nanoid = customAlphabet("1234567890", length);
// 	return nanoid();
// }

// function sthat return the tallest element in an array: ["hello", "world", "foo", "bar", "hello world"] => "hello world"
export function tallestElement(arr: string[]): string {
	return arr.reduce((a, b) => (a.length > b.length ? a : b));
}


export function fixedEnum(...values: string[] | readonly string[]): PgVarcharConfig<readonly [string, ...string[]] | [string, ...string[]]> {
	return { enum: [...values] as [string, ...string[]], length: tallestElement([...values]).length };
}

export function generateRandomColor(scale: "light" | 'lighter' | "dark" = 'lighter'): {
	backgroundColor: string;
	textColor: string;
} {
	// Helper function to generate random integer between two values
	const randomInt = (min: number, max: number) =>
		Math.floor(Math.random() * (max - min + 1)) + min;

	// Generate a random hue (0-360), which affects the color (red, green, blue, etc.)
	const hue = randomInt(0, 360);

	// Based on the scale, determine the lightness range and text color contrast
	let lightness: number;
	let textColor: string;

	if (scale === "dark") {
		// Dark scale: lower lightness for darker background
		lightness = randomInt(10, 40);
		textColor = `hsl(${hue}, 100%, 90%)`; // Light text color
	} else if (scale === "lighter") {
		// Lighter scale: higher lightness for lighter background
		lightness = randomInt(70, 100);
		textColor = `hsl(${hue}, 100%, 10%)`; // Dark text color
	
	} else {
		// Light scale: higher lightness for lighter background
		lightness = randomInt(60, 90);
		textColor = `hsl(${hue}, 100%, 10%)`; // Dark text color
	}

	// Generate background color
	const backgroundColor = `hsl(${hue}, 100%, ${lightness}%)`;

	return { backgroundColor, textColor };
}

// calculate the taxed price
export function calculateTaxedPrice(price: number, tax: Tax): number {
	switch (tax.type) {
		case "percentage":
			return price * (1 + tax.rate / 100);
		case "fixed":
			return price + tax.rate;
		default:
			return price;
	}
}


// convert an image to base64 using the FileReader API
export function imageToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => resolve(reader.result as string);
		reader.onerror = reject;
		reader.readAsDataURL(file);
	});
}

