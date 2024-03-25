import { VersionAction, FileSystem } from "../../fs/fs";
import { useFileSystem } from "../../fs/fs-hooks";
import { getLowercaseFileExtension, readFileAsText } from "../../fs/fs-util";
import { prepData } from "./DataPrep";
import LayersMLModel from "./LayersMLModel";
import LayersModelTrainer, {
  LayersModelTrainingSettings,
} from "./LayersModelTrainer";
import { MicropythonFsHex } from "@microbit/microbit-fs";

export class DataAndTrain {
  model: LayersMLModel | undefined;
  classNames: string[] | undefined;

  open = async (files: File[]): Promise<string> => {
    const extensions = new Set(
      files.map((f) => getLowercaseFileExtension(f.name))
    );
    const file = files[0];
    const fileText = await readFileAsText(file);
    let [trainingData, classNames] = prepData(fileText);
    console.log("Training data:");
    console.log(trainingData);
    console.log("Class Names:");
    console.log(classNames);
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
    console.log("Model:");
    console.log(this.model);
    return this.classNames.join(" ");
  };
}
