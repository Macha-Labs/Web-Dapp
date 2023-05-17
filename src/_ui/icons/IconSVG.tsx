import { IKImage } from "imagekitio-react";
import GlobalIcons from "../../styles/GlobalIcons";

type Props = {
  path: string;
  className?: string;
};

export function IconSVG({ path, className }: Props) {
  return (
    <>
      <IKImage path={GlobalIcons[path]} className={className} />
    </>
  );
}
