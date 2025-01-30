import React, { useEffect, useState, useRef, forwardRef } from "react";
import { Stack, Box } from "@mui/material";
/*
     TODOS


    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
    okay das der Nutzer auf der Plattform nicht einfach so ansteuern kann
    ist nun gelöst durch, die oncProp und der getONCByElem. 

    Nun könnte man jedoch per Konsole einen bestimmtes Abschnitt
    selber anlenken, nur der content wird halt nur durch eine
    bestimmte Authentifikation gelanden und gerendert, das reicht
    also fürs erste
    ->  NOT_USER_REACHABLE:: prop_onc & getONCByElem
    



    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    Sticky component, welche eine sehr hohe Kachel einnimmt, es soll der Anschein
    gemacht werden dass durch das vertikale Scrollen ein horizontales Scrollen
    tatsächlich gemacht wird. 
    Dann brauchen wir eine Berechnung des Mittelpunkt des Viewports, sodass wir einen 
    Fortschritt haben, wichtig dabei ist nur das wir im Hinterkopf behalten,
    - - - - - - - - - -
    -                 -
    -                 -
    -        x        -   } Start bekommt height 100vh, sodass wenn der viewport genau
    -                 -     darauf liegt, haben wir 0% Fortschritt
    -                 -
    - - - - - - - - - -
    -                 -      
    -                 -      
    -                 -      
    -                 -      
    -                 -      
    -                 -      
    -        x        -     << Mittelpunkt - 65% oder etwa nicht ??? vielleicht 
    -                 -
    -                 -
    - - - - - - - - - -
    -                 -
    -                 -
    -        x        -  } Ende bekommt height 100vh, wenn viewport draufliegt
    -                 -    haben wir 100%, 
    -                 -
    - - - - - - - - - -

    ->  NEW_COMPONENT:: horizontal Percentenage
    
    

    

    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
    Elemente mit einer fadeIn Animation versehen, sodass diese dann aufploppen
    ->  NEW_COMPONENT:: FADE_WRAPPER 








    -> URLAUB VERBUCHEN !!!!!!!!!!!
    -> CHATBOT -> erstellt pdfs/ eine komplette Seite die man
       dann runterladen kann.

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
const getONCByElem = (rowMajor: any[], cols: number, x: number, y: number) => {
    let onc: string = "1111"
    if (rowMajor[y * cols + x].props.children.props.onc) {
        onc = rowMajor[y * cols + x].props.children.props.onc;
    }
    return onc;
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
interface ISwipeXYControl {
    children: React.ReactNode;
    xy?: string;
    changeXY: (str: string) => void
}
const SwipeXYControl: React.FunctionComponent<ISwipeXYControl> = ({ children, xy = "0/0", changeXY }) => {

    // cords
    const [x, setX] = useState(convXY(xy)[0]);
    const [y, setY] = useState(convXY(xy)[1]);

    // refs 
    const sockelRef = useRef(null);
    const refs = [];

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
    const computeScroll = () => {
        const scrollX = window.innerWidth * x;
        let scrollY = 0;
        if (y > 0) {
            for (let r = 0; r < y; r++) {
                key = `posi-${mid}x-${r}y-key`;
                scrollY += refs[key].current.clientHeight;
            }
        }
        return [scrollX, scrollY];
    }
    useEffect(() => {
        const sockel = sockelRef.current;
        const handleScrollX = () => {
            const elemStartX = computeScroll()[0];
            const elemEndX = computeScroll()[0] + window.innerWidth;
            const viewStart = sockel.scrollLeft;
            const viewEnd = sockel.scrollLeft + window.innerWidth;
            if ((viewEnd - elemEndX) >= 90) {
                let onc = getONCByElem(rowMajor, cols, x, y);
                if (rowMajor[y * cols + (x + 1)] && onc[1] == "1") {
                    setX((prevX) => {
                        changeXY((prevX + 1) + "/" + y);
                        return prevX + 1;
                    });
                } else {
                    scroll();
                }
            } else if ((elemStartX - viewStart) >= 90) {
                let onc = getONCByElem(rowMajor, cols, x, y);
                if (rowMajor[y * cols + (x - 1)] && onc[3] == "1") {
                    setX((prevX) => {
                        changeXY((prevX - 1) + "/" + y);
                        return prevX - 1;
                    });
                } else {
                    scroll();
                }
            }
        }
        const handleScrollY = () => {
            const key = `posi-${x}x-${y}y-key`;
            const elemStartY = computeScroll()[1];
            const elemEndY = refs[key].current.clientHeight + computeScroll()[1];
            const viewStart = sockel.scrollTop
            const viewEnd = Math.floor(sockel.scrollTop + window.innerHeight);
            if ((viewEnd - elemEndY) >= 90) {
                let onc = getONCByElem(rowMajor, cols, x, y);
                if (rowMajor[(y + 1) * cols + x] && onc[2] == "1") {
                    setY((prevY) => {
                        changeXY(x + "/" + (prevY + 1));
                        return prevY + 1;

                    });
                } else {
                    scroll();
                }
            } else if ((elemStartY - viewStart) >= 90) {
                let onc = getONCByElem(rowMajor, cols, x, y);
                if (rowMajor[(y - 1) * cols + x] && onc[0] == "1") {
                    setY((prevY) => {
                        changeXY(x + "/" + (prevY - 1));
                        return prevY - 1;
                    });
                } else {
                    scroll();
                }
            }
        }
        let lastScrollX = 0;
        let lastScrollY = 0;
        const handleScroll = () => {
            if (!sockel) return;
            const currentScrollX = sockel.scrollLeft;
            const currentScrollY = sockel.scrollTop;
            const deltaX = Math.abs(currentScrollX - lastScrollX);
            const deltaY = Math.abs(currentScrollY - lastScrollY);
            if (deltaX !== 0 && deltaY !== 0 && lastScrollX !== 0 && lastScrollY !== 0) {
                sockel.scrollTo(...computeScroll());
                sockel.style.overflowX = "hidden";
                sockel.style.overflowY = "hidden";
                setTimeout(() => {
                    sockel.style.overflowX = "scroll";
                    sockel.style.overflowY = "scroll";
                }, 100);
                return;
            } else if (Math.abs(deltaX) > Math.abs(deltaY)) {
                handleScrollX();
            } else if (Math.abs(deltaY) > Math.abs(deltaX)) {
                handleScrollY();
            }
            lastScrollX = currentScrollX;
            lastScrollY = currentScrollY;
        }
        const handleEndScroll = () => {
            let onc = getONC(rowMajor, cols, x + "/" + y);
            const elemStartX = computeScroll()[0];
            const elemStartY = computeScroll()[1];
            if (Math.abs(elemStartY - sockel.scrollTop) < 5 && Math.abs(elemStartX - sockel.scrollLeft) > -5 && Math.abs(elemStartX - sockel.scrollLeft) < 5 && Math.abs(elemStartY - sockel.scrollTop) > -5) {
                if (rowMajor[y * cols + x].props.children.props.onc) {
                    onc = rowMajor[y * cols + x].props.children.props.onc;
                }
                if (onc[0] == "1" || onc[2] == "1") {
                    sockel.style.overflowY = "scroll";
                }
                if (onc[1] == "1" || onc[3] == "1") {
                    sockel.style.overflowX = "scroll";
                }
                return sockel?.addEventListener("wheel", handleScroll);
            } else {
                scroll();
            }
        }
        const scroll = () => {
            if (!sockel) return;
            console.log("springe...");
            console.log("scroll: " + computeScroll()[0] + "x" + computeScroll()[1] + "y");
            sockel.style.overflowX = "hidden";
            sockel.style.overflowY = "hidden";
            sockel.scrollTo(...computeScroll());
        }
        scroll();
        sockel?.addEventListener("scrollend", handleEndScroll);
        return () => {
            sockel?.removeEventListener("wheel", handleScroll);
            sockel?.removeEventListener("scrollend", handleEndScroll);
        }
    }, [x, y]);

    useEffect(() => {
        setX(convXY(xy)[0]);
        setY(convXY(xy)[1]);
    }, [xy])

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
        <Stack className="scroll" ref={sockelRef} sx={{
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
                        accu.push(<Box key={'void-' + elem.key} sx={{
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