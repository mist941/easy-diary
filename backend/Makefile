install: 
	pip install -r requirements-dev.txt

run:
	uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
	
lint:
	flake8 src/

format:
	black src/ && isort src/

migrations:
	alembic revision --autogenerate -m "New migration"

migrate:
	alembic upgrade head

up:
	docker-compose -f docker-compose.yml up -d

down:
	docker-compose -f docker-compose.yml down