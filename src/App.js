import React, {useState} from "react";
import About from "./sections/About";
import {BrowserRouter} from "react-router-dom";
import {Route} from "react-router";
import Main from "./sections/Main";
import Header from "./components/Header";
import './scss/index.scss'
import Settings from "./sections/Settings";
import Treatment from "./sections/Treatment";
import Results from "./sections/Results";


const App = () => {

    const [filesStore, setFilesStore] = useState([]);
    const [settings,setSettings] = useState({
        compSize: 7,
        showKeyWords: true,
        keyWordsCounter: 10,
        checkingOnComp: true,
        showWordsCounter: false,
        showSignCounter: false,
    });
    const [percent, setPercent] = useState(20);
    const [keyWords, setKeyWords] = useState([
        ['lorem','ipsum','dolor','sit','amet'],
        ['consectetur', 'adipiscing', 'elit', 'suspendisse', 'quis']
    ]);

    return (
        <>
            <BrowserRouter>
                <Header />
                <div className="app">
                    <Route exact path={'/'}>
                        <About />
                    </Route>
                    <Route exact path={'/main'}>
                        <Main setFilesStore={setFilesStore} />
                    </Route>
                    <Route exact path={'/settings'}>
                        <Settings setSettings={setSettings} />
                    </Route>
                    <Route exact path={'/treatment'}>
                        <Treatment files={filesStore} settings={settings} />
                    </Route>
                    <Route exact path={'/results'}>
                        <Results keyWords={keyWords} percent={percent} files={filesStore} settings={settings} />
                    </Route>
                </div>
            </BrowserRouter>
        </>
);
}

export default App;
