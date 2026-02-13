# Craig Project - Healthcare Chatbot API

A Node.js/Express backend API that provides a healthcare chatbot powered by Anthropic's Claude AI. This service offers health information, wellness advice, and general medical guidance while maintaining appropriate boundaries and disclaimers.

## 🚀 Features

- **AI-Powered Healthcare Chat**: Interact with Claude Haiku for health-related questions
- **JWT Authentication Middleware**: Bearer token authentication (ready to use)
- **CORS Enabled**: Cross-origin resource sharing configured
- **TypeScript**: Full TypeScript support with proper type definitions
- **Error Handling**: Centralized error handling middleware
- **Vercel Ready**: Configured for deployment on Vercel

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or bun
- Anthropic API Key

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/leeroyanesu/craig_project.git
   cd craig_project
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```env
   ANTHROPIC_API_KEY=your_anthropic_api_key_here
   JWT_SECRET=your_jwt_secret_key_here
   ```

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The server will start on `http://localhost:8080`

### Production Mode
```bash
npm run build
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:8080
```

---

### Health Check Endpoints

#### `GET /`
Simple health check endpoint.

**Response:**
```
Hello, world!
```

#### `GET /healthz`
Health check endpoint (returns 204 No Content).

**Response:** `204 No Content`

---

### Chat Endpoints

#### `POST /data/chat`
Chat with the healthcare AI assistant.

**Authentication:** None required

**Request Body:**
```json
{
  "message": "What are the symptoms of a common cold?"
}
```

**Request Parameters:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `message` | string | Yes | The user's message/question |

**Success Response (200 OK):**
```json
{
  "question": "What are the symptoms of a common cold?",
  "response": "Common cold symptoms typically include: runny or stuffy nose, sore throat, cough, sneezing, mild headache, and sometimes a low-grade fever. Symptoms usually appear 1-3 days after exposure to the virus and last about 7-10 days. If symptoms persist beyond 10 days or worsen, I recommend consulting with a healthcare provider."
}
```

**Error Responses:**

**400 Bad Request** - Invalid input
```json
{
  "error": "Message is required and must be a non-empty string"
}
```

**500 Internal Server Error** - API error
```json
{
  "error": "Failed to communicate with AI service",
  "details": "Error message details"
}
```

**Example cURL Request:**
```bash
curl -X POST http://localhost:8080/data/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What should I do if I have a headache?"
  }'
```

---

## 🔐 Authentication (Available Middleware)

The project includes a JWT authentication middleware that can be applied to protected routes.

### Bearer Token Middleware

**Location:** `src/middlewares/check-bearer-token.ts`

**Usage:**
```typescript
import checkBearerToken from './middlewares/check-bearer-token'

router.post('/protected-route', checkBearerToken, yourController)
```

**How it works:**
1. Extracts the JWT token from the `Authorization` header
2. Verifies the token using the `JWT_SECRET`
3. Attaches the decoded payload to `req.auth`
4. Passes control to the next middleware/controller

**Request Header:**
```
Authorization: Bearer <your_jwt_token>
```

**Error Responses:**

**400 Bad Request** - Token not provided
```json
{
  "message": "Token not provided"
}
```

**401 Unauthorized** - Invalid token
```json
{
  "message": "Invalid token"
}
```

---

## 🧩 Project Structure

```
craig_project/
├── src/
│   ├── controllers/
│   │   └── data/
│   │       └── chat.ts          # Chat controller
│   ├── middlewares/
│   │   ├── check-bearer-token.ts # JWT authentication
│   │   └── error-handler.ts      # Error handling
│   ├── routes/
│   │   └── data.ts               # Data routes
│   ├── types/
│   │   └── express.d.ts          # TypeScript type extensions
│   ├── utils/
│   │   ├── app.ts                # Express app configuration
│   │   └── jwt.ts                # JWT utilities
│   └── index.ts                  # Application entry point
├── .env                          # Environment variables
├── package.json
├── tsconfig.json
├── vercel.json                   # Vercel deployment config
└── README.md
```

---

## 🤖 AI Assistant Configuration

The healthcare chatbot uses **Claude Haiku 4.5** with the following configuration:

- **Model:** `claude-haiku-4-5-20251001`
- **Max Tokens:** 1024
- **System Prompt:** Configured as a helpful and empathetic healthcare assistant

### Important Disclaimers

The AI assistant is programmed to:
- ✅ Provide general health information and wellness advice
- ✅ Answer questions about common health conditions
- ✅ Offer guidance on healthy lifestyle choices
- ✅ Suggest when to seek professional medical attention

The AI assistant will NOT:
- ❌ Replace professional medical advice, diagnosis, or treatment
- ❌ Provide specific diagnoses
- ❌ Prescribe medications
- ❌ Handle medical emergencies (will advise calling emergency services)

---

## 🚀 Deployment

### Vercel Deployment

The project is configured for Vercel deployment with `vercel.json`.

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   
   In your Vercel dashboard, add:
   - `ANTHROPIC_API_KEY`
   - `JWT_SECRET`

---

## 🛠️ Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build TypeScript to JavaScript |
| `npm start` | Start production server |

### TypeScript Configuration

The project uses strict TypeScript settings:
- Target: ES2022
- Module: CommonJS
- Strict mode enabled
- Type definitions for Express extended in `src/types/express.d.ts`

---

## 🔧 Middleware

### Error Handler

**Location:** `src/middlewares/error-handler.ts`

Centralized error handling that formats errors consistently:

```typescript
{
  "message": "Error message",
  "statusCode": 500,
  // ... additional error properties
}
```

### CORS Configuration

CORS is enabled for all origins (`*`). Modify in `src/utils/app.ts` for production:

```typescript
app.use(cors({ origin: 'https://yourdomain.com' }))
```

---

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |
| `JWT_SECRET` | Secret key for JWT signing/verification | Yes (if using auth) |

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 🆘 Support

For issues or questions, please open an issue on the GitHub repository.

---

## 🔗 Links

- **Repository:** https://github.com/leeroyanesu/craig_project.git
- **Anthropic API Docs:** https://docs.anthropic.com/
- **Express.js Docs:** https://expressjs.com/
