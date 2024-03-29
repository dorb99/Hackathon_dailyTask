import { useContext, useState } from "react";
import { UserContext } from "../../components/userContext";

function SigninPage() {
  const [newUser, setNewUser] = useState({
    username: "",
    fullName: "",
    passkey: "",
    role: "",
  });
  const { createUserAction } = useContext(UserContext);

  const handleSignin = (e) => {
    e.preventDefault();
    if (newUser?.passkey === "newstudent") {
      const addRole = newUser;
      addRole.role = "student";
      setNewUser(addRole);
    } else if (newUser?.passkey === "teacher#19") {
      const addRole = newUser;
      addRole.role = "teacher";
      setNewUser(addRole);
    } else return console.log("error, incorrect passkey");
    createUserAction(newUser);
  };

  return (
    <div className="page">
      <div className="login_Container">
        <h2 className="header">Hi!</h2>
        <p className="smallP">Please fill the following form</p>
        <form onSubmit={handleSignin}>
          <input
            type="text"
            required
            className="smallInput"
            placeholder="username..."
            onChange={(e) => {
              e.preventDefault();
              const addInput = newUser;
              addInput.username = e.target.value;
              setNewUser(addInput);
            }}
          />
          <input
            type="text"
            required
            className="smallInput"
            placeholder="full Name..."
            onChange={(e) => {
              e.preventDefault();
              const addInput = newUser;
              addInput.fullName = e.target.value;
              setNewUser(addInput);
            }}
          />
          <input
            type="text"
            required
            className="smallInput"
            placeholder="passkey..."
            onChange={(e) => {
              e.preventDefault();
              const addInput = newUser;
              addInput.passkey = e.target.value;
              setNewUser(addInput);
            }}
          />

          <button type="submit" className="submitBtn">
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default SigninPage;
