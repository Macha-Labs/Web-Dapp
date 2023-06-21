import layoutInputs from "@/layouts/options/LayoutInputs";
import { StyledCard, StyledCol, StyledRow } from "@/styles/StyledComponents";
import { Box, Button, Heading, Text } from "@chakra-ui/react";
import FlexColumn from "../flex/FlexColumn";
import ButtonNative from "../buttons/ButtonNative";
import IconImage from "../icons/IconImage";
import { style as gStyle } from "../../styles/StyledConstants";
import LayoutTextArea from "@/layouts/options/LayoutTextArea";
import { DragEvent, useRef, useState } from "react";
import IconBase from "../icons/IconsBase";

type Props = {
  id?: any;
  labelText?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: any;
  padding?: string;
  disabled?: boolean;
  elementRef?: any;
  inputType: string;
  marginTop?: string;
  marginLeft?: string;
  marginBottom?: string;
  marginRight?: string;
};

const InputLabel = ({
  id,
  labelText,
  placeholder,
  defaultValue,
  onChange = (e?: any) => {},
  padding,
  disabled = false,
  elementRef,
  inputType,
  marginTop,
  marginLeft,
  marginBottom,
  marginRight,
}: Props) => {
  // for text type inputs
  const inputLabelText = () => {
    return (
      <FlexColumn
        width="100%"
        vrAlign="flex-start"
        padding={padding}
        height="fit-content"
        hrAlign="flex-start"
        marginTop={marginTop ? marginTop : ""}
      >
        {labelText && (
          <Heading
            as="h6"
            size="sm"
            bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
            bgClip="text"
          >
            {labelText}
          </Heading>
        )}

        <StyledCard className="w-100">
          {layoutInputs({
            id,
            elementRef,
            placeholder,
            defaultValue,
            onChange,
            disabled,
          })}
          {/* <LayoutInputs
            elementRef={elementRef}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            style={{ class: "" }}
          /> */}
        </StyledCard>
      </FlexColumn>
    );
  };

  // for uploading attachments
  const InputLabelFile = () => {
    const [dragActive, setDragActive] = useState(false);
    const inputRef = useRef(null);

    const onButtonClick = () => {
      inputRef?.current?.click();
    };

    const handleDrag = (e: DragEvent<HTMLDivElement | HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement | HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();

      setDragActive(false);
      const files = Array.from(e.dataTransfer.files);
      const fileInput = e.target as HTMLInputElement;
      if (files && files.length > 0) {
        const transferredFile = files[0];
        const fileList = new DataTransfer();
        fileList.items.add(transferredFile);

        Object.defineProperty(fileInput, "files", {
          value: fileList.files,
          writable: false,
        });

        // Handle the transferred file using e.target.files
        if (fileInput.files && fileInput.files[0]) {
          const droppedFile = fileInput.files[0];
          console.log("Transferred file:", droppedFile);
        }
      }
      onChange(e);
    };

    return (
      <FlexColumn
        width="100%"
        padding={padding}
        height="fit-content"
        vrAlign="flex-start"
        marginTop={marginTop ? marginTop : "sm"}
      >
        <Heading
          as="h6"
          size="sm"
          bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
          bgClip="text"
          lineHeight={1.3}
          // className="m-b-1"
        >
          {labelText}
        </Heading>
        <Box
          // background="red"
          border="2px dashed #004AD9"
          minHeight="200px"
          width="100%"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          borderRadius={gStyle.input.borderRadius.default}
        >
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            // id="upload-file"
            multiple={true}
            onChange={(e?: any) => {
              if (e.target.files && e.target.files[0]) {
                onChange(e);
                const file = e.target.files[0];
                console.log("Selected file:", file);
              }
            }}
            hidden
          />
          <label
            id="label-file-upload"
            htmlFor="input-file-upload"
            className={dragActive ? "drag-active" : ""}
            style={{ width: "100%", height: "100%" }}
          >
            <FlexColumn width="100%">
              <IconBase
                slug="icon-upload"
                style={{ marginBottom: "sm" }}
                size="2xl"
              />
              <Text className="m-b-0">Drag and drop here </Text>
              <Text
                bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
                bgClip="text"
                fontWeight={600}
                className="m-b-0"
              >
                Or
              </Text>
              <Text onClick={onButtonClick} className="m-b-0">
                Browse Files
              </Text>
            </FlexColumn>
          </label>
          {/* {dragActive && (
          <div
            id="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )} */}
        </Box>
      </FlexColumn>
    );
  };

  const InputLabelTextArea = () => {
    return (
      <FlexColumn
        width="100%"
        vrAlign="flex-start"
        hrAlign="flex-start"
        height="fit-content"
        padding={padding}
        marginTop={marginTop ? marginTop : "sm"}
        // marginTop={"100px"}
      >
        <Heading
          as="h6"
          size="sm"
          bgGradient="linear(
                  100.07deg,
                  #2a85ff 0.39%,
                  #2448c7 73.45%
                )"
          bgClip="text"
        >
          {labelText}
        </Heading>

        <StyledCard className="w-100">
          {LayoutTextArea({
            elementRef,
            placeholder,
            defaultValue,
            onChange,
            disabled,
          })}
          {/* <LayoutInputs
            elementRef={elementRef}
            placeholder={placeholder}
            defaultValue={defaultValue}
            onChange={onChange}
            disabled={disabled}
            style={{ class: "" }}
          /> */}
        </StyledCard>
      </FlexColumn>
    );
  };

  if (inputType == "file") {
    return <InputLabelFile />;
  } else if (inputType == "textArea") {
    return <InputLabelTextArea />;
  } else {
    return inputLabelText();
  }
};

export default InputLabel;
