import React, { useEffect, useRef } from "react";
import { Stack } from "@mui/material";

interface ISwipeYControl {
    children: any;
}
const SwipeYControl: React.FunctionComponent<ISwipeYControl> = ({ children }) => {
    if (!children?.length) {
        children = [children];
    }

    const elem = useRef<HTMLDivElement>(null);
    useEffect(() => {
        document.addEventListener("wheel", handleScrolling);
        document.addEventListener("scrollend", handleEndScroll);
    }, []);
    let base: number = 0;
    let sequences: any = [];

    let index: number = 0;
    let lastSequence = children?.reduce((accu: any, child: any) => {
        switch (child?.type.name) {
            case "SwipeYFrame":
                if (accu[index - 1]?.type.name == "SwipeYFrame" || accu.length == 0) {
                    accu.push(child);
                } else {
                    sequences.push(accu);
                    accu = [];
                    index = 0;
                    accu.push(child);
                }
                index++;
                break;
            default:
                if (accu[index - 1]?.type.name == "SwipeYFrame") {
                    sequences.push(accu);
                    accu = [];
                    index = 0;
                    accu.push(child);
                } else {
                    accu.push(child);
                }
                index++;
                break;
        }
        return accu;
    }, []);
    sequences.push(lastSequence);

    let level = 0;
    let startY = 0;
    let nowY = 0;
    let seqIndex = 0;
    let sequenceSYFLevels = sequences[seqIndex].length;
    let diff;
    let height: number = 0;
    let childIndex: number;
    let sequenceLength: number;

    const changeSequence = () => {
        level = 0;
        if (sequences[seqIndex][0].type.name == "SwipeYFrame") {
            sequenceSYFLevels = sequences[seqIndex].length;
        } else {
            sequenceSYFLevels = 0;
        }
    }
    useEffect(() => {
        if (elem.current?.children) {
            height = elem.current?.children[0].clientHeight;
        }
    }, [elem]);
    const changeContextHeight = () => {
        childIndex = 0;
        for (let i = 0; i < seqIndex; i++) {
            sequenceLength = sequences[i].length;
            if (sequenceLength == 1) {
                childIndex++;
            } else {
                childIndex = childIndex + (sequenceLength);
            }
        }
        height = elem.current?.children[childIndex].clientHeight;
    }
    const scroll = () => {
        document.body.classList.add("no-scroll");
        window.scrollTo(0, (height * level) + base);
    }
    const jump = () => {
        if (nowY - startY > 0) {
            if (level < sequenceSYFLevels - 1) {
                level = level + 1;
            } else if (level == sequenceSYFLevels - 1 && seqIndex < sequences.length - 1) {
                level = level + 1;
                scroll();
                base = (height * level) + base;
                seqIndex++;
                changeSequence();
                changeContextHeight();
                return;
            }
        } else {
            if (level > 0 && sequenceSYFLevels > 0) {
                level = level - 1;
            } else if (level == 0 && seqIndex > 0) {
                seqIndex--;
                changeSequence();
                changeContextHeight();
                base = base - height;
                document.body.classList.add("no-scroll");
                window.scrollTo(0, base + height - window.innerHeight);
                startY = 100;
                nowY = 300;
                return;
            }
        }
        scroll();

    }
    const SYFSequenceScrolling = (e: any) => {
        if (Math.abs(nowY - startY) > 90) {
            // abort  
            return 0;
        }
        if (startY == 0) {
            startY = e.pageY;
            nowY = startY;
        } else {
            nowY = e.pageY;
        }
        if (Math.abs(nowY - startY) > 90) {

            jump();
        }
    }
    const SYFSequenceEndScroll = (e: any) => {
        diff = Math.abs((height * level + base) - window.scrollY);
        if (level == 0 && seqIndex == 0) {
            scroll();
        }
        if (diff < 5 && diff > -5) {
            document.body.classList.remove("no-scroll");
            startY = 0;
            nowY = 0;
        } else if (Math.abs(nowY - startY) < 90) {
            scroll();
        }
    }
    const handleScrolling = (e: any) => {
        if (sequenceSYFLevels == level && level == 0 && startY == 0) {
            if (base - Math.floor(window.scrollY) > 90) {
                seqIndex--;
                changeSequence();
                changeContextHeight();
                level = sequenceSYFLevels - 1;
                base = base - (height * (level + 1));
                scroll();
                startY = 100;
                nowY = 300;
            } else if (Math.floor(window.scrollY) - (base + height - window.innerHeight) > 90) {
                base = base + height;
                seqIndex++;
                changeSequence();
                changeContextHeight();
                level = 0;
                scroll();
                startY = 100;
                nowY = 300;
            }
        } else {
            SYFSequenceScrolling(e);
        }
    }
    const handleEndScroll = (e: any) => {
        if (sequenceSYFLevels == level && level == 0) {
            if (window.scrollY < base) {
                scroll();
            } else if (window.scrollY > (base + height - window.innerHeight)) {
                document.body.classList.add("no-scroll");
                window.scrollTo(0, base + height - window.innerHeight);
            }
            diff = Math.abs(base - window.scrollY);
            if (diff < 5 && diff > -5) {
                document.body.classList.remove("no-scroll");
                startY = 0;
                nowY = 0;
            }
            diff = base + height - window.innerHeight - window.scrollY;
            if (diff < 5 && diff > -5) {
                document.body.classList.remove("no-scroll");
                startY = 0;
                nowY = 0;
            }
        } else {
            SYFSequenceEndScroll(e);
        }
    }


    return (
        <div ref={elem}>
            {
                ...sequences.reduce((accu: any, seq: any) => {
                    accu.push(seq.map((elem: React.ReactNode) => {
                        return (
                            <Stack sx={{
                                minHeight: "100vh",
                                opacity: "0.8",
                                width: "100%",
                                background: elem?.props.bg
                            }}>{elem?.props?.children}
                            </Stack>
                        );
                    }));
                    return accu;
                }, [])
            }
        </div>
    );
};

export default SwipeYControl;
