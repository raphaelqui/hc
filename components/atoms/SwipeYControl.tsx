import React, { useEffect, useRef, useState } from "react";
import { listItemAvatarClasses, Stack } from "@mui/material";
/*
    TODOS:
        _PROP_CHILDREN 
            // <SwipeYFrame/>  diese Komponente wird abgezählt und wird dann als 
            // swipeframe gezählt, wenn es nach diese Komponente kein anderes 
            // children gibt wird maximal bis hierhin kontrolliert gescrollt.

            // <SwipeYHorizontal/>  diese Komponente hat einen Progress welches beim 
            // y scrollen, visuell nach links swippt, aber tatsächlich weiter 
            // nach unten scrollt, da der Hintergrund "fixed", wird man optisch getäuscht

            // <SwipeYStack/>  diese Komponente beschreibt content welche ein Prozess
            // durchlebt 0% zu 100%, wenn der user prozententual so viel gescrollt hat
            // soll relativ prozentual dieses Element oder Content weiter nach links
            // floaten oder größer werden

            // <SwipeYContent/>  diese Komponente beschreibt einen Abschnitt der 
            normal gescrollt wird

        _PROP_STARTCHILD
            // Jedes children hat eine baseaddress unter dieser kann der user direkt 
            // dieses auffinden.

        ich werde zunächst erst einmal die children-Dynamik programmieren, dann
        wird es weiter gehen mit dem horizontalem Scrollen vielleicht.
        
        das mit den children ist jetzt ready, als nächstes muss ich damit anfangen
        und vergleichen ob syf_children weniger oder gleich sind wie children
        
        wenn das der fall ist dann kann ich move on machen
        
*/
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

    // 

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
        childIndex = 0
        for (let i = 0; i <= seqIndex; i++) {
            sequenceLength = sequences[i].length;
            if (sequenceLength == 1) {
                childIndex++;
            } else {
                childIndex = childIndex + (sequenceLength - 1);
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
            console.log(level);
            console.log(seqIndex);
            if (level > 0 && sequenceSYFLevels > 0) {
                level = level - 1;
            } else if (level == 0 && seqIndex > 0) {
                console.log("here finally");
                level = level - 1;

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
            // unterschreiten
            if (base - Math.floor(window.scrollY) > 90) {
                seqIndex--;
                changeSequence();
                changeContextHeight();
                level = sequenceSYFLevels - 1;
                base = base - (height * (level + 1));
                console.log(base);
                scroll();
                startY = 100;
                nowY = 300;
            } else if (Math.floor(window.scrollY) - (base + height - window.innerHeight) > 90) {
                base = base + height;
                console.log(base);
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
                // wir dürfen nicht zurück sondern hier hin: 
                // base + height - window.innerHeight
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




    /* das sequence array gibt und die länge der SYF-Sequenzen, dann müssen auch noch
    alle anderen SY-Elemente gefunden und gespeichert werden 
    
    // levels bilden sich aus den verschiedenen Sequenzen:
    */



    // vergleiche die einzelenen Sequenzen
    if (false) {
        // restriction wird aufgehoben
        /* es wurden nun denn auch nur die SYF-children gemappt um diese zusammen
        auszugeben, aber eigentlich dürfen nur die SYF-children am Stück sein
        und nicht dessen Gesamtheit:
    
            - DELIMETER zwischen SY-Elemente setzen
            - space für SY-Elemente setzen / wählen
    
            - Logo: kreuz muss gebildet werden, jedoch dürfen die Elemente dazu 
              horizontal oder vertikal kommen, nicht ein Zusammenspiel
    
    
    
             */


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
