import { FC } from 'react';
import {
  VictoryContainer,
  VictoryLegend,
  VictoryPie,
  VictoryTheme,
} from 'victory';
import { copyToClipboard, downloadUI } from './utils/canvas-utils';

export interface PieChartComponentInterface {
  segments: number;
  data: Array<{
    field1: string;
    field2: string;
  }>;
}

const convertTwoDigitDecimal = (value: number): number =>
  Math.floor(value * 100) / 100;

const PieChartComponent: FC<PieChartComponentInterface> = ({
  data,
  segments,
}) => {
  /**
   * format raw data to a readable format (key, value)
   */
  const formattedData = data
    .filter(({ field1 }) => field1 !== 'browserName') // exclude header cell
    .map(({ field1, field2 }) => ({
      key: field1,
      value: parseInt(field2, 10),
    }))
    .sort((a, b) => b.value - a.value);

  /** get total data count across all values */
  const total = formattedData.reduce((acc, { value }) => acc + value, 0);

  /**
   * format data into chart readable format
   */
  const chartData = formattedData.map(({ key, value }) => ({
    x: `${key} ${convertTwoDigitDecimal((value / total) * 100)}%`,
    y: value,
  }));

  /**
   * calculate and consolidate remainder data into a single value
   *
   * sometimes there are too many columns and we do not want to show everything
   * in the chart, just showing in the legends is sufficient
   */
  const othersData = chartData
    .slice(segments)
    .reduce((acc, { y }) => acc + y, 0);

  /**
   * simplify chart display output
   */
  const simplifiedChartData =
    chartData.length > segments
      ? [
          ...chartData.slice(0, segments),
          {
            x: `Others ${convertTwoDigitDecimal((othersData / total) * 100)}%`,
            y: othersData,
          },
        ]
      : chartData;

  const legendData = chartData.map(({ x }) => ({
    name: x,
  }));

  return (
    <>
      <div className="chart-actions">
        <button type="button" onClick={downloadUI}>
          ⬇️ Download
        </button>
        <button type="button" onClick={copyToClipboard}>
          📋 Copy to clipboard
        </button>
      </div>
      <div className="chart" id="pie-chart">
        <div className="pie">
          <VictoryPie
            containerComponent={<VictoryContainer responsive={true} />}
            data={simplifiedChartData}
            radius={100}
            labelPlacement="vertical"
            labelIndicator
            theme={VictoryTheme.clean}
          />
        </div>
        <VictoryLegend
          width={900}
          height={350}
          itemsPerRow={3}
          containerComponent={<VictoryContainer responsive={false} />}
          data={legendData}
          orientation="horizontal"
          x={0}
          y={0}
          borderPadding={12}
          gutter={12}
          theme={VictoryTheme.clean}
        />
      </div>
    </>
  );
};

export default PieChartComponent;
