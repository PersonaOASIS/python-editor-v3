//MLArea

import { List } from "@chakra-ui/layout";
import { useDisclosure } from "@chakra-ui/react";
import React, { useState } from "react";
import { useIntl } from "react-intl";
import HeadedScrollablePanel from "../common/HeadedScrollablePanel";
import { Anchor, useRouterTabSlug, useRouterState } from "../router-hooks";
import { useAnimationDirection } from "./common/documentation-animation-hooks";
import CSS from "csstype";
import { RiFolderOpenLine } from "react-icons/ri";
import CollapsibleButton, {
  CollapsibleButtonComposableProps,
} from "../common/CollapsibleButton";
import FileInputButton from "../common/FileInputButton";
import { useProjectActions } from "../project/project-hooks";
import { Tooltip } from "@chakra-ui/tooltip";
import { useCallback, useRef } from "react";
import DragDropDialog from "./ml/DragDropDialog";
import DocumentationBreadcrumbHeading from "./common/DocumentationBreadcrumbHeading";
import { DataAndTrain } from "./ml/AllTogether";
import DocumentationTopLevelItem from "./common/DocumentationTopLevelItem";
import CodeEmbed from "./common/CodeEmbed";

const dataAndTrain = new DataAndTrain();

//use handleNavigate the same way reference is using, with the topic if for the return too and see if that works
export const MLArea = () => {
  const [anchor, setAnchor] = useRouterTabSlug("modelTraining");
  const id = anchor ? "modelCode" : undefined;
  const handleNavigate = useCallback(
    (id: string | undefined) => {
      setAnchor(
        id && dataAndTrain.model ? { id } : undefined,
        "documentation-user"
      );
    },
    [setAnchor]
  );
  const direction = useAnimationDirection(anchor);
  return (
    <ActiveLevel
      key={anchor ? 0 : 1}
      id={id}
      anchor={anchor}
      onNavigate={handleNavigate}
      direction={direction}
    />
  );
};

interface ActiveLevelProps {
  anchor: Anchor | undefined;
  id: string | undefined;
  onNavigate: (state: string | undefined) => void;
  direction: "forward" | "back" | "none";
}

//Now that the CodeEmbed on its own is proven to work, make it look good and arrage itself like the ReferenceTopicEntry ones
const ActiveLevel = ({
  anchor,
  id,
  onNavigate,
  direction,
}: ActiveLevelProps) => {
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
  const code = "import ml\nthat = ml.this()";
  if (id) {
    return (
      <HeadedScrollablePanel
        direction={direction}
        heading={
          <DocumentationBreadcrumbHeading
            parent={mlString}
            title={mlString}
            onBack={() => onNavigate(undefined)}
            subtitle={
              "Import your data from https://ml-machine.org/ and train and use your model."
            }
          />
        }
      >
        <div>
          <p>Hello</p>
        </div>
        <CodeEmbed code={code} />
      </HeadedScrollablePanel>
    );
  }
  return (
    <HeadedScrollablePanel direction={direction}>
      <DragDropDialog
        isOpen={aboutDialogDisclosure.isOpen}
        onClose={aboutDialogDisclosure.onClose}
        finalFocusRef={menuButtonRef}
      />
      <List flex="1 1 auto">
        <DocumentationTopLevelItem
          name={mlString}
          description={
            "Import your data from https://ml-machine.org/ and train and use your model."
          }
          onForward={() => onNavigate("modelCode")}
          type="modelTraining"
        />
        <MLNode />
      </List>
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
      accept=".json, .hex"
    />
  );
};

interface MLNodeProps {}

const MLNode = (_: MLNodeProps) => {
  const sayHi = () => {
    console.log("Hi");
  };
  const [showButton, setShowButton] = useState(false);

  /*const reveal = () => {
    setOk(true);
  };*/

  return (
    <div style={area}>
      <OpenFileButton mode="button" minW="fit-content" />
    </div>
  );
};
/*<DialogButton mode="button" minW="fit-content" />
      <button onClick={reveal}>Reveal</button>
      {showButton && <button onClick={sayHi}>Hidden</button>}*/

const area: CSS.Properties = {
  display: "flex",
  width: "95%",
  margin: "auto",
  height: "550px",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
};

/*interface DialogButtonProps extends CollapsibleButtonComposableProps {}

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
};*/

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
};

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
