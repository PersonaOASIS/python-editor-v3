//Data types to facilitate the model training.
type PersistantGestureData = {
  name: string;
  ID: number;
  recordings: RecordingData[];
};

type RecordingData = {
  ID: number;
  data: {
    x: number[];
    y: number[];
    z: number[];
  };
};

export type TrainingData = {
  classes: {
    samples: {
      value: number[];
    }[];
  }[];
};

//Parses the passed JSON string, extracts the class names and applies the filters on the data for the model training.
export const prepData = (jsonString: string): [TrainingData, string[]] => {
  const jsonObjects = JSON.parse(jsonString) as PersistantGestureData[];

  const classNames = jsonObjects.map((jsonObject) => {
    return jsonObject.name;
  });

  const classes = jsonObjects.map((jsonObject) => {
    return {
      samples: buildFilteredSamples(jsonObject.recordings),
    };
  });

  return [
    {
      classes,
    },
    classNames,
  ];
};

const buildFilteredSamples = (recordings: RecordingData[]) => {
  return recordings.map((recording) => {
    const data = recording.data;
    return {
      value: [
        ...applyFilters(data.x),
        ...applyFilters(data.y),
        ...applyFilters(data.z),
      ],
    };
  });
};

//Applies each of the 8 filters in order.
const applyFilters = (data: number[]): number[] => {
  const filteredData: number[] = [];
  //MAX filter
  filteredData.push(Math.max(...data));
  //MIN filter
  filteredData.push(Math.min(...data));
  //MEAN filter
  filteredData.push(meanFilter(data));
  //STD filter (standard deviation)
  filteredData.push(stddevFilter(data));
  //PEAKS filter
  filteredData.push(peaksFilter(data));
  //ACC filter
  filteredData.push(data.reduce((a, b) => a + Math.abs(b)));
  //ZCR filter (zero crossing rate)
  filteredData.push(zcrFilter(data));
  //RMS filter (root mean square)
  filteredData.push(
    Math.sqrt(data.reduce((a, b) => a + Math.pow(b, 2), 0) / data.length)
  );
  return filteredData;
};

const meanFilter = (data: number[]): number => {
  let value = 0;
  for (let i = 0; i < data.length; i++) {
    value = value + data[i];
  }
  value = value / data.length;
  return value;
};

const stddevFilter = (data: number[]): number => {
  let mean = meanFilter(data);
  let value = 0;
  for (let i = 0; i < data.length; i++) {
    value = value + Math.pow(data[i] - mean, 2);
  }
  value = value / data.length;
  value = Math.pow(value, 0.5);
  return value;
};

const peaksFilter = (inValues: number[]): number => {
  const lag = 5;
  const threshold = 3.5;
  const influence = 0.5;

  let peaksCounter = 0;

  if (inValues.length < lag + 2) {
    throw new Error("data sample is too short");
  }

  // init variables
  const signals = Array(inValues.length).fill(0) as number[];
  const filteredY = inValues.slice(0);
  const lead_in = inValues.slice(0, lag);

  const avgFilter: number[] = [];
  avgFilter[lag - 1] = meanFilter(lead_in);
  const stdFilter: number[] = [];
  stdFilter[lag - 1] = stddevFilter(lead_in);

  for (let i = lag; i < inValues.length; i++) {
    if (
      Math.abs(inValues[i] - avgFilter[i - 1]) > 0.1 &&
      Math.abs(inValues[i] - avgFilter[i - 1]) > threshold * stdFilter[i - 1]
    ) {
      if (inValues[i] > avgFilter[i - 1]) {
        signals[i] = +1; // positive signal
        if (i - 1 > 0 && signals[i - 1] == 0) {
          peaksCounter++;
        }
      } else {
        signals[i] = -1; // negative signal
      }
      // make influence lower
      filteredY[i] =
        influence * inValues[i] + (1 - influence) * filteredY[i - 1];
    } else {
      signals[i] = 0; // no signal
      filteredY[i] = inValues[i];
    }

    // adjust the filters
    const y_lag = filteredY.slice(i - lag, i);
    avgFilter[i] = meanFilter(y_lag);
    stdFilter[i] = stddevFilter(y_lag);
  }
  return peaksCounter;
};

const zcrFilter = (data: number[]): number => {
  let count = 0;
  for (let i = 1; i < data.length; i++) {
    if (
      (data[i] >= 0 && data[i - 1] < 0) ||
      (data[i] < 0 && data[i - 1] >= 0)
    ) {
      count++;
    }
  }
  return count / (data.length - 1);
};
