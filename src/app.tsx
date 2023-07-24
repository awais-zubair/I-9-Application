import "./styles/app.css";
import Main from "./views/main";
import {BrowserRouter} from "react-router-dom";
import AppContext from "./contexts/app-context";
import {ContextModel} from "./contexts/context-model";

export default function App(): JSX.Element {

    return (
        <AppContext.Provider value={new ContextModel()}>
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        </AppContext.Provider>
    );

}
