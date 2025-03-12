import NavBar from "./NavBar";
import { Container } from "@mui/material";

export const PageLayout = (props) => {

    return (
        <>
            <NavBar />
            <Container>
                {props.children}
            </Container>
        </>
    );
};
