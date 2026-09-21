from fastapi import FastAPI
import os
from google import genai

app = FastAPI()


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
            model="gemini-2.5-flash",
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

