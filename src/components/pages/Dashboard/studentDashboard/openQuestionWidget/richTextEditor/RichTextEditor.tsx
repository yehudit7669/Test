import JoditEditor from "jodit-react";
import { useRef, useState, useEffect } from "react";
import EmojiData from "@emoji-mart/data/sets/14/apple.json";
import Picker from "@emoji-mart/react";
import { useToggle } from "../../../../../../hooks/useToggle";
import { renderToString } from "react-dom/server";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import "./RichTextEditor.css";

export default function RichTextEditor() {
  /* Rich Text Editor dependencies */
  const [editorValue, setEditorValue] = useState<string>("");
  /* Rich Text Editor dependencies */

  let editorInstance: any = null;
  const emojiStatusButtonRef = useRef<any>(null);

  /* Emoji Picker Dialog dependencies */
  const {
    status: emojiPickerStatus,
    changeStatus: handleChangeEmojiPickerStatus,
    setStatus: setEmojiPickerStatus,
  } = useToggle(false);
  /* Emoji Picker Dialog dependencies */

  /* Default editor config dependencies */
  const editorConfig: any = {
    zIndex: 0,
    readonly: false,
    placeholder: "Write your answer...",
    activeButtonsInReadOnly: ["source", "fullsize", "print", "about", "dots"],
    toolbarButtonSize: "middle",
    theme: "default",
    saveModeInCookie: false,
    spellcheck: true,
    editorCssClass: false,
    triggerChangeEvent: true,
    minWidth : 375,
    height: 300,
    minHeight: 300,
    direction: "",
    language: "auto",
    debugLanguage: false,
    i18n: "en",
    tabIndex: -1,
    toolbar: true,
    enter: "P",
    useSplitMode: false,
    colors: {
      greyscale: [
        "#000000",
        "#434343",
        "#666666",
        "#999999",
        "#B7B7B7",
        "#CCCCCC",
        "#D9D9D9",
        "#EFEFEF",
        "#F3F3F3",
        "#FFFFFF",
      ],
      palette: [
        "#980000",
        "#FF0000",
        "#FF9900",
        "#FFFF00",
        "#00F0F0",
        "#00FFFF",
        "#4A86E8",
        "#0000FF",
        "#9900FF",
        "#FF00FF",
      ],
      full: [
        "#E6B8AF",
        "#F4CCCC",
        "#FCE5CD",
        "#FFF2CC",
        "#D9EAD3",
        "#D0E0E3",
        "#C9DAF8",
        "#CFE2F3",
        "#D9D2E9",
        "#EAD1DC",
        "#DD7E6B",
        "#EA9999",
        "#F9CB9C",
        "#FFE599",
        "#B6D7A8",
        "#A2C4C9",
        "#A4C2F4",
        "#9FC5E8",
        "#B4A7D6",
        "#D5A6BD",
        "#CC4125",
        "#E06666",
        "#F6B26B",
        "#FFD966",
        "#93C47D",
        "#76A5AF",
        "#6D9EEB",
        "#6FA8DC",
        "#8E7CC3",
        "#C27BA0",
        "#A61C00",
        "#CC0000",
        "#E69138",
        "#F1C232",
        "#6AA84F",
        "#45818E",
        "#3C78D8",
        "#3D85C6",
        "#674EA7",
        "#A64D79",
        "#85200C",
        "#990000",
        "#B45F06",
        "#BF9000",
        "#38761D",
        "#134F5C",
        "#1155CC",
        "#0B5394",
        "#351C75",
        "#733554",
        "#5B0F00",
        "#660000",
        "#783F04",
        "#7F6000",
        "#274E13",
        "#0C343D",
        "#1C4587",
        "#073763",
        "#20124D",
        "#4C1130",
      ],
    },
    colorPickerDefaultTab: "background",
    imageDefaultWidth: 300,
    removeButtons: [],
    extraButtons: [
      {
        name: "emoji",
        icon: renderToString(<SentimentSatisfiedAltIcon />),
        tooltip: "Emoji",
        exec: () => {
          emojiStatusButtonRef?.current.click();
        },
      },
    ],
    disablePlugins: [],
    sizeLG: 900,
    sizeMD: 700,
    sizeSM: 400,
    buttons: [
      "source",
      "|",
      "bold",
      "strikethrough",
      "underline",
      "italic",
      "|",
      "ul",
      "ol",
      "|",
      "outdent",
      "indent",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "video",
      "table",
      "link",
      "|",
      "align",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "symbols",
      "fullsize",
      "print",
    ],
    buttonsXS: [
      "bold",
      "image",
      "|",
      "brush",
      "paragraph",
      "|",
      "align",
      "|",
      "undo",
      "redo",
      "|",
      "eraser",
      "dots",
    ],
    textIcons: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
    events: {
      afterInit: (instance: any) => {
        editorInstance = instance;
      },
    },
    showCharsCounter: false,
    showWordsCounter: false,
    showXPathInStatusbar: false,
  };
  /* Default editor config dependencies */

  /* On component mount Check if user has clicked outside the emoji picker then close the emoji picker */
  useEffect(() => {
    const handleClickOutsideEmojiWrapper = (event: any) => {
      const emojiIcon = document.querySelector("[aria-label='Emoji']");
      const container: HTMLElement | null = document.getElementById(
        "EmojiPicker_Container"
      );
      if (event.target?.ariaLabel !== emojiIcon?.ariaLabel) {
        if (container && !container.contains(event.target)) {
          setEmojiPickerStatus(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutsideEmojiWrapper);

    return () => {
      document.removeEventListener("click", handleClickOutsideEmojiWrapper);
    };
  }, []);
  /* On component mount Check if user has clicked outside the emoji picker then close the emoji picker */

  /***** Render rich text editor *****/
  const renderRichTextEditor = () => {
    return (
      <>
        <JoditEditor
          config={editorConfig}
          value={editorValue}
          onChange={(event) => console.log(event, "editor change event")}
        />
      </>
    );
  };
  /***** Render rich text editor *****/

  /***** Render Emoji Picker Container *****/
  const renderEmojiPickerContainer = () => {
    /* Function definition for Emoji Picker - On change */
    const handleEmojiSelect = (emoji: any) => {
      editorInstance?.selection?.insertHTML(`${emoji.native}`);
    };
    /* Function definition for Emoji Picker - On change */

    return (
      <div id="EmojiPicker_Container" className="EmojiPicker_Wrapper">
        <button
          ref={emojiStatusButtonRef}
          style={{ display: "none" }}
          onClick={handleChangeEmojiPickerStatus}
        ></button>
        {emojiPickerStatus ? (
          <Picker
            set="apple"
            data={EmojiData}
            onEmojiSelect={handleEmojiSelect}
            emojiButtonSize={27}
            emojiSize={20}
            previewPosition="none"
          />
        ) : null}
      </div>
    );
  };
  /***** Render Emoji Picker Container *****/

  return (
    <>
      <div className="RichTextEditor_Wrapper">
        {renderRichTextEditor()}
        {renderEmojiPickerContainer()}
      </div>
    </>
  );
}
