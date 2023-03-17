deploy-api:
	minikube image build -t imggen:latest .
	kubectl apply -f deployment.yaml

deploy-tests:
	minikube image build -t imggen-k6:latest tests/k6
	kubectl apply -f tests/k6/job.yaml