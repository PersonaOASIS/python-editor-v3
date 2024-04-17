import { getLowercaseFileExtension, readFileAsText } from "../../fs/fs-util";
import { prepData } from "./DataPrep";
import LayersMLModel from "./LayersMLModel";
import LayersModelTrainer, {
  LayersModelTrainingSettings,
} from "./LayersModelTrainer";

export class DataAndTrain {
  model: LayersMLModel | undefined;
  classNames: string[] | undefined;

  //Receives the file, sends the data to be prepared to be inputted into the model,
  //and then trains the model, saving it and the class names into the object.
  open = async (files: File[]): Promise<string> => {
    const extensions = new Set(
      files.map((f) => getLowercaseFileExtension(f.name))
    );
    const file = files[0];
    const fileText = await readFileAsText(file);
    let [trainingData, classNames] = prepData(fileText);
    this.classNames = classNames;
    const layersModelTrainingSettings: LayersModelTrainingSettings = {
      noOfEpochs: 80,
      batchSize: 16,
      learningRate: 0.5,
      validationSplit: 0.1,
      noOfUnits: 16, // size of hidden layer
    };
    let trainer = new LayersModelTrainer(layersModelTrainingSettings);
    this.model = await trainer.trainModel(trainingData);
    return this.classNames.join(" ");
  };
}
