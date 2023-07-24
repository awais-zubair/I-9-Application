import { useEffect, useState } from "react";
import { SpinnerProps } from "../props/spinner-props";
import "../styles/spinner.css";

export default function Spinner(props: SpinnerProps): JSX.Element {
    const [loading, setloading] = useState("spinner-visible");

    useEffect(() => {
        setloading(props.loading ? "spinner-visible" : "spinner-invisible");
    }, [props.loading]);
      
    return (
        <div className={loading}>
            <div className="spinner" ></div>
        </div>
    );
}