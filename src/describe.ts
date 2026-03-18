export interface RefInfo {
  slug: string;
  title: string;
  breadcrumb: string;
  content: string;
}

export async function generateDescription(
  ref: RefInfo,
  context: { skillName: string; pageTitle: string },
  apiKey: string,
): Promise<string> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5",
      max_tokens: 256,
      system: `You generate concise descriptions for AI agent skill reference files. These descriptions help an AI agent decide which reference file to consult when a user asks a question.

Rules:
- Start with "Use when" followed by a description of the user intent or task
- Focus on what questions or tasks this reference answers, not implementation details
- Be specific about the domain and scope
- 80-150 characters ideal, never exceed 200 characters
- Do not wrap in quotes
- One sentence only, no trailing period`,
      messages: [
        {
          role: "user",
          content: `Skill: "${context.skillName}" — ${context.pageTitle}
Reference: "${ref.title}"
Path: ${ref.breadcrumb}

Content (first 3000 chars):
${ref.content.slice(0, 3000)}

Write a concise description for when an AI agent should consult this reference.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errBody = await response.text();
    let message = `Anthropic API error ${response.status}`;
    try {
      const err = JSON.parse(errBody) as {
        error?: { type?: string; message?: string };
      };
      message =
        err.error?.message || `${err.error?.type || message}: ${errBody}`;
    } catch {
      message = `${message}: ${errBody.slice(0, 200)}`;
    }
    throw new Error(message);
  }

  const data = (await response.json()) as {
    content: Array<{ type: string; text: string }>;
  };

  let text = data.content[0]?.text?.trim() ?? "";
  // Strip wrapping quotes if the model added them
  if (
    (text.startsWith('"') && text.endsWith('"')) ||
    (text.startsWith("'") && text.endsWith("'"))
  ) {
    text = text.slice(1, -1);
  }
  return text;
}
