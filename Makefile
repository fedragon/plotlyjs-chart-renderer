deploy-api:
	minikube image build -t imggen:latest .
	kubectl apply -f deployment.yaml

deploy-tests:
	minikube image build -t imggen-spike-tests:latest tests/spike
	kubectl apply -f tests/spike/job.yaml