//MLArea

import { BoxProps, Divider, List, HStack, ListItem } from "@chakra-ui/layout";
import {
  AspectRatio,
  Collapse,
  Icon,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tr,
  useDisclosure,
  VisuallyHidden,
} from "@chakra-ui/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  ModalHeader,
} from "@chakra-ui/modal";
import { Link } from "@chakra-ui/react";
import React, { ReactNode, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import AreaHeading from "../common/AreaHeading";
import { docStyles } from "../common/documentation-styles";
import HeadedScrollablePanel from "../common/HeadedScrollablePanel";
import { Anchor, useRouterTabSlug, useRouterState } from "../router-hooks";
import { useAnimationDirection } from "./common/documentation-animation-hooks";
import Dropzone, { DropzoneState, useDropzone } from "react-dropzone";
import CSS from "csstype";
import { RiFolderOpenLine } from "react-icons/ri";
import CollapsibleButton, {
  CollapsibleButtonComposableProps,
} from "../common/CollapsibleButton";
import FileInputButton from "../common/FileInputButton";
import { useProjectActions } from "../project/project-hooks";
import OpenButton from "../project/OpenButton";
import { Tooltip } from "@chakra-ui/tooltip";
import { RiRestartLine } from "react-icons/ri";
import AboutDialog from "../workbench/AboutDialog/AboutDialog";
import { useCallback, useRef } from "react";
import ModalCloseButton from "../common/ModalCloseButton";
import { Button } from "@chakra-ui/button";
import DragDropDialog from "./ml/DragDropDialog";
import DocumentationBreadcrumbHeading from "./common/DocumentationBreadcrumbHeading";
import { DataAndTrain } from "./ml/AllTogether";

const dataAndTrain = new DataAndTrain();

export const MLArea = () => {
  const [anchor, setAnchor] = useRouterTabSlug("modelTraining");
  const handleNavigate = useCallback(
    (id: string | undefined) => {
      setAnchor(id ? { id } : undefined, "documentation-user");
    },
    [setAnchor]
  );
  const direction = useAnimationDirection(anchor);
  return (
    <ActiveLevel
      key={anchor ? 0 : 1}
      anchor={anchor}
      onNavigate={handleNavigate}
      direction={direction}
    />
  );
};

interface ActiveLevelProps {
  anchor: Anchor | undefined;
  onNavigate: (state: string | undefined) => void;
  direction: "forward" | "back" | "none";
}

const ActiveLevel = ({ anchor, onNavigate, direction }: ActiveLevelProps) => {
  const intl = useIntl();
  const [, setParams] = useRouterState();
  const handleReferenceLink = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setParams({ tab: "modelTraining" });
    },
    [setParams]
  );
  const aboutDialogDisclosure = useDisclosure();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mlString = "Model Training";
  return (
    <HeadedScrollablePanel
      direction={direction}
      heading={
        <AreaHeading
          name={mlString}
          description={
            "Import your data from https://ml-machine.org/ and train and use your model."
          }
        />
      }
    >
      <DragDropDialog
        isOpen={aboutDialogDisclosure.isOpen}
        onClose={aboutDialogDisclosure.onClose}
        finalFocusRef={menuButtonRef}
      />
      <MLNode />
    </HeadedScrollablePanel>
  );
};

interface OpenFileButtonProps extends CollapsibleButtonComposableProps {}

const OpenFileButton = ({ children, ...props }: OpenFileButtonProps) => {
  return (
    <FileInputButton
      {...props}
      text="Open file"
      onOpen={dataAndTrain.open}
      data-testid="open"
      icon={<RiFolderOpenLine />}
      tooltip="Open a file."
      accept=".json"
    />
  );
};

interface MLNodeProps {}

const MLNode = (_: MLNodeProps) => {
  const sayHi = () => {
    console.log("Hi");
  };
  const [showButton, setShowButton] = useState(false);

  const reveal = () => {
    if (dataAndTrain.model != undefined) {
      setShowButton(true);
    }
  };

  return (
    <div style={area}>
      <DialogButton mode="button" minW="fit-content" />
      <OpenFileButton mode="button" minW="fit-content" />
      <button onClick={reveal}>Reveal</button>
      {showButton && <button onClick={sayHi}>Hidden</button>}
    </div>
  );
};

const area: CSS.Properties = {
  display: "flex",
  width: "95%",
  margin: "auto",
  height: "550px",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
};

interface DialogButtonProps extends CollapsibleButtonComposableProps {}

const DialogButton = (props: DialogButtonProps) => {
  const actions = useProjectActions();
  const intl = useIntl();
  const aboutDialogDisclosure = useDisclosure();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  return (
    <>
      <DragDropDialog
        isOpen={aboutDialogDisclosure.isOpen}
        onClose={aboutDialogDisclosure.onClose}
        finalFocusRef={menuButtonRef}
      />
      <Tooltip hasArrow label="Open a dialog to drop your file in.">
        <CollapsibleButton
          {...props}
          text="Open drag-and-drop"
          onClick={aboutDialogDisclosure.onOpen}
          icon={<RiFolderOpenLine />}
        />
      </Tooltip>
    </>
  );
};

/*const dropzone: CSS.Properties = {
  display: "flex",
  width: "95%",
  margin: "auto",
  height: "550px",
  border: "3px dotted grey",
  textAlign: "center",
  alignItems: "center",
  color: "grey",
};

interface MLNodeProps {}

const MLNode = (_: MLNodeProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];

      const reader = new FileReader();
      reader.readAsText(file);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false,
    noDragEventsBubbling: true,
  });

  return (
    <div style={dropzone} {...getRootProps()}>
      <input id="file" height="100%" {...getInputProps()} />
      {<p>Drag 'n' drop some files here, or click to select files</p>}
    </div>
  );
};*/

//previous version before looking at HexFlashTool file

/*function MLNode() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  // @ts-ignore
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} type="file" />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
};*/

/*const MLNode = ({
    anchor,
    parentType,
    ...props
  }: ApiDocEntryNodeProps) => {
    const [files, setFiles] = useState<(File)[]>([]);
  const {getRootProps, getInputProps} = useDropzone();

  const thumbs = files.map(file => (
    <div key={file.name}>
      <div>
      {file.name}
      </div>
    </div>
  ));

  return (
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} type="file" value={files}/>
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        {thumbs}
      </aside>
    </section>
  );
  };*/

/*const MLNode = ({
    anchor,
    parentType,
    ...props
  }: ApiDocEntryNodeProps) => {

  return (
    <Dropzone onDrop={(files: Array<File>) => {
    }}>
                {(state: DropzoneState) => {
                    return (<input {...state.getInputProps()} type="file"/>)
                }}
            </Dropzone>
  );
  };*/

export default MLArea;
