from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import random
import uvicorn

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://ai-analying-tool-git-main-ahteshamalis-projects.vercel.app/"],  # Frontend dev server URLs
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

@app.post("/upload")
async def upload_contract(file: UploadFile = File(...)):
    allowed_types = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    if file.content_type not in allowed_types:
        raise HTTPException(status_code=400, detail="Only PDF or DOCX files are allowed.")
    
    risk_score = random.randint(60, 100)
    legal_summary = (
        "Zusammenfassung des Vertrags:\n"
        "Dieser Vertrag regelt die Bedingungen zwischen den Parteien hinsichtlich der Nutzung "
        "der Dienstleistungen. Die Vertragsparteien verpflichten sich zur Einhaltung der vereinbarten "
        "Konditionen, insbesondere im Hinblick auf Zahlung, Vertraulichkeit und Haftung. "
        "Der Vertrag tritt mit Unterzeichnung in Kraft und gilt für die vereinbarte Laufzeit. "
        "Kündigungen müssen schriftlich erfolgen. Änderungen bedürfen der Schriftform."
    )
    
    extracted_clauses = [
        "§1 Vertragsgegenstand – Die Parteien vereinbaren die Bereitstellung von IT-Dienstleistungen.",
        "§2 Vertragsdauer – Der Vertrag tritt am 01.07.2025 in Kraft und läuft bis zum 30.06.2026.",
        "§3 Vergütung – Die monatliche Vergütung beträgt 2.500 EUR zzgl. MwSt.",
        "§4 Vertraulichkeit – Alle Informationen sind vertraulich zu behandeln.",
        "§5 Haftung – Die Haftung ist auf grobe Fahrlässigkeit und Vorsatz beschränkt.",
        "§6 Kündigung – Eine Kündigung ist mit einer Frist von vier Wochen zum Monatsende möglich.",
        "§7 Gerichtsstand – Gerichtsstand ist München, Deutschland."
    ]
    
    return JSONResponse(content={
        "filename": file.filename,
        "risk_score_percent": risk_score,
        "contract_summary_german": legal_summary,
        "extracted_clauses": extracted_clauses
    })

if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)