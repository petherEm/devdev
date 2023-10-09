import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(1).max(130),
  explanation: z.string().min(100).max(5000),
  tags: z.array(z.string().max(20)).max(3),
});
