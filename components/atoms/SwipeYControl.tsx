import React, { useEffect, useRef, useState } from "react";
/*
    ok im letzten reiter finden wir den Blog dort werden wir dann, dann horizontalen
    Slide einbauen, dort wird dann y-gescrollt und der slider geht nach rechts weiter



*/
interface ISwipeYControl {
    levels: number;
}
const SwipeYControl: React.FunctionComponent<ISwipeYControl> = ({ levels }) => {
    const elem = useRef<HTMLDivElement>(null);
    useEffect(() => {
        document.addEventListener("wheel", handleScrolling);
        document.addEventListener("scrollend", handleEndScroll);
    }, []);

    let timeoutId: any;
    let running = false;
    let level = 0;
    const scroll = () => {
        console.log(level);
        document.body.classList.add("no-scroll");
        window.scrollTo(0, elem.current?.clientHeight * level);
    }

    let startY = 0;
    let nowY = 0;
    const jump = () => {
        if (nowY - startY > 0) {
            level = (level < levels ? level + 1 : level);
        } else {
            level = (level > 0 ? level - 1 : level);
        }
        scroll();
    }

    const handleScrolling = (e: any) => {
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
    let diff;
    const handleEndScroll = (e: any) => {
        diff = Math.abs(elem.current?.clientHeight * level - window.scrollY);

        if (diff < 5 && diff > -5) {
            document.body.classList.remove("no-scroll");
            startY = 0;
            nowY = 0;
        } else if (Math.abs(nowY - startY) < 90) {
            scroll();
        }
    }


    return (
        <div
            ref={elem}
            style={{
                height: "100vh",
                overflowY: "auto",
                scrollSnapType: "y mandatory",
                position: "relative",
            }}
        >

        </div>
    );
};

export default SwipeYControl;
