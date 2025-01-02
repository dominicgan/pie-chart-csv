import { FC } from "react";
import {
  VictoryContainer,
  VictoryLegend,
  VictoryPie,
  VictoryTheme,
} from "victory";

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
  window.console.log({ segments });

  const formattedData = data
    .map(({ field1, field2 }) => ({
      key: field1,
      value: parseInt(field2, 10),
    }))
    .sort((a, b) => b.value - a.value);
  const total = formattedData.reduce((acc, { value }) => acc + value, 0);

  const chartData = formattedData.map(({ key, value }) => ({
    x: `${key} ${convertTwoDigitDecimal((value / total) * 100)}%`,
    y: value,
  }));

  const othersData = chartData
    .slice(segments)
    .reduce((acc, { y }) => acc + y, 0);
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
    <div className="chart">
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
        height={500}
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
  );
};

export default PieChartComponent;
