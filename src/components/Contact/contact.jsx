import { useState } from "react";
import "./contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all the fields.");
      return;
    }

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  return (
    <section className="contact" id="contact">
      <div className="contact-heading">
        <p>GET IN TOUCH</p>

        <h2>Contact Gamverse</h2>

        <span>
          Have a question or want to share your gaming experience?
          Send us a message.
        </span>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <h3>Let's Connect</h3>

          <p>
            We'd love to hear from you. Reach out to us and become part of
            the Gamverse community.
          </p>

          <div className="contact-item">
            <span>📧</span>
            <div>
              <strong>Email</strong>
              <p>hello@gamverse.com</p>
            </div>
          </div>

          <div className="contact-item">
            <span>🎮</span>
            <div>
              <strong>Community</strong>
              <p>Join our gaming community</p>
            </div>
          </div>

          <div className="contact-item">
            <span>🌐</span>
            <div>
              <strong>Available</strong>
              <p>24/7 Online</p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />

          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            rows="5"
          ></textarea>

          <button type="submit">Send Message</button>

          {submitted && (
            <p className="success-message">
              Message sent successfully! 🎮
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;