FROM python:3.12-slim

# System deps: LibreOffice for office→PDF, Ghostscript for compression, poppler for pdf→image
RUN apt-get update && apt-get install -y --no-install-recommends \
    libreoffice \
    ghostscript \
    poppler-utils \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
