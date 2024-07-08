import { styled } from "@mui/material"

/* eslint-disable react/prop-types */
const Wrapper = ({children, style}) => {
    const Component = styled('div')({
        ...style
    });

    return (
        <Component>{children}</Component>
    )
}

export default Wrapper