# FROM python:3.13
# RUN mkdir /app
# WORKDIR /app

# COPY backend/requirements.txt /app
# RUN pip install -r ./requirements.txt

# COPY backend/. /app
# # ENV FLASK_ENV production

# EXPOSE 5000
# CMD ["gunicorn", "-b", ":5000", "api:app"]

# syntax=docker/dockerfile:1.4
FROM --platform=$BUILDPLATFORM python:3.10-alpine AS builder

WORKDIR /code
COPY requirements.txt /code
RUN --mount=type=cache,target=/root/.cache/pip \
    pip3 install -r requirements.txt

COPY . .

ENV FLASK_APP app.py
ENV FLASK_ENV development
ENV FLASK_RUN_PORT 5000
ENV FLASK_RUN_HOST 0.0.0.0

EXPOSE 5000

CMD ["flask", "run"]

# FROM builder AS dev-envs

# # RUN <<EOF
# # apk update
# # apk add git
# # EOF

# # RUN <<EOF
# # addgroup -S docker
# # adduser -S --shell /bin/bash --ingroup docker vscode
# # EOF

# # install Docker tools (cli, buildx, compose)
# COPY --from=gloursdocker/docker / /

# CMD ["flask", "run"]