import { LayersModel } from "@tensorflow/tfjs";
import * as tf from "@tensorflow/tfjs";

class LayersMLModel {
  constructor(private neuralNet: LayersModel) {}

  public async predict(filteredData: number[]): Promise<number[]> {
    const inputTensor = tf.tensor([filteredData]);
    const prediction: tf.Tensor = this.neuralNet.predict(
      inputTensor
    ) as tf.Tensor;
    try {
      const predictionOutput = (await prediction.data()) as Float32Array;
      return Array.from(predictionOutput);
    } catch (err) {
      console.error("Prediction error:", err);
      return Promise.reject(err);
    }
  }
}

export default LayersMLModel;
