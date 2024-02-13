//MLArea

import { BoxProps, Divider, List, ListItem } from "@chakra-ui/layout";
import { Link } from "@chakra-ui/react";
import React, { ReactNode, useCallback} from "react";
import { FormattedMessage, useIntl } from "react-intl";
import AreaHeading from "../common/AreaHeading";
import { docStyles } from "../common/documentation-styles";
import HeadedScrollablePanel from "../common/HeadedScrollablePanel";
import { Anchor, useRouterTabSlug, useRouterState } from "../router-hooks";
import { useAnimationDirection } from "./common/documentation-animation-hooks";
import Dropzone, { DropzoneState, useDropzone } from 'react-dropzone'


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
  
const ActiveLevel = ({
    anchor,
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
    return (
      <HeadedScrollablePanel
        direction={direction}
        heading={
          <div>
            <h2> Model Training </h2>
          </div>
        }
      >
        <MLNode />
      </HeadedScrollablePanel>
    );
};

const kindToSpacing: Record<string, any> = {
    module: 5,
    class: 5,
    variable: 4,
    function: 4,
};

interface MLNodeProps {}

const MLNode = (_: MLNodeProps) =>{
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 1) {
      const file = acceptedFiles[0];
  
      const reader = new FileReader();
      reader.readAsText(file);
    }
  }, []);
  // @ts-ignore
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    multiple: false
  });

  return (
    <div {...getRootProps()}>
      <input id="file" {...getInputProps()} />
      {
          <p>Drag 'n' drop some files here, or click to select files</p>
      }
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
  