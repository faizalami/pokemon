/** @jsxImportSource @emotion/react */
import { useMemo } from 'react';
import DetailSection from './DetailSection';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { gray } from '../../../components/variables';
import { css } from '@emotion/react';
import { margin } from '../../../components/utilities';
import mediaQueries from '../../../components/media-queries';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);

const radarWrapper = css`
  width: 100%;

  ${margin.aAuto}
  ${mediaQueries.lg} {
    width: 300px;
  }
`;

function BaseStats ({ detail }) {
  const radarColor = useMemo(() => {
    const color = detail?.species?.color?.name || gray;
    if (color === 'white') {
      return gray;
    }
    return color;
  }, [detail]);

  const radarDataSet = useMemo(() => {
    return {
      labels: detail?.stats?.map(stat => stat.stat.name.replace('-', ' ')) || [],
      datasets: [
        {
          data: detail?.stats?.map(stat => stat.base_stat) || [],
          borderWidth: 1,
          borderColor: radarColor,
        },
      ],
    };
  }, [detail, radarColor]);

  const radarOptions = useMemo(() => {
    return {
      pointRadius: 10,
      pointBackgroundColor: radarColor,
      plugins: {
        legend: { display: false },
      },
      scales: {
        r: {
          pointLabels: {
            display: false,
          },
          min: 0,
          ticks: {
            stepSize: 20,
          },
        },
      },
    };
  }, [radarColor]);
  return (
    <DetailSection title="Base Stats">
      <div css={radarWrapper}>
        <Radar options={radarOptions} data={radarDataSet}/>
      </div>
    </DetailSection>
  );
}

export default BaseStats;
