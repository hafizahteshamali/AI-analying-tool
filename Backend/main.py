from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import random
import uvicorn
import os
from typing import List

app = FastAPI(
    title="Contract Analysis API",
    description="API for analyzing legal contracts",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",           # Next.js default
        "http://localhost:5173",           # Vite default
        "http://127.0.0.1:5173",          # Local frontend (vite)
        "https://ai-analying-tool.vercel.app",  # Your Vercel frontend URL
        "https://ai-analying-tool-git-main-ahteshamalis-projects.vercel.app",
        "https://*.vercel.app",            # Allow all Vercel preview deployments
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Configuration
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_CONTENT_TYPES = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/msword"  # Added support for older .doc files
]

@app.get("/")
async def root():
    """Health check endpoint"""
    return {"message": "Contract Analysis API is running", "status": "healthy"}

@app.get("/health")
async def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "service": "Contract Analysis API",
        "version": "1.0.0"
    }

@app.post("/upload")
async def upload_contract(file: UploadFile = File(...)):
    """
    Upload and analyze a contract file (PDF or DOCX)
    """
    try:
        # Validate file type
        if file.content_type not in ALLOWED_CONTENT_TYPES:
            raise HTTPException(
                status_code=400, 
                detail=f"File type not supported. Allowed types: PDF, DOCX, DOC. Received: {file.content_type}"
            )
        
        # Read file content to check size
        file_content = await file.read()
        file_size = len(file_content)
        
        # Validate file size
        if file_size > MAX_FILE_SIZE:
            raise HTTPException(
                status_code=413,
                detail=f"File too large. Maximum size allowed: {MAX_FILE_SIZE / (1024*1024):.1f}MB"
            )
        
        # Validate file is not empty
        if file_size == 0:
            raise HTTPException(
                status_code=400,
                detail="File is empty"
            )
        
        # Reset file pointer for potential future processing
        await file.seek(0)
        
        # Generate dummy analysis data
        risk_score = random.randint(60, 100)
        
        # More realistic German legal summary
        legal_summary = (
            "Vertragsanalyse - Zusammenfassung:\n\n"
            "Dieser Vertrag regelt die rechtlichen Beziehungen zwischen den Vertragsparteien "
            "bezüglich der vereinbarten Dienstleistungen. Wesentliche Vertragsinhalte umfassen "
            "Leistungsumfang, Vergütungsregelungen, Vertragslaufzeit sowie Kündigungsmodalitäten.\n\n"
            "Besondere Aufmerksamkeit erfordern die Haftungsklauseln und Vertraulichkeitsbestimmungen. "
            "Der Vertrag enthält standardmäßige Regelungen zu Gerichtsstand und anwendbarem Recht. "
            "Die Zahlungsbedingungen sind klar definiert und marktüblich.\n\n"
            "Empfehlung: Prüfung der Haftungsbeschränkungen und Kündigungsfristen wird empfohlen."
        )
        
        # More comprehensive extracted clauses
        extracted_clauses = [
            "§1 Vertragsgegenstand – Bereitstellung von IT-Beratungsdienstleistungen und technischem Support",
            "§2 Vertragsdauer – Laufzeit vom 01.07.2025 bis 30.06.2026 mit automatischer Verlängerung",
            "§3 Vergütung – Monatliche Pauschale von 2.500,00 EUR zzgl. 19% MwSt., fällig zum Monatsende",
            "§4 Leistungsumfang – Wartung, Support und Beratung während der Geschäftszeiten (Mo-Fr, 9-17 Uhr)",
            "§5 Vertraulichkeit – Gegenseitige Verschwiegenheitspflicht für alle Geschäftsinformationen",
            "§6 Haftung – Beschränkung auf Vorsatz und grobe Fahrlässigkeit, max. Vertragswert",
            "§7 Kündigung – Ordentliche Kündigung mit 4 Wochen Frist zum Monatsende möglich",
            "§8 Höhere Gewalt – Leistungsbefreiung bei unvorhersehbaren Ereignissen",
            "§9 Gerichtsstand – Ausschließlicher Gerichtsstand München, deutsches Recht anwendbar",
            "§10 Salvatorische Klausel – Unwirksamkeit einzelner Bestimmungen berührt Vertrag nicht"
        ]
        
        # Additional risk factors for more detailed analysis
        risk_factors = []
        if risk_score > 85:
            risk_factors.extend([
                "Unklare Haftungsregelungen identifiziert",
                "Kündigungsfristen möglicherweise zu kurz"
            ])
        elif risk_score > 75:
            risk_factors.extend([
                "Vertragslaufzeit sollte überprüft werden",
                "Zahlungsmodalitäten prüfen"
            ])
        else:
            risk_factors.append("Geringes Risiko - Standardvertrag")
        
        return JSONResponse(
            status_code=200,
            content={
                "success": True,
                "filename": file.filename,
                "file_size_bytes": file_size,
                "file_type": file.content_type,
                "risk_score_percent": risk_score,
                "risk_level": "Hoch" if risk_score > 85 else "Mittel" if risk_score > 70 else "Niedrig",
                "contract_summary_german": legal_summary,
                "extracted_clauses": extracted_clauses,
                "risk_factors": risk_factors,
                "analysis_timestamp": "2025-01-26T14:20:31Z"
            }
        )
        
    except HTTPException:
        # Re-raise HTTP exceptions
        raise
    except Exception as e:
        # Handle unexpected errors
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error during file processing: {str(e)}"
        )

@app.exception_handler(413)
async def request_entity_too_large_handler(request, exc):
    """Handle file too large errors"""
    return JSONResponse(
        status_code=413,
        content={
            "success": False,
            "error": "File too large",
            "detail": f"Maximum file size allowed: {MAX_FILE_SIZE / (1024*1024):.1f}MB"
        }
    )

# For local development
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run(
        "main:app", 
        host="0.0.0.0",  # Changed to 0.0.0.0 for better deployment compatibility
        port=port, 
        reload=True
    )