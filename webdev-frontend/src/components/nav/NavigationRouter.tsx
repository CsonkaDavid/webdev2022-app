import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AccountPage from "../page/account/AccountPage";
import MainPage from "../page/main/MainPage";

function NavigationRouter(props: any) {
    return (
        <Router>
            <Routes>
                <Route path="/main" element={<MainPage />} />
                <Route path="*" element={<MainPage />} />
                <Route path="/account" element={<AccountPage />} />
            </Routes>
            <>{props.children}</>
        </Router>
    );
}

export default NavigationRouter