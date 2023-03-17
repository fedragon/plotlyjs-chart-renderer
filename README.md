# Image Generation api

Provides an API that renders PNG images starting from a Plotly JSON object.

## Build

```shell
minikube image build -t imggen:latest .
```

## Run

```shell
npm start
```

### Sample request

```shell
curl -v -X POST -d '{"test": 1}' -H 'Content-Type: application/json' --output result.png localhost:3000
```