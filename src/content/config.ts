import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const templates = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		heroImage: z.string(),
		file: z.string(),
	}),
});

export const collections = { blog , templates};
