FROM grafana/k6

WORKDIR /home/k6

COPY script.js .
COPY charts.json .

CMD ["run", "script.js"]