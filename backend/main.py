from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
import os
from google import genai

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv(
        "ALLOWED_ORIGINS",
        "https://veldepu-ai.vercel.app"
    ).split(","),
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Veldepu AI backend is running"
    }


@app.get("/health")
def health():
    return {
        "status": "ok"
    }


class ChatRequest(BaseModel):
    prompt: str


BUSINESS_CONTEXT = """
You are Veldepu AI, the AI assistant for Veldepu AI.

Your job is to answer questions about Veldepu AI clearly, accurately,
and professionally.

Veldepu AI provides these services:

1. AI Automation
We build AI-powered automation and assistants that reduce repetitive
manual work. This can include AI chatbots, AI assistants, automated
reports, WhatsApp/email automation, and connecting business tools.

2. Custom Dashboards & Internal Tools
We build dashboards and internal systems for businesses, including
operations dashboards, reporting dashboards, and role-based portals
for owners, managers, and staff.

3. Custom Apps & Web Apps
We build software tailored to a client's workflow, including CRMs,
booking systems, order systems, inventory systems, customer portals,
staff portals, and web/mobile-friendly applications.

4. Websites & Landing Pages
We build modern business websites, product pages, landing pages,
and redesign or improve old and slow websites.

5. Branding & Marketing Assets
We can help with brand identity, logos, brochures, one-pagers,
sales decks, and marketing/social media creatives.

How to respond:
- Be helpful and conversational.
- When someone asks about Veldepu AI's services, explain the relevant
  service clearly.
- Do not invent services, prices, guarantees, clients, or features.
- If the user asks for pricing, say that pricing depends on the
  project requirements and suggest contacting Veldepu AI.
- If a request is outside these services, explain that Veldepu AI
  focuses primarily on software, AI, automation, web, and related
  digital solutions.
- If the user wants to start a project, encourage them to use the
  project's contact/request form on the website.
- Keep answers concise unless the user asks for more detail.
"""


@app.post("/chat")
def chat(request: ChatRequest):
    try:
        client = genai.Client(
            api_key=os.environ["GEMINI_API_KEY"]
        )

        response = client.models.generate_content(
            model="gemini-3.5-flash",
            contents=f"""
{BUSINESS_CONTEXT}

User's question:
{request.prompt}
""",
        )

        return {
            "reply": response.text
        }

    except Exception as e:
        return {
        "reply": f"Backend error: {str(e)}"
    }