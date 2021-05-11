import React, {useEffect, useState} from "react";
import About from "./sections/About";
import {Route, useLocation} from "react-router";
import Main from "./sections/Main";
import Header from "./components/Header";
import './scss/index.scss'
import Settings from "./sections/Settings";
import Treatment from "./sections/Treatment";
import Results from "./sections/Results";
import NavigationDesk from "./components/NavigationDesk";


const App = () => {

    const location  = useLocation();

    useEffect(() => {
        !localStorage.getItem('history') && localStorage.setItem('history',JSON.stringify([]));
    });

    const [filesStore, setFilesStore] = useState([]);
    const [newTexts, setNewTexts] = useState(['','']);
    const [settings,setSettings] = useState({
        compSize: 7,
        showKeyWords: true,
        keyWordsCounter: 10,
        checkingOnComp: true,
        showWordsCounter: false,
        showSignCounter: false,
    });
    const [percent, setPercent] = useState(-1);
    const [keyWords, setKeyWords] = useState([
        ['lorem','ipsum','dolor','sit','amet'],
        ['consectetur', 'adipiscing', 'elit', 'suspendisse', 'quis']
    ]);

    return (
        <>
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
                    <Treatment setNewTexts={setNewTexts} setPercent={setPercent} setKeyWords={setKeyWords} files={filesStore} settings={settings} />
                </Route>
                <Route exact path={'/results'}>
                    <Results newTexts={newTexts} keyWords={keyWords} percent={percent} files={filesStore} settings={settings} />
                </Route>
                {location.pathname !== '/' && <NavigationDesk />}
            </div>
        </>
    );
};

export default App;
