import styles from "./styles.module.css";
import cx from "classnames";
import { CSSProperties } from "react";

type GapTypes = "s" | "m" | "l" | "xl" | "xxl" | "xxxl";
interface Props {
  children: React.ReactNode | React.ReactNode[];
  className: string;
  style: CSSProperties;
  full: boolean;
  center: boolean;
  isFullHeight: boolean;
  gap: GapTypes | number;
  justify:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  wrap: boolean;
  direction: "row" | "row-reverse" | "column" | "column-reverse";
}

const Flex = (props: Partial<Props>) => {
  return (
    <div
      className={cx(styles.container, props.className)}
      style={{
        height: props.isFullHeight ? "100%" : undefined,
        flex: props.full ? 1 : undefined,
        gap: typeof props.gap === "string" ? gaps[props.gap] : props.gap,
        justifyContent: props.justify || (props.center ? "center" : undefined),
        alignItems: props.align || (props.center ? "center" : undefined),
        flexDirection: props.direction,
        flexWrap: props.wrap ? "wrap" : undefined,
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
};

export default Flex;

const gaps: Record<GapTypes, number> = {
  s: 4,
  m: 8,
  l: 12,
  xl: 16,
  xxl: 24,
  xxxl: 32,
};
