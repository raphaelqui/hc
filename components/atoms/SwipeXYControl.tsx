import React, { useEffect, useState, useRef, forwardRef } from "react";

import { Stack, Box } from "@mui/material";


interface ISwipeXYControl {
    children: React.ReactNode;
    startXY?: string;
}

const convXY = (xy: string) => {
    return (xy.split("/")).map((num) => {
        return parseFloat(num);
    });
}


const printMatrix = (rowMajor: any, rows: number, cols: number) => {
    let tmpStr = "";
    let tmpIndex = 0;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            tmpIndex = r * cols + c;
            if (c == cols - 1) {
                tmpStr += isNaN(rowMajor[tmpIndex]) ? "x" : "0";
            } else {
                tmpStr += isNaN(rowMajor[tmpIndex]) ? "x " : "0 ";
            }
        }
        tmpStr += "\n";
    }
    console.log(tmpStr);
}
const SwipeXYControl: React.FunctionComponent<ISwipeXYControl> = ({ children, startXY = "0/0" }) => {

    const refs = [];
    const [xy, setXY] = useState(startXY);
    let key: string = "";
    let rowMajor: any[] = [];
    let mid = 0;
    let rows = children?.length;
    let cols = 0;
    let colsLeft = 0;
    let colsRight = 0;
    let tmpColsLeft = 0;
    let tmpColsRight = 0;
    let tmpChildren = [];
    let startX = false;
    let isStartXSet = false;
    let tmpObj: any = {};
    let cords: number[];
    let scrollX = 0;
    let scrollY = 0;

    let viewStart: number = 0;
    let elemStart: number = 0;
    let elemEnd: number = 0;
    let height: number = 0;
    // - - - - - - - - - - - - - - - - -
    let viewEnd: number = 0;

    /*OPEN_

        -> schauen ob links, rechts, oben und unten offen ist?
           das muss im muss jetzt schon geklärt werden!

           was soll ich den machen wenn wir links keine weiteren Kacheln mehr
           haben dann sollte ich irgendwie das Linksswipen stoppen

        -> asl nächstes können wir noch ein neues feature schreiben welches
           dafür sorgt wenn wir eine Kachel zu viel eingenommen haben circa 90px,
           das ist absolut und es wird gescrollt egal wie groß eine Kachel ist.
        -> garantieren dass der XY-String die verlangte Konvention nutzt!
        -> ich kann nirgendwo das body element finden deswegen brauche ich 
           das layout component zu manipulieren
    */

    useEffect(() => {
        if (rowMajor.length) {
            scrollY = 0;
            cords = convXY(xy);
            scrollX = window.innerWidth * cords[0];
            if (cords[1] > 0) {
                for (let y = 0; y < cords[1]; y++) {
                    key = `posi-${mid}x-${y}y-key`;
                    scrollY += refs[key].current.clientHeight;
                }
            } else {
                scrollY = 0;
            }
            key = `posi-${cords[0]}x-${cords[1]}y-key`;
            height = refs[key].current.clientHeight;
            elemStart = scrollY;
            elemEnd = scrollY + height;

            /*
                x
              x O -
                x
            */




            window.scrollTo(scrollX, scrollY);
        }
    }, [xy, rowMajor]);

    useEffect(() => {
        document.addEventListener("wheel", handleScrolling);
        document.addEventListener("scrollend", handleEndScroll);
    }, []);




    let px: number = 0;

    const handleScrolling = (e: any) => {
        // console.log("x: " + convXY(xy)[0]);
        // console.log("y: " + convXY(xy)[1]);
        // key = `posi-${convXY(xy)[0]}x-${convXY(xy)[1]}y-key`;
        // convXY -> [2, 1].join("/") später

        // horizontal oder vertical ?

        viewStart = Math.floor(window.scrollY);
        viewEnd = Math.floor(window.scrollY + window.innerHeight);

        if ((viewEnd - elemEnd) >= 90) {

            // check matrix end
            if (rowMajor[(convXY(xy)[1] + 1) * cols + convXY(xy)[0]]) {
                console.log("further");
                // setXY - y++:
                setXY([convXY(xy)[0], (convXY(xy)[1] + 1)].join("/"));
                // jump
            }


        } else if ((elemStart - viewStart) >= 90) {

            // check matrix end
            console.log([convXY(xy)[0], (convXY(xy)[1] - 1)]);

            if (rowMajor[(convXY(xy)[1] - 1) * cols + convXY(xy)[0]]) {
                console.log("back");
                // setXY - y--:
                setXY([convXY(xy)[0], (convXY(xy)[1] - 1)].join("/"));
                // jump
            }

        }
    }

    const handleEndScroll = (e: any) => {
    }

    for (let i = 0; i < rows; i++) {
        if (children[i].type.name == "SwipeXYHorizontal" && children[i].props.children) {
            if (children[i].props.children.length) {
                tmpChildren = children[i].props.children;
            } else {
                tmpChildren = [children[i].props.children];
            }
            for (let c = 0; c < tmpChildren.length; c++) {
                if (tmpChildren.length == 1) {
                    startX = true;
                } else if (c == 0) {
                    isStartXSet = false;
                    for (let s = 0; s < tmpChildren.length; s++) {
                        if (tmpChildren[s].props.startX) {
                            isStartXSet = true;
                            break;
                        }
                    }
                    if (!isStartXSet) {
                        startX = true;
                    } else {
                        startX = tmpChildren[c].props.startX;
                    }
                } else {
                    startX = tmpChildren[c].props.startX;
                }
                if (startX) {
                    tmpColsRight = tmpChildren.length - c - 1;
                    tmpColsLeft = c;
                    if (colsLeft < tmpColsLeft) {
                        colsLeft = tmpColsLeft;
                    }
                    if (colsRight < tmpColsRight) {
                        colsRight = tmpColsRight;
                    }
                    break;
                }
            }
        }
    }
    mid = colsLeft;
    cols = colsLeft + colsRight + 1;
    let horizontalChildren;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            if (c == mid) {
                if (children[r].type.name == "SwipeXYHorizontal" && children[r].props.children) {
                    if (children[r].props.children.length) {
                        horizontalChildren = children[r].props.children;
                    } else {
                        horizontalChildren = [children[r].props.children];
                    }
                    for (let i = 0; i < horizontalChildren.length; i++) {
                        startX = horizontalChildren[i].props.startX;
                        if (i == 0) {
                            isStartXSet = false;
                            for (let s = 0; s < horizontalChildren.length; s++) {
                                if (horizontalChildren[s].props.startX) {
                                    isStartXSet = true;
                                    break;
                                }
                            }
                            if (!isStartXSet) {
                                startX = true;
                            }
                        }
                        if (startX) {
                            c = c - i;
                            for (let s = 0; s < horizontalChildren.length; s++, c++) {
                                key = `posi-${c}x-${r}y-key`;
                                refs[key] = useRef(null);
                                tmpObj = (<div key={key} ref={refs[key]} style={{
                                    height: "100%",
                                    width: "100%",
                                    background: "rgb(0,0,0)",
                                }}>
                                    {horizontalChildren[s]}
                                </div>);
                                rowMajor[r * cols + c] = tmpObj;
                            }
                            c--;
                            break;
                        }
                    }
                } else {
                    key = `posi-${c}x-${r}y-key`;
                    refs[key] = useRef(null);
                    tmpObj = (<div key={key} ref={refs[key]}>
                        {children[r]}
                    </div>);
                    rowMajor[r * cols + c] = tmpObj;
                }

            } else {
                rowMajor[r * cols + c] = 0;
            }
        }
    }
    printMatrix(rowMajor, rows, cols);
    /*
        Content:
            - die einzelnen Einträge sind Elemente mit eigener Höhe, aber manchmal
            auch Kacheln
            - Kacheln in Mobiler Ansicht gewinnen schließlich an height, bleiben
            aber dieselben
            - überdies müssen sollten die Kacheln immer etwas größer werden
            - jedes Element wird benachrichtig wenn dieses aktiv ist
    */

    let tmpVW: number = 0;
    let c = 0;
    let start = 0;
    let tmpArr = [];
    return (rowMajor.reduce((accu, elem) => {
        if (elem == 0) {
            tmpVW += 1;
        } else {
            if (tmpVW > 0) {
                accu.push(<Box sx={{
                    width: tmpVW + "00vw",
                    flexShrink: 0,
                }} ></Box>)
            }
            accu.push(elem);
            tmpVW = 0;
        }
        if (c == cols - 1) {
            tmpVW = 0;
            c = 0;
            accu.push(0);
        } else {
            c++;
        }
        return accu;
    }, [])).reduce((accu: any, elem: any) => {
        if (elem == 0) {
            tmpArr = accu.splice(start);
            accu.push(tmpArr);
            start++;
        } else {
            accu.push(elem);
        }
        return accu;
    }, []).map((row: any, rowIndex: number) => {
        return (
            <Stack key={`row-${rowIndex}`} direction={"row"} sx={{
                position: "relative",
                height: "100%",
            }}>
                {row}
            </Stack >
        )
    });
}

export default SwipeXYControl;