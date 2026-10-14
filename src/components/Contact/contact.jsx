import { useState } from "react";
import emailjs from "@emailjs/browser";
import "./contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (isSending) return;

    const { name, email, message } = formData;

    if (
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      setStatus("Please fill in all the fields.");
      return;
    }

    setIsSending(true);
    setStatus("");

    try {
      const result = await emailjs.send(
        "service_plom62y",
        "template_8m3zntw",
        {
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
        },
        {
          publicKey: "Egsb4ePyhKl-1VHoX",
        }
      );

      if (result.status === 200) {
        setStatus("Message sent successfully! 🎮");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatus(
          "Unable to send your message. Please try again."
        );
      }
    } catch (error) {
      console.error("Email sending failed:", error);

      setStatus(
        "Something went wrong. Please try again later."
      );
    } finally {
      setIsSending(false);
    }
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
            We'd love to hear from you. Reach out to us and become
            part of the Gamverse community.
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

        <form
          className="contact-form"
          onSubmit={handleSubmit}
        >
          <label htmlFor="name">Name</label>

          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            autoComplete="name"
            maxLength={100}
            required
          />

          <label htmlFor="email">Email</label>

          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            autoComplete="email"
            maxLength={254}
            required
          />

          <label htmlFor="message">Message</label>

          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message..."
            rows="5"
            maxLength={5000}
            required
          />

          <button type="submit" disabled={isSending}>
            {isSending ? "Sending..." : "Send Message"}
          </button>

          {status && (
            <p
              className="success-message"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Contact;