# CSV to Pie Chart

[Use it here](https://csv-to-pie-chart-mu.vercel.app/)

Paste your CSV and generate a pie chart! Only one configuration option:

- choose the max number of segments to show

Features

- copy to clipboard
- download generated image

## Tech stack

- [Vite React + Typescript + SWC](https://vite.dev/)
- [Victory Charts](https://commerce.nearform.com/open-source/victory/)
- [csvtojson](https://www.npmjs.com/package/csvtojson)
- [html2canvas](https://www.npmjs.com/package/html2canvas/v/1.4.1)

## Screenshot

![screenshot](./screenshot.png)


## Why?

Built to simplify daily reporting visualisation for powerpoint reports! L1 operators need to collate this information and they rely on simple repetitive actions to collate information.

### AWS Cloudwatch RUM
This tool is built as a replacement gui to the AWS Cloudwatch RUM browser and device usage breakdown. Out of the box, RUM does not provide a meaningful breakdown of devices, displaying only their perceived top browser list and hiding everything else within an "Others" chunk.

### Log insights custom graph
Crafting a pie chart in log insights does not allow us to recreate this chunked "Others" data to hide the noise of low usage devices and also does not allow us to display percentage breakdowns in the legend/chart labels.

### Excel
Couldn't automatically chunk low usage devices into an "Others" data block directly.
