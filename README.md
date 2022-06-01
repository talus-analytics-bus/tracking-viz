# GHS Tracking visualizations

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting started
To start the frontend code:
1. `yarn`
1. `yarn start`
1. Go to site at [http://localhost:3000/](http://localhost:3000/)
1. Click the visualization you want to see

## Updating data for Sankey diagrams
1. Use the GHS Tracking API code base command line interface to create inputs, for example, to get input for a diagram between individual Country funders to individual International recipients, do
    ```
    pipenv run python -m ghst research sankey -if -ir -fc Country -rc International
    ```
1. A file will be created in the repo directory for `ghs-tracking-api` named like `research/sankey/results/individual/05312022/tracking_sankey_05312022.json` with today's date rather than `05312022`. Copy it to this repo in directory `src/components/FundingSankey` and rename it as `sankey_data.json`
1. Refresh the page to view the Sankey diagram