import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
} from "@chakra-ui/modal";
import { FormattedMessage, useIntl } from "react-intl";
import ModalCloseButton from "../../common/ModalCloseButton";
import { Button } from "@chakra-ui/button";
import { useCallback, useRef } from "react";
import { useDropzone } from "react-dropzone";
import CSS from "csstype";
import { prepData } from "./DataPrep";
import LayersModelTrainer, {
  LayersModelTrainingSettings,
} from "./LayersModelTrainer";
import LayersMLModel from "./LayersMLModel";
import { TrainingData } from "./DataPrep";

interface DragDropDialogProps {
  isOpen: boolean;
  onClose: () => void;
  finalFocusRef: React.RefObject<HTMLButtonElement>;
}

const DragDropDialog = ({
  isOpen,
  onClose,
  finalFocusRef,
}: DragDropDialogProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      finalFocusRef={finalFocusRef}
    >
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <DialogDrag />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} variant="solid" size="lg">
              <FormattedMessage id="close-action" />
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

interface DialogDragProps {}

const dropzoneDialog: CSS.Properties = {
  display: "flex",
  margin: "auto",
  width: "800px",
  height: "600px",
  border: "3px dotted grey",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  color: "grey",
};

async function getModel(
  trainer: LayersModelTrainer,
  trainingData: TrainingData
): Promise<LayersMLModel> {
  const model = await trainer.trainModel(trainingData);
  return model;
}

const DialogDrag = (_: DialogDragProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];

      if (file.name.toLowerCase().endsWith(".json")) {
        const reader = new FileReader();
        console.log("THIS IS A CORRECT FILE");

        var trainingData;

        reader.onloadend = (evt) => {
          const jsonString = evt.target?.result;
          if (typeof jsonString == "string") {
            let [trainingData, classNames] = prepData(jsonString);
            const layersModelTrainingSettings: LayersModelTrainingSettings = {
              noOfEpochs: 80,
              batchSize: 16,
              learningRate: 0.5,
              validationSplit: 0.1,
              noOfUnits: 16, // size of hidden layer
            };
            let trainer = new LayersModelTrainer(layersModelTrainingSettings);

            /*const model = getModel(trainer, trainingData);
            model.then((value) => {
              console.log(value);
            });*/
            const model = trainer.trainModel(trainingData);
            console.log(model);
          }
        };

        reader.readAsText(file);
      }
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    noDragEventsBubbling: true,
  });

  return (
    <div style={dropzoneDialog} {...getRootProps()}>
      <input id="file" height="100vh" width="100vh" {...getInputProps()} />
      {<p>Drag 'n' drop some files here, or click to select files</p>}
    </div>
  );
};

export default DragDropDialog;
