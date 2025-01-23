import React from "react";
import { Stack } from "@mui/material";
interface ISwipeXYHorizontal {
    children: any;
}

/* 
    hier haben wir es nicht so leicht wie bei der <SwipeXYElement> Komponente
    hier muss die x-Achse angespasst werden, die darf nicht so aussehen,
    falls diese unten anliegend ist, das es den User symbolisiert, das hier ein
    Ende bevorsteht,

        -> XAchse muss intuitiv so ausschauen, dass es zum horizontalem swipen einlädt
        und es soll auf keinen Fall als Ende des Y-Swipen erwähnt werden 

        -> Durch das Parent-Element: <SwipeXYControl> werden Befehle gegeben diese
        Komponente entscheidet nicht wann nach links oder rechts geswiped wird. Hier
        benötigen wir also passende Vererbungen, aber nicht mal das, diese Komponente 
        soll lediglich ermöglichen dass horizontal geswiped werden kann.
*/

const SwipeXYHorizontal: React.FunctionComponent<ISwipeXYHorizontal> = ({ children }) => {
    // hier schauen wir also was genau nach, wir passen lediglich alle children, dessen
    // höhe immer die Höhe haben müssen wir das höchste Element!

    return (
        <Stack direction={"row"} sx={{
            position: "relative",
            minHeight: "100vh",
            width: "auto",
            height: "100%",

        }}>
            {children}
        </Stack>
    );
}
export default SwipeXYHorizontal;