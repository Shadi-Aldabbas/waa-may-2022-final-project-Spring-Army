import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  Legend,
  Surface,
  Symbols,
  Tooltip,
} from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper,Typography } from "@material-ui/core";

const donutChartStyles = makeStyles((theme) => ({
  activeText: { color: theme.palette.primary.gray },
}));

const DefaultDonutChart = ({
  data,
  width,
  height,
  activeShape,
  onMouseEnter,
  legend,
  ...rest
}) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  const classes = donutChartStyles();

  const renderActiveShape = (props) => {
    const {
      cx,
      cy,
      startAngle,
      endAngle,
      fill,
      payload,
      innerRadius,
      outerRadius,
      cornerRadius,
      percent,
    } = props;

    return (
      <>
        <foreignObject x={cx - 42} y={cy - 45} width="50%" height="50%">
          <Typography variant="h1" gutterBottom>
            {(percent * 100).toFixed(0)}%
          </Typography>
        </foreignObject>

        <foreignObject x={cx - 20} y={cy + 15} width="50%" height="50%">
          <Typography
            className={classes.activeText}
            variant="body2"
            gutterBottom>
            {payload.name}
          </Typography>
        </foreignObject>
        <Sector
          cx={cx}
          cy={cy}
          outerRadius={outerRadius + 8}
          innerRadius={innerRadius - 8}
          startAngle={startAngle + 1}
          endAngle={endAngle - 1}
          cornerRadius={cornerRadius}
          fill={fill}
        />
      </>
    );
  };
  const renderCusomizedLegend = (props) => {
    const { payload } = props;
    return (
      <>
        {payload.map((entry) => {
          const { color } = entry;

          const style = {
            backgroundColor: color,
            borderRadius: '0.2rem',
            paddingLeft: '0.3rem',
          };

          return (
            <span key={entry.color}>
              <span style={{ paddingLeft: '1rem', width: '100%' }}>
                <span style={style}>
                  <Surface width={10} height={10}>
                    <Symbols
                      cx={5}
                      cy={5}
                      type="circle"
                      size={50}
                      fill={color}
                    />
                  </Surface>
                </span>
                <span style={{ paddingLeft: '1rem', paddingRight: '1rem' }}>
                  {entry.value}
                </span>
              </span>
            </span>
          );
        })}
      </>
    );
  };

  return (
    <PieChart width={width} height={height}>
      <Pie
        activeIndex={activeIndex}
        activeShape={activeShape ? activeShape : renderActiveShape}
        data={data}
        dataKey="value"
        {...rest}
        onMouseEnter={onMouseEnter ? onMouseEnter : onPieEnter}>
        {data.map((entry, index) => (
          <Cell key={index} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip/>
      {legend ? (
        legend
      ) : (
        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          content={renderCusomizedLegend}
        />
      )}
    </PieChart>
  );
};

export default DefaultDonutChart;