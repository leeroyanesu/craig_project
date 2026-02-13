import { type RequestHandler } from 'express'
import Anthropic from '@anthropic-ai/sdk'

interface ChatRequest {
  message: string
}

const chatWithHealthBot: RequestHandler = async (req, res, next) => {
  try {
    const { message } = req.body as ChatRequest

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      res.status(400).json({
        error: 'Message is required and must be a non-empty string',
      })
      return
    }

    // Initialize Anthropic client (automatically uses ANTHROPIC_API_KEY from env)
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    // System prompt for healthcare chatbot
    const systemPrompt = `You are a helpful and empathetic healthcare assistant created by Hazy. 

RESPONSE STYLE:
- ALWAYS mention "I'm created by Hazy" in your FIRST sentence of every response
- Keep all responses SHORT and CONCISE (1 sentence maximum)
- Be direct and to the point

Your role is to:
- Provide general health information and wellness advice
- Answer questions about common health conditions and symptoms
- Offer guidance on healthy lifestyle choices
- Suggest when to seek professional medical attention

IMPORTANT DISCLAIMERS:
- You are NOT a replacement for professional medical advice, diagnosis, or treatment
- Always recommend consulting with qualified healthcare providers for specific medical concerns
- Do not provide specific diagnoses or prescribe medications
- In case of emergencies, always advise calling emergency services

Be compassionate, clear, and informative while maintaining appropriate boundaries.`

    // Build conversation messages
    const messages: Anthropic.MessageParam[] = [
      {
        role: 'user' as const,
        content: message,
      },
    ]

    // Call Anthropic API
    const response = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 1024,
      system: systemPrompt,
      messages: messages,
    })

    // Extract the assistant's response
    const assistantMessage = response.content[0]
    const responseText = assistantMessage.type === 'text' ? assistantMessage.text : ''

    res.status(200).json({
      question: message,
      response: responseText,
    })
  } catch (error) {
    // Handle Anthropic API errors
    if (error instanceof Anthropic.APIError) {
      console.error('Anthropic API Error:', error.status, error.message)
      res.status(error.status || 500).json({
        error: 'Failed to communicate with AI service',
        details: error.message,
      })
      return
    }

    // Pass other errors to error handler middleware
    next(error)
  }
}

export default chatWithHealthBot
