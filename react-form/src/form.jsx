import { useState } from "react";

const Form = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bio, setBio] = useState("");

  const [errorMessages, setErrorMessages] = useState([]);

  const validate = () => {
    const specialChars = ["!", "@", "#", "$", "%", "."];
    let errors = [];
    if (name.length === 0) {
      errors.push("name can't be empty");
    }
    if (bio.length > 280) {
      errors.push("bio cant exceed 280 chars");
    }
    let splitAt = email.split("@");

    if (splitAt.length !== 2) {
      errors.push("incorrect email format");
    } else {
      let dotAt = splitAt[1].split(".");
      if (dotAt.length !== 2 && splitAt[0].includes(specialChars)) {
        errors.push("incorrect email format");
      }
    }

    return errors;
  };

  const handleChange = (field) => {
    return (e) => {
      switch (field) {
        case "name":
          setName(e.target.value);
          break;
        case "email":
          setEmail(e.target.value);
          break;
        // case "phoneNumber":
        //   setPhoneNumber(e.target.value);
        //   break;
        case "bio":
          setBio(e.target.value);
          break;

        default:
          break;
      }
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = validate();
    if (errors.length > 0) {
      setErrorMessages(errors);
    } else {
      let user = {
        name,
        email,
        bio,
      };
      console.log(user);
    }
  };
  const showError = () => {
    if (errorMessages.length === 0) {
      return null;
    } else {
      return (
        <ul>
          {errorMessages.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      );
    }
  };

  return (
    <>
      {showError()}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={handleChange("name")}
        />
        <input
          type="text"
          placeholder="example@mail.com"
          value={email}
          onChange={handleChange("email")}
        />
        <textarea
          //   type="textarea"
          placeholder="bio"
          value={bio}
          onChange={handleChange("bio")}
        />

        <button>submit</button>
      </form>
    </>
  );
};

export default Form;
