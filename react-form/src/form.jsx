import { useState } from "react";
import "./form.css"

const Form = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneType, setphoneType] = useState("");
  const [bio, setBio] = useState("");
  const [staff, setStaff] = useState("")
  const [emailNotification, setEmailNotification] = useState("")

  const [errorMessages, setErrorMessages] = useState([]);

  const validate = () => {
    const specialChars = ["!", "@", "#", "$", "%", "."];
    let errors = [];
    if (name.length === 0) {
      const nameElement = document.querySelector("#name")
      nameElement.className = "notValidated"
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

    if (!parseInt(phoneNumber) && phoneNumber.length > 0) {
      errors.push("Incorrect format")
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
        case "phoneNumber":
          setPhoneNumber(e.target.value);
          break;
        case "bio":
          setBio(e.target.value);
          break;
        case "phoneType": 
          setphoneType(e.target.value)
          break;
        case "staff":
          setStaff(e.target.value);
          break;
        case "emailNotification":
          setEmailNotification(e.target.checked);
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
        phoneNumber,
        phoneType,
        bio,
        staff,
        emailNotification,
        "date": new Date()
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
          id="name"
          type="text"
          placeholder="name"
          value={name}
          onChange={handleChange("name")}
        />
        <br />
        <input
          id="email"
          type="text"
          placeholder="example@mail.com"
          value={email}
          onChange={handleChange("email")}
        />
        <br />
        <input
          id="phoneNumber"
          type="text"
          placeholder="XXX-XXX-XXXX(ONLY AMERICAN!!!)"
          value={phoneNumber}
          onChange={handleChange("phoneNumber")}
        />
        <br />

        <select name="phoneType" 
        id="phoneType"
        onChange={handleChange("phoneType")}
        required disabled={phoneNumber === ""}>
          <option></option>
          <option value="Home">Home</option>
          <option value="Work">Work</option>
          <option value="Mobile">Mobile</option>
        </select>
        <br />
        <textarea
          //   type="textarea"
          placeholder="bio"
          value={bio}
          onChange={handleChange("bio")}
        />
        <br />
        <input type="radio" name="staff" id="student" value="student" onChange={handleChange("staff")} required/>
        <label htmlFor="student">Student</label>
        <input type="radio" name="staff" id="Instructor" value="Instructor" onChange={handleChange("staff")} required/>
        <label htmlFor="Instructor">Instructor</label>
        <br />
        <input type="checkbox" onChange ={handleChange("emailNotification")} />
        Sign up for email notifications?
        <button>submit</button>
      </form>
      {/* let nameId = document.getElementById("name") */}
    </>
  );
};

export default Form;
