import { readFileAsText } from "../../fs/fs-util";
import { prepData } from "./DataPrep";
import LayersMLModel from "./LayersMLModel";
import LayersModelTrainer, {
  LayersModelTrainingSettings,
} from "./LayersModelTrainer";

export class DataAndTrain {
  model: LayersMLModel | undefined;
  classNames: string[] | undefined;

  open = async (files: File[]): Promise<void> => {
    const file = files[0];
    const fileText = await readFileAsText(file);
    let [trainingData, classNames] = prepData(fileText);
    console.log(trainingData);
    console.log(classNames);
    this.classNames = classNames;
    console.log(this.classNames);
    const layersModelTrainingSettings: LayersModelTrainingSettings = {
      noOfEpochs: 80,
      batchSize: 16,
      learningRate: 0.5,
      validationSplit: 0.1,
      noOfUnits: 16, // size of hidden layer
    };
    let trainer = new LayersModelTrainer(layersModelTrainingSettings);
    this.model = await trainer.trainModel(trainingData);
    console.log(this.model);
  };
}
