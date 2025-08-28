FROM python:3.12.3-slim

# Install system updates and security patches
RUN apt-get update && apt-get upgrade -y && apt-get install -y --no-install-recommends \
	curl bash netcat-openbsd \
	&& apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt  /app/

RUN pip install --no-cache-dir -r /app/requirements.txt

COPY . /app/

# Create a non-root user
RUN useradd -m appuser && chown -R appuser /app

EXPOSE 8000

# Healthcheck on root path (not /docs)
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl --fail http://localhost:8000/health || exit 1

# Ensure shell scripts have Unix line endings and are executable.
# This avoids runtime errors when files were checked out with CRLF on Windows
RUN if [ -f /app/entrypoint.sh ]; then sed -i 's/\r$//' /app/entrypoint.sh; fi \
	&& if [ -f /app/wait-for-it.sh ]; then sed -i 's/\r$//' /app/wait-for-it.sh; fi \
	&& chmod +x /app/entrypoint.sh /app/wait-for-it.sh || true

# Switch to non-root user after permissions are set
USER appuser

ENTRYPOINT [ "/app/entrypoint.sh" ]
