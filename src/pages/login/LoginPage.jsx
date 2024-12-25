import { useState } from "react";
import useLogin from "./useLogin";
import { authLogin } from "../../redux/auth/loginReducers";
import { useDispatch } from "react-redux";

const LoginPage = () => {
    useLogin();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('masok handle submit');
        console.log(email);
        console.log(password);

        dispatch(authLogin({ email, password }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
            />
            <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginPage;
