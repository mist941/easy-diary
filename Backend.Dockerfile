FROM python:3.12-slim
WORKDIR /app
COPY backend/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
RUN pip install --no-cache-dir .

RUN apt-get update && \
  apt-get install -y dos2unix && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/*

COPY .env.default /tmp/.env.default
RUN cp /tmp/.env.default /app/.env && \
    rm -f /tmp/.env.default 2>/dev/null || true

COPY scripts/start-backend.sh ./start-backend.sh
RUN dos2unix /app/start-backend.sh && \
    chmod +x /app/start-backend.sh

RUN addgroup -S app && adduser -S app -G app
USER app

EXPOSE 8000

ENTRYPOINT ["/app/start-backend.sh"]