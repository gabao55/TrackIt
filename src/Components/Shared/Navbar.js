import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { NavWrapper } from "./styles";

export default function Navbar() {
    const { userData } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <NavWrapper>
            <h1 onClick={() => navigate("/hoje")}>TrackIt</h1>
            <img src={userData.image} alt="Sponge bob" />
        </NavWrapper>
    )
}