import { createFileRoute } from "@tanstack/react-router"
import { convertToCoreMessages, streamText } from "ai"
import { bedrock } from "@/lib/bedrock"

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = await request.json()

        const result = streamText({
          model: bedrock("anthropic.claude-3-5-sonnet-20241022-v2:0"),
          messages: convertToCoreMessages(messages),
        })

        return result.toDataStreamResponse()
      },
    },
  },
})
