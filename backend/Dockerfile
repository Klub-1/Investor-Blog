# Taken from: https://www.erraticbits.ca/post/2021/fastapi/
FROM python:3.9
WORKDIR /code
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONBUFFERED 1
COPY . /code/backend
RUN pip install --no-cache-dir --upgrade -r ./backend/requirements.txt
EXPOSE 8000
# CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
