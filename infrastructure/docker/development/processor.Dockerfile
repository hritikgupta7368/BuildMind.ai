FROM python:3.11
WORKDIR /app
COPY ./apps/processor/requirements.txt .
RUN pip install -r requirements.txt
COPY ./apps/processor ./
EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]