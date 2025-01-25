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
const getONC = (rowMajor: any[], cols: number, xy: string) => {
    let resStr = "";
    let x = convXY(xy)[0];
    let y = convXY(xy)[1];
    // up -> right -> down -> left
    resStr += rowMajor[(y - 1) * cols + x] ? "1" : "0";
    resStr += rowMajor[y * cols + x + 1] ? "1" : "0";
    resStr += rowMajor[(y + 1) * cols + x] ? "1" : "0";
    resStr += rowMajor[y * cols + x - 1] ? "1" : "0";
    return resStr;
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
    const sockel = useRef(null);
    const refs = [];
    let x = convXY(startXY)[0];
    let y = convXY(startXY)[1];
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
    let onc: string;
    let scrollX = 0;
    let scrollY = 0;
    let viewStart: number = 0;
    let viewEnd: number = 0;
    let elemStartX: number = 0;
    let elemEndX: number = 0;
    let elemStartY: number = 0;
    let elemEndY: number = 0;
    let height: number = 0;
    let lastScrollX = 0;
    let lastScrollY = 0;
    let jumping: boolean = false;
    useEffect(() => {
        jump();
    }, [rowMajor]);
    const jump = () => {
        if (rowMajor.length) {
            scrollY = 0;
            scrollX = window.innerWidth * x;
            if (y > 0) {
                for (let r = 0; r < y; r++) {
                    key = `posi-${mid}x-${r}y-key`;
                    scrollY += refs[key].current.clientHeight;
                }
            } else {
                scrollY = 0;
            }
            key = `posi-${x}x-${y}y-key`;
            height = refs[key].current.clientHeight;
            elemStartY = scrollY;
            elemEndY = scrollY + height;
            elemStartX = scrollX;
            elemEndX = scrollX + window.innerWidth;
            onc = getONC(rowMajor, cols, x + "/" + y);
            /*
            TODOS

            -> diese Komponente muss irgendwie mit der nav Komponente verknüpft werden
            -> sidemenu mit hamburger öffnen
                -> der Bereich welcher übrig bleibt der wird für das clickAway verwendet
            -> kachel wird aktiv wenn wir es fokussieren!
            -> jetzt auch noch ein horizontales lagging fuck

            SIDEQUEST
            -> übrigens whatsappbot bauen für ali:
            -> spotify bots für ischu bauen

            Content:
            - die einzelnen Einträge sind Elemente mit eigener Höhe, aber manchmal
            auch Kacheln
            - Kacheln in Mobiler Ansicht gewinnen schließlich an height, bleiben
            aber dieselben
            - überdies müssen sollten die Kacheln immer etwas größer werden
            - jedes Element wird benachrichtig wenn dieses aktiv ist
             */
            sockel.current.style.overflowX = "hidden";
            sockel.current.style.overflowY = "hidden";
            sockel.current.scrollTo(scrollX, scrollY);
            jumping = true;
        }
    }
    useEffect(() => {
        if (sockel.current) {
            sockel.current.addEventListener("wheel", handleScrolling);
            sockel.current.addEventListener("scrollend", handleEndScroll);
            return () => {
                sockel.current.addEventListener("wheel", handleScrolling);
                sockel.current.addEventListener("scrollend", handleEndScroll);
            };
        }
    }, []);
    const handleScrollingX = (e: any) => {
        viewStart = sockel.current.scrollLeft;
        viewEnd = Math.floor(sockel.current.scrollLeft + window.innerWidth);
        if ((viewEnd - elemEndX) >= 90) {
            if (rowMajor[y * cols + (x + 1)]) {
                x++;
                jump();
            } else {
                jump();
            }
        } else if ((elemStartX - viewStart) >= 90) {
            if (rowMajor[y * cols + (x - 1)]) {
                x--;
                jump();
            } else {
                jump();
            }
        }
    }
    const handleScrollingY = (e: any) => {
        viewStart = sockel.current.scrollTop
        viewEnd = Math.floor(sockel.current.scrollTop + window.innerHeight);
        if ((viewEnd - elemEndY) >= 90) {
            if (rowMajor[(y + 1) * cols + x]) {
                y++;
                jump();
            } else {
                jump();
            }
        } else if ((elemStartY - viewStart) >= 90) {
            if (rowMajor[(y - 1) * cols + x]) {
                y--;
                jump();
            } else {
                jump();
            }
        }
    }
    const handleScrolling = (e: any) => {
        if (jumping) {
            return 0;
        }
        const currentScrollX = sockel.current.scrollLeft;
        const currentScrollY = sockel.current.scrollTop;
        const deltaX = Math.abs(currentScrollX - lastScrollX);
        const deltaY = Math.abs(currentScrollY - lastScrollY);
        if (deltaX !== 0 && deltaY !== 0 && lastScrollX !== 0 && lastScrollY !== 0) {
            /* BLOCK DIAGONAL SCROLLING  */
            sockel.current.scrollTo(scrollX, scrollY);
            sockel.current.style.overflowX = "hidden";
            sockel.current.style.overflowY = "hidden";
            setTimeout(() => {
                sockel.current.style.overflowX = "scroll";
                sockel.current.style.overflowY = "scroll";
            }, 100);
            return;
        } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
            /* HORIZONTAL */
            handleScrollingX(e);
        } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
            /* VERTICAL */
            handleScrollingY(e);
        }
        lastScrollX = currentScrollX;
        lastScrollY = currentScrollY;
    }
    let bounceBack: boolean = false;
    const handleEndScroll = (e: any) => {
        if (jumping && Math.abs(elemStartY - e.srcElement.scrollTop) < 5 && Math.abs(elemStartX - e.srcElement.scrollLeft) > -5 && Math.abs(elemStartX - e.srcElement.scrollLeft) < 5 && Math.abs(elemStartY - e.srcElement.scrollTop) > -5) {
            jumping = false;
            if (onc[0] == 1 || onc[2] == 1) {
                sockel.current.style.overflowY = "scroll";
            }
            if (onc[1] == 1 || onc[3] == 1) {
                sockel.current.style.overflowX = "scroll";
            }
        } else if (!jumping && !bounceBack) {
            sockel.current.style.overflowX = "hidden";
            sockel.current.style.overflowY = "hidden";
            sockel.current.scrollTo(scrollX, scrollY);
            setTimeout(() => {
                if (onc[0] == 1 || onc[2] == 1) {
                    sockel.current.style.overflowY = "scroll";
                }
                if (onc[1] == 1 || onc[3] == 1) {
                    sockel.current.style.overflowX = "scroll";
                }

            }, 100);
        }
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
    let tmpVW: number = 0;
    let c = 0;
    let start = 0;
    let tmpArr = [];
    return (
        <Stack className="scroll" ref={sockel} sx={{
            position: "relative",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            overflowX: "scroll",
            overflowY: "scroll",
            scrollBehavior: "smooth"
        }}>
            {(rowMajor.reduce((accu, elem) => {
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
            })}
        </Stack >
    )



}

export default SwipeXYControl;