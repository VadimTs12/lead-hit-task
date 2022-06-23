<template>
  <h3>Аналитика по визитам</h3>
  <div class="graph" ref="chartdiv"></div>
</template>

<script>
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5locales_ru_RU from "@amcharts/amcharts5/locales/ru_RU";

export default {
  name: "GraphComponent",
  data() {
    return {
      graphData: [
        {"date": "2020-07-01", "visits": 213},
        {"date": "2020-07-02", "visits": 249},
        {"date": "2020-07-03", "visits": 179},
        {"date": "2020-07-04", "visits": 170},
        {"date": "2020-07-05", "visits": 184},
        {"date": "2020-07-06", "visits": 202},
        {"date": "2020-07-07", "visits": 198},
        {"date": "2020-07-08", "visits": 168},
        {"date": "2020-07-09", "visits": 176},
        {"date": "2020-07-10", "visits": 171},
        {"date": "2020-07-11", "visits": 190},
        {"date": "2020-07-12", "visits": 154},
        {"date": "2020-07-13", "visits": 246},
        {"date": "2020-07-14", "visits": 250},
        {"date": "2020-07-15", "visits": 227},
        {"date": "2020-07-16", "visits": 140},
        {"date": "2020-07-17", "visits": 170},
        {"date": "2020-07-18", "visits": 125},
        {"date": "2020-07-19", "visits": 106},
        {"date": "2020-07-20", "visits": 207},
        {"date": "2020-07-21", "visits": 222},
        {"date": "2020-07-22", "visits": 198},
        {"date": "2020-07-23", "visits": 204},
        {"date": "2020-07-24", "visits": 213},
        {"date": "2020-07-25", "visits": 145},
        {"date": "2020-07-26", "visits": 166},
        {"date": "2020-07-27", "visits": 163},
        {"date": "2020-07-28", "visits": 135},
        {"date": "2020-07-29", "visits": 45}
      ]
    }
  },

  mounted() {
    let root = am5.Root.new(this.$refs.chartdiv);

    root.locale = am5locales_ru_RU;

    root.setThemes([am5themes_Animated.new(root)]);

    root.dateFormatter.setAll({
      dateFormat: "yyyy",
      dateFields: ["valueX"]
    });

    let data = this.graphData

    let chart = root.container.children.push(am5xy.XYChart.new(root, {
      focusable: true,
      panX: true,
      panY: true,
      wheelX: "panX",
      wheelY: "zoomX",
      pinchZoomX: true
    }));

    let xAxis = chart.xAxes.push(am5xy.DateAxis.new(root, {
      baseInterval: {
        timeUnit: "day",
        count: 1
      },
      renderer: am5xy.AxisRendererX.new(root, {}),
      tooltip: am5.Tooltip.new(root, {})
    }));

    let xRenderer = xAxis.get("renderer");
    xRenderer.grid.template.setAll({
      visible: false
    });

    let yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
      maxPrecision: 0,
      maxDeviation: 0.2,
      renderer: am5xy.AxisRendererY.new(root, {})
    }))

    let yRenderer = yAxis.get("renderer");
    yRenderer.grid.template.setAll({
      visible: false
    });

    let series = chart.series.push(am5xy.LineSeries.new(root, {
      minBulletDistance: 10,
      fill: 'rgba(98,0,133,0.45)',
      connect: false,
      xAxis: xAxis,
      yAxis: yAxis,
      valueYField: "visits",
      valueXField: "date",
      tooltip: am5.Tooltip.new(root, {
        pointerOrientation: "horizontal",
        labelText: "{valueY}"
      })
    }));

    series.fills.template.setAll({
      fillOpacity: 0.2,
      visible: true,
    });

    series.strokes.template.setAll({
      strokeWidth: 2,
      stroke: am5.color('#470067')
    });

    series.data.processor = am5.DataProcessor.new(root, {
      dateFormat: "yyyy-MM-dd",
      dateFields: ["date"]
    });

    series.data.setAll(data);

    series.bullets.push(function () {
      let circle = am5.Circle.new(root, {
        radius: 8,
        fill: '#620085',
        stroke: series.get("fill"),
        strokeWidth: 0
      })

      return am5.Bullet.new(root, {
        sprite: circle,
      })
    });


// Add cursor
    let cursor = chart.set("cursor", am5xy.XYCursor.new(root, {
      xAxis: xAxis,
      yAxis: yAxis,
      behavior: "none"
    }));
    cursor.lineY.set("visible", true);
    cursor.lineX.set("visible", true);

    this.root = root;
  },

  beforeUnmount() {
    if (this.root) {
      this.root.dispose();
    }
  }
}

</script>

<style scoped>
.graph {
  width: 100%;
  height: 500px;
}

</style>
