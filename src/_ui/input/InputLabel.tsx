import layoutInputs from "@/layouts/options/LayoutInputs";
import { StyledCard, StyledCol, StyledRow } from "@/styles/StyledComponents";
import { Heading } from "@chakra-ui/react";
import FlexColumn from "../flex/FlexColumn";
import ButtonNative from "../buttons/ButtonNative";
import IconImage from "../icons/IconImage";

type Props = {
  labelText?: string;
  placeholder?: string;
  defaultValue?: string;
  onChange?: any;
  padding?: string;
  disabled?: boolean;
  elementRef?: any;
  inputType: string;
};

const InputLabel = ({
  labelText,
  placeholder,
  defaultValue,
  onChange = (e?: any) => {},
  padding,
  disabled = false,
  elementRef,
  inputType
}: Props) => {

  // for text type inputs
  const inputLabelText = () => {
    return (
      <FlexColumn width="100%" vrAlign="flex-start" padding={padding}>
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
          {layoutInputs({
            elementRef,
            placeholder,
            defaultValue,
            onChange,
            disabled
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
    return (
      <StyledCol className="text-start">
          <ButtonNative
            variant="transparent"
            size="md"
            isLoading={false}
            icon={<IconImage slug="IconDarkFiles.png" />}
          >
            <label htmlFor="upload-file" className="w-100">
              <StyledRow className="vr-center hr-between w-100">
                Upload File{" "}
              </StyledRow>
            </label>
          </ButtonNative>
          <input
            id="upload-file"
            onChange={(e) => {
              console.log("This is the attachment button");
            }}
            type="file"
            hidden
          />
        </StyledCol>
    )
  }

  if (inputType == 'file') {
    return <InputLabelFile />;
  } else {
    return inputLabelText();
  }
};

export default InputLabel;
