FROM postgres:16.2-alpine

# Copy the init script into the image and ensure LF + executable
COPY ./backend/init.db.sh /docker-entrypoint-initdb.d/init.db.sh
RUN apk add --no-cache bash sed \
    && sed -i 's/\r$//' /docker-entrypoint-initdb.d/init.db.sh \
    && chmod +x /docker-entrypoint-initdb.d/init.db.sh

CMD ["postgres"]
