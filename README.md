# Plotly chart renderer

Single-endpoint API that renders a user-provided [Plotly JS](https://plotly.com/javascript/) chart and returns it as a PNG image.

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
