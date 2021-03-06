/// <reference types="react" />
import * as React from "react";
export interface ProgressiveImageProps {
    preview: string;
    src: string;
    render: (src: string, style: {}) => JSX.Element;
    transitionTime?: number;
    timingFunction?: string;
    initialBlur?: number;
}
export interface ProgressiveImageState {
    src: string;
    isCached?: boolean;
    blur: number;
}
export declare class ProgressiveImage extends React.Component<ProgressiveImageProps, ProgressiveImageState> {
    static defaultProps: {
        transitionTime: number;
        timingFunction: string;
        initialBlur: number;
    };
    componentWillMount(): void;
    render(): JSX.Element;
    private fetch(src);
    private fetchSync(src);
    private getStyle();
}
