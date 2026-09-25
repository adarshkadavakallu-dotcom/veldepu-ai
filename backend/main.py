from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from google import genai

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://veldepu-ai.vercel.app"],
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
from pydantic import BaseModel

class ChatRequest(BaseModel):
    prompt: str


@app.post("/chat")
def chat(request: ChatRequest):
    try:
        client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

        response = client.models.generate_content(
            model="gemini-3.6-flash",
            contents=request.prompt,
        )

        return {
            "reply": response.text
        }

    except Exception as e:
        return {
            "reply": "Sorry, I couldn't process that request.",
            "error": str(e)
        }

