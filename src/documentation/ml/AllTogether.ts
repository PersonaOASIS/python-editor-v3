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

  open = async (files: File[]): Promise<void> => {
    const extensions = new Set(
      files.map((f) => getLowercaseFileExtension(f.name))
    );
    if (extensions.has("json")) {
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
    } else if (extensions.has("hex")) {
      console.log("received file");
      const file = files[0];
      const hexString = await readFileAsText(file);
      var microbitFS = new MicropythonFsHex(hexString);
      var classes = "no";
      if (this.classNames != undefined) {
        classes = this.classNames.join(" ");
      } else {
        classes = "shake still";
      }
      microbitFS.create("namesOfClasses.txt", classes);
      var fileContent = microbitFS.read("namesOfClasses.txt");
      console.log(fileContent);
      var intelHexStringWithFs = microbitFS.getIntelHex();
      const blob = new Blob([intelHexStringWithFs], {
        type: "application/octet-stream",
      });
      saveAs(blob, "saveHexWithFiles.hex");
    }
  };
}
