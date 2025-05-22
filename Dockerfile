FROM python:3.11

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Открываем порт 8000
EXPOSE 8000

# Запуск через Daphne (ASGI сервер для Django Channels)
CMD ["daphne", "-b", "0.0.0.0", "-p", "8000", "mysite.asgi:application"]