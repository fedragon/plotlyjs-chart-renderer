import { writeFileSync, rmSync } from 'fs';
import path, { join } from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

const render = async (browser, chart) => {
  const id = uuidv4()
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  writeFileSync(join(__dirname, `${id}.html`), htmlFor(chart))

  const page = await browser.newPage()

  await page.goto(`file://${__dirname}/${id}.html`)
  await page.waitForSelector('#chart-rendered')

  const encoded = await page.screenshot({ encoding: 'binary' })

  await page.close()

  rmSync(join(__dirname, `${id}.html`))

  return encoded
}

export default render;

const htmlFor = (chart) => {
  return `
    <html>
        <head>
            <script src='https://cdn.plot.ly/plotly-latest.min.js' type='text/javascript'></script>
        </head>
        <body>
            <div id="chart"></div>
            <script type='text/javascript'>
                Plotly.plot('chart', ${JSON.stringify(chart.data)}, ${JSON.stringify(chart.layout)})
                    .then(function (gd) {
                        let div = document.createElement('div');
                        div.style.display = 'none';
                        div.style.visibility = 'hidden';
                        div.id = 'chart-rendered';
                        document.body.appendChild(div);
                    });
            </script>
        </body>
    </html>`;
}