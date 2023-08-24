import LayoutInputs from "@/layouts/options/LayoutInputs";
import LayoutTextArea from "@/layouts/options/LayoutTextArea";
import { StyledCard } from "@/styles/StyledComponents";
import { Box, Heading, Text, Tooltip, useToast } from "@chakra-ui/react";
import { DragEvent, useRef, useState } from "react";
import { style as gStyle } from "../../styles/StyledConstants";
import ButtonNative from "../buttons/ButtonNative";
import FlexColumn from "../flex/FlexColumn";
import IconBase from "../icons/IconsBase";

type Props = {
  id?: any;
  labelText?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: any;
  padding?: string;
  style?: any;
  disabled?: boolean;
  elementRef?: any;
  inputType: string;
  marginTop?: string;
  marginLeft?: string;
  marginBottom?: string;
  marginRight?: string;
  fileDropMinHeight?: string;
  inputLogoSize?: string;
  value?: any;
  tooltipLabel?: string;
};

const InputLabel = ({
  id,
  labelText,
  placeholder,
  defaultValue,
  onChange,
  padding,
  style,
  disabled = false,
  elementRef,
  inputType,
  marginTop,
  value,
  marginLeft,
  marginBottom,
  marginRight,
  fileDropMinHeight,
  inputLogoSize,
  tooltipLabel,
}: Props) => {
  // for text type inputs
  const toast = useToast();

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
        <Box style={{ display: "flex", flexDirection: "row" }}>
          {labelText && (
            <Heading
              as="h6"
              size="sm"
              marginRight={gStyle.margin.xxs}
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
          {tooltipLabel && (
            <IconBase
              slug="icon-info"
              onClick={() => {
                toast({
                  title: tooltipLabel,
                  status: "info",
                  duration: 7000,
                  position: "top-right",
                  isClosable: true,
                });
              }}
            />
          )}
        </Box>
        <StyledCard className="w-100">
          {LayoutInputs({
            id,
            // elementRef,
            placeholder,
            defaultValue,
            value,
            onChange,
            disabled,
            style,
          })}
        </StyledCard>
      </FlexColumn>
    );
  };

  // for uploading attachments
  const InputLabelDropFile = () => {
    const [dragActive, setDragActive] = useState<any>(false);
    const inputRef = useRef<any>(null);

    const onButtonClick = () => {
      inputRef.current.click();
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
          minHeight={fileDropMinHeight ? fileDropMinHeight : "200px"}
          width="100%"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          borderRadius={gStyle.input.borderRadius.default}
          padding="1rem"
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
                size={inputLogoSize ? inputLogoSize : "2xl"}
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
        </Box>
      </FlexColumn>
    );
  };

  const InputLabelFile = () => {
    const inputRef = useRef<any>(null);

    const onButtonClick = () => {
      inputRef.current.click();
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
        <input
          ref={inputRef}
          type="file"
          id="input-file-upload"
          // id="upload-file"
          multiple={false}
          onChange={onChange}
          hidden
        />
        <ButtonNative
          onClick={onButtonClick}
          text="Upload File"
          iconRight={{ slug: "icon-upload" }}
          variant="state_default_hover"
          height="2.5rem"
          width="100%"
        />
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
            id,
            // elementRef,
            value,
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
  } else if (inputType == "dropFile") {
    return <InputLabelDropFile />;
  } else if (inputType == "textArea") {
    return <InputLabelTextArea />;
  } else {
    return inputLabelText();
  }
};

export default InputLabel;
