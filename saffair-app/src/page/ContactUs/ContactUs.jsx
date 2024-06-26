import React, { useState } from "react";
import { Button, Spinner, TextInput, Textarea } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../../redux/user/userSlice";
import emailjs from "@emailjs/browser";
import "./contactus.css";

const ContactUs = () => {
  const [msg, setmsg] = useState("");
  const [formData, setFormData] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const dispatch = useDispatch();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [uname, setName] = useState("");
  const [uemail, setEmail] = useState("");
  const [unumber, setNumber] = useState("");
  const [umessage, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // add the below details from emailjs
    const serviceID = "";
    const templateID = "";
    const publicKey = "";

    const templateParams = {
      from_name: uname,
      email: uemail,
      to_name: "Team Saffair",
      message: umessage,
    };
    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully", response);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("error sending email:", error);
      });
  };

  return (
    <div className="contact-us-container">
      <div className="title">Do you have any questions?</div>
      <div className="description">
        For inquiries, contact us via phone, email or our website's contact form
        given below. Our Saffair team is here to help you effectively.
      </div>
      <div className="contact-section">
        <div className="contact-info">
          <div className="contact-info-item">
            <p className="contact-label">Contact Us</p>
            <p className="contact-text">
              We are here to help you, whatever kind of help you need
            </p>
            <p className="contact-email">inquiry@saffair.in</p>
          </div>
          <div className="contact-info-item">
            <div className="horizontal-line"></div>
            <p className="contact-label">ADDRESS</p>
            <p className="contact-text">
              We are here to help you, whatever kind of help you need
            </p>
            <p className="contact-email">inquiry@saffair.in</p>
          </div>
        </div>
        <div className="contact-form">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="label">
                Your Name<span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={uname}
                placeholder="Name"
                className="input"
                maxLength={200}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="label">
                Your Email<span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={uemail}
                placeholder="Email"
                className="input"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Contact no." className="label">
                Your Contact no.<span className="required">*</span>
              </label>
              <input
                type="number"
                id="contactno"
                value={unumber}
                placeholder="Number"
                className="input"
                required
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="msg" className="label">
                Message<span className="required">*</span>
              </label>
              <br />
              <textarea
                rows="4"
                cols="40"
                id="msg"
                className="textarea"
                required
                value={umessage}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button
              gradientDuoTone="cyanToBlue"
              outline
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="loading-text">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>
      {showSuccessMessage && (
        <p className="success-message">
          Thank you for reaching out to us. We will get back to you as soon as
          possible.
        </p>
      )}
    </div>
  );
};

export default ContactUs;
