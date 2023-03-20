deploy-api:
	minikube image build -t imggen:latest .
	kubectl apply -f deployment.yaml

deploy-perf-tests:
	minikube image build -t imggen-perf-tests:latest tests/perf
	kubectl apply -f tests/perf/job.yaml

deploy-spike-tests:
	minikube image build -t imggen-spike-tests:latest tests/spike
	kubectl apply -f tests/spike/job.yaml