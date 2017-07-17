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

const isCached = (image: any) => image.complete || image.width + image.height > 0;

export class ProgressiveImage extends React.Component<ProgressiveImageProps, ProgressiveImageState> {

    static defaultProps = {
        transitionTime: 500,
        timingFunction: "ease",
        initialBlur: 10
    };

    componentWillMount() {
        const {src, preview} = this.props;
        const initialBlur = this.props.initialBlur as number;
        this.setState({ src: "", blur: initialBlur });
        this.fetch(preview)
            .then((result: any) => this.setState({ src: result.src, blur: initialBlur }))
            .then(() => this.fetch(src))
            .then((result: any) => this.setState({ src: result.src, isCached: result.isCached, blur: 0 }));
    }

    render() {
        const {src} = this.state;
        const {render} = this.props;
        return render(src, this.getStyle());
    }

    private fetch(src: string): Promise<any> {
        return new Promise(resolve => {
            const image = new Image();
            image.src = src;

            if (isCached(image)) {
                resolve({ src, isCached: true });
            } else {
                image.addEventListener("load", () => resolve({ src }), false);
            }
        });
    }

    private getStyle() {
        const {transitionTime, timingFunction} = this.props;
        const {blur, isCached} = this.state;

        if(isCached) {
            return {
                filter: `blur(${blur}px)`,
                transition: `filter 0ms`
            };
        } else {
            return {
                filter: `blur(${blur}px)`,
                transition: `filter ${transitionTime}ms ${timingFunction}`
            };
        }
    }
}
