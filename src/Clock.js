import React, { useState, useRef, useEffect } from "react";
import Tick from "@pqina/flip";
import "@pqina/flip/dist/flip.min.css";

const Clock = () => {
    const tickRef = useRef(null);
    const [tickInstance, setTickInstance] = useState(null);
    const isInitialMount = useRef(true); 

    useEffect(() => {

        if (isInitialMount.current) {
            console.log("isInitialMount.current")

            setTickInstance(Tick.DOM.create(tickRef.current, {
                value: 0
            }));
            
            console.log(tickInstance)
            
            isInitialMount.current = false
        }

    }, []);

    useEffect(() => {
        if (tickInstance) {
            console.log(tickInstance)
            Tick.helper.interval(function () {
                var d = Tick.helper.date();
                tickInstance.value = {
                    sep: " : ",
                    hours: d.getHours(),
                    minutes: d.getMinutes(),
                    seconds: d.getSeconds(),
                };
            });
        }
    }, [tickInstance]);

    return (
        <div className="preset-container-wrapper">
            <div className="preset-container">
                <div ref={tickRef} className="tick" data-did-init="handleTickInit">
                    <div data-layout="horizontal fit">
                        <span
                            data-key="hours"
                            data-transform="pad(00)"
                            data-view="flip"
                        ></span>

                        <span
                            data-view="text"
                            data-key="sep"
                            className="tick-text-inline"
                        ></span>

                        <span
                            data-key="minutes"
                            data-transform="pad(00)"
                            data-view="flip"
                        ></span>

                        <span
                            data-view="text"
                            data-key="sep"
                            className="tick-text-inline"
                        ></span>

                        <span
                            data-key="seconds"
                            data-transform="pad(00)"
                            data-view="flip"
                        ></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Clock;
