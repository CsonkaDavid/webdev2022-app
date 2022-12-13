import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "../MainPage";

function NavigationRouter(props: any) {
    return (
        <Router>
            <Routes>
                <Route path="/main" element={<MainPage />} />
                <Route path="*" element={<MainPage />} />
            </Routes>
            <>{props.children}</>
        </Router>
    );
}

export default NavigationRouter