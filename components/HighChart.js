import { useState, useRef, useEffect } from 'react';
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

  const options = {
    global: {
      useUTC: false
    }
  };

export default function Highchart({
  chartComponent,
  stockChart,
  data,
  stockOptions
}) {

  useEffect(() => {
    if (typeof Highcharts === 'object') {
      Highcharts.setOptions({
        global: {
          useUTC: false
        }
      });
    }
  }, []);

  useEffect(() => {
    if (stockOptions && stockOptions.series && data) {
      const { series } = stockOptions
      const chart = chartComponent.current.chart;
      for (let i = 0; i < series.length; i += 1) {
        const { custom: { key } } = series[i]
        const seriesData = data[key] || [[0, 0]];
        if (chart && chart.series && chart.series[i]) {
          chart.series[i].updateData(seriesData);
        }
      }
      chart.redraw();
      chart.hideLoading();
    }
  }, [data, stockChart]);

  return (
    <div className="">
      <HighchartsReact
        ref={chartComponent}
        highcharts={Highcharts}
        options={stockChart}
      />
    </div>
  );
}

