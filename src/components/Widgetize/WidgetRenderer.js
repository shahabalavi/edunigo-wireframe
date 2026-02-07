import React from "react";
import { WIDGET_COMPONENTS } from "./widgets";

const WidgetRenderer = ({ widgetType, config = {}, isRtl = false }) => {
  const Component = WIDGET_COMPONENTS[widgetType];
  if (!Component) return null;
  return <Component config={config} isRtl={isRtl} />;
};

export default WidgetRenderer;
