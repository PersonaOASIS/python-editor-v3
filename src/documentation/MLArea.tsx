//MLArea

import { List } from "@chakra-ui/layout";
import { Box, Divider, ListItem, useDisclosure } from "@chakra-ui/react";
import { useIntl } from "react-intl";
import HeadedScrollablePanel from "../common/HeadedScrollablePanel";
import { Anchor, useRouterTabSlug, useRouterState } from "../router-hooks";
import { useAnimationDirection } from "./common/documentation-animation-hooks";
import CSS from "csstype";
import { RiFolderOpenLine } from "react-icons/ri";
import { CollapsibleButtonComposableProps } from "../common/CollapsibleButton";
import FileInputButton from "../common/FileInputButton";
import { useCallback, useRef } from "react";
import DragDropDialog from "./ml/DragDropDialog";
import DocumentationBreadcrumbHeading from "./common/DocumentationBreadcrumbHeading";
import { DataAndTrain } from "./ml/AllTogether";
import DocumentationTopLevelItem from "./common/DocumentationTopLevelItem";
import { useFileSystem } from "../fs/fs-hooks";
import { VersionAction } from "../fs/fs";
import { ToolkitTopic, ToolkitTopicEntry } from "./reference/model";
import { Slug } from "../common/sanity";
import DocumentationContent from "./common/DocumentationContent";
import { docStyles } from "../common/documentation-styles";
import ReferenceTopicEntry from "./reference/ReferenceTopicEntry";

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
  const aboutDialogDisclosure = useDisclosure();
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mlString = "Model Training";
  const code = "import ml\nthat = ml.this()";
  if (id) {
    var mlCodeCopy = {} as ToolkitTopic;
    mlCodeCopy.name = "ML Model";
    mlCodeCopy.subtitle = "Use the machine learning model that was trained.";
    mlCodeCopy.compatibility = ["microbitV1", "microbitV2"];
    const slug = {} as Slug;
    slug.current = "mlmodel";
    mlCodeCopy.slug = slug;
    const contentGetClassNames = {} as ToolkitTopicEntry;
    contentGetClassNames.name = "Class Names";
    const slugGCN = {} as Slug;
    slugGCN.current = "getClassNames";
    contentGetClassNames.slug = slugGCN;
    contentGetClassNames.parent = mlCodeCopy;
    contentGetClassNames.content = [
      {
        _type: "block",
        _key: "asdfghjklkjh",
        children: [
          {
            _key: "qwertyuiopoi",
            _type: "span",
            marks: [],
            text: "Return the class names of the current model.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
      {
        _type: "python",
        _key: "zxcvbnmnbvcx",
        main: "import ml\n\n\nnamesList = ml.get_class_names()",
      },
    ];
    const contentCurrentAction = {} as ToolkitTopicEntry;
    contentCurrentAction.name = "Current Action";
    const slugCA = {} as Slug;
    slugCA.current = "currentAction";
    contentCurrentAction.slug = slugCA;
    contentCurrentAction.parent = mlCodeCopy;
    contentCurrentAction.content = [
      {
        _type: "block",
        _key: "asdfghjklkjh",
        children: [
          {
            _key: "qwertyuiopoi",
            _type: "span",
            marks: [],
            text: "Return the current recognised action.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
      {
        _type: "python",
        _key: "zxcvbnmnbvcx",
        main: "import ml\n\n\ndisplay.scroll(ml.current_action())",
      },
    ];
    const contentIsAction = {} as ToolkitTopicEntry;
    contentIsAction.name = "Is Action";
    const slugIA = {} as Slug;
    slugIA.current = "isAction";
    contentIsAction.slug = slugIA;
    contentIsAction.parent = mlCodeCopy;
    contentIsAction.alternativesLabel = "Select action:";
    contentIsAction.content = [
      {
        _type: "block",
        _key: "asdfghjklkjh",
        children: [
          {
            _key: "qwertyuiopoi",
            _type: "span",
            marks: [],
            text: "Check if an action is currently being performed.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ];
    contentIsAction.alternatives = [];
    const classNames = dataAndTrain.classNames;
    const sluggg: Slug = { _type: "slug", current: "sluggy" };
    if (classNames) {
      const slugArray: Slug[] = classNames.map((name) => ({
        _type: "slug",
        current: name,
      }));
      const array = classNames.map((name) => ({
        name: name,
        slug: sluggg,
        content: [
          {
            _type: "block",
            _key: "asdfghjklkjh",
            children: [
              {
                _key: "qwertyuiopoi",
                _type: "span",
                marks: [],
                text: "Triggered on the current recognised action.",
              },
            ],
            markDefs: [],
            style: "normal",
          },
          {
            _type: "python",
            _key: "zxcvbnmnbvcx",
            main:
              "import ml\n\n\nwhile True:\n    if ml.is_action('" +
              name +
              "')\n        display.scroll('Yes')",
          },
        ],
      }));
      for (let i = 0; i < classNames.length; i++) {
        array[i].slug = slugArray[i];
      }
      contentIsAction.alternatives = array;
    }
    const contentWasAction = {} as ToolkitTopicEntry;
    contentWasAction.name = "Was Action";
    const slugWA = {} as Slug;
    slugWA.current = "wasAction";
    contentWasAction.slug = slugWA;
    contentWasAction.parent = mlCodeCopy;
    contentWasAction.alternativesLabel = "Select action:";
    contentWasAction.content = [
      {
        _type: "block",
        _key: "asdfghjklkjh",
        children: [
          {
            _key: "qwertyuiopoi",
            _type: "span",
            marks: [],
            text: "Check if an action was performed.",
          },
        ],
        markDefs: [],
        style: "normal",
      },
    ];
    contentWasAction.alternatives = [];
    if (classNames) {
      const slugArrayW: Slug[] = classNames.map((name) => ({
        _type: "slug",
        current: name,
      }));
      const arrayW = classNames.map((name) => ({
        name: name,
        slug: sluggg,
        content: [
          {
            _type: "block",
            _key: "asdfghjklkjh",
            children: [
              {
                _key: "qwertyuiopoi",
                _type: "span",
                marks: [],
                text: "Triggered if the specified action was recognised since last time.",
              },
            ],
            markDefs: [],
            style: "normal",
          },
          {
            _type: "python",
            _key: "qwsazxerfdcv",
            main:
              "import ml\n\n\nif ml.was_action('" +
              name +
              "')\n    display.scroll('Yes')",
          },
        ],
      }));
      for (let i = 0; i < classNames.length; i++) {
        arrayW[i].slug = slugArrayW[i];
      }
      contentWasAction.alternatives = arrayW;
    }
    mlCodeCopy.contents = [
      contentGetClassNames,
      contentCurrentAction,
      contentIsAction,
      contentWasAction,
    ];
    const mlCode = mlCodeCopy;
    return (
      <HeadedScrollablePanel
        // Key prop used to ensure scroll position top
        // after using internal link to toolkit topic.
        key={mlCode.name}
        direction={direction}
        heading={
          <DocumentationBreadcrumbHeading
            parent={mlString}
            title={mlCode.name}
            onBack={() => onNavigate(undefined)}
            subtitle={mlCode.subtitle}
          />
        }
      >
        {mlCode.introduction && (
          <Box
            p={5}
            pb={1}
            fontSize="sm"
            sx={{
              ...docStyles,
            }}
          >
            <DocumentationContent content={mlCode.introduction} />
          </Box>
        )}
        <List flex="1 1 auto">
          {mlCode.contents?.map((item) => (
            <ListItem key={item.name}>
              <ReferenceTopicEntry
                topic={mlCode}
                entry={item}
                anchor={anchor}
              />
              <Divider />
            </ListItem>
          ))}
        </List>
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
  var fs = useFileSystem();
  const open = async (file: File[]): Promise<void> => {
    const names = await dataAndTrain.open(file);
    fs.write("namesOfClasses.txt", names, VersionAction.MAINTAIN);
  };
  return (
    <FileInputButton
      {...props}
      text="Open file"
      onOpen={open}
      data-testid="open"
      icon={<RiFolderOpenLine />}
      tooltip="Open a file."
      accept=".json"
    />
  );
};

interface MLNodeProps {}

const MLNode = (_: MLNodeProps) => {
  return (
    <div style={area}>
      <OpenFileButton mode="button" minW="fit-content" />
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

export default MLArea;
