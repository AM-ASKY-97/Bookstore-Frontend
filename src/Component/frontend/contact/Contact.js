import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import contact from './contact.svg';
import './Contact.css';

const Contact = () => {
    const form = useRef();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        const firstName = form.current['first_name'].value;
        const lastName = form.current['last_name'].value;
        const email = form.current['email'].value;
        const phone = form.current['phone'].value;
        const message = form.current['message'].value;

        // Check if any field is empty
        if (!firstName || !lastName || !email || !phone || !message) {
            // Display error message
            setShowErrorMessage(true);
            setTimeout(() => setShowErrorMessage(false), 5000); // Hide after 5 seconds
            setShowSuccessMessage(false); // Ensure success message is hidden
            return; // Don't proceed with form submission
        }

        // If all fields are filled, proceed to send the email
        emailjs
            .sendForm(
                'service_c16lan2', // Replace with your actual service ID
                'template_4yrwfbg', // Replace with your actual template ID
                form.current,
                'bgokIXONWiwjMN0Kk' // Replace with your actual user ID
            )
            .then(
                (result) => {
                    console.log(result.text);
                    console.log('message sent');
                    setShowSuccessMessage(true); // Show success message
                    setTimeout(() => setShowSuccessMessage(false), 5000); // Hide after 5 seconds
                    setShowErrorMessage(false); // Ensure error message is hidden on success
                },
                (error) => {
                    console.log(error.text);
                    // Handle error here if needed
                }
            );

        // Clear form fields after successful submission (optional)
        form.current.reset();
    };

    return (
        <section className="contact container" id="Contact" data-aos-duration="2000">
            <h1 className="heading" data-aos="zoom-in-down">
                contact <span> now </span>{' '}
            </h1>

            <div className="row">
                <div className="col-12 col-lg-6">
                    <img className="img-fluid contact-image" src={contact} alt="" />
                </div>

                <div className="col-12 col-lg-6 mb-5">
                    <form ref={form} onSubmit={handleSubmit} data-aos="zoom-in-down">
                        <div className="inputBox">
                            <input type="text" placeholder="First Name" name="first_name" />
                            <input type="text" placeholder="Last Name" name="last_name" />
                        </div>

                        <div className="inputBox">
                            <input type="email" placeholder="Email Address" name="email" />
                            <input type="number" placeholder="Phone" name="phone" />
                        </div>

                        <textarea placeholder="Message" name="message" cols="30" rows="10"></textarea>
                        <a href='#' className="btn contact-btn">Order Now</a>

                        {showSuccessMessage && <p className="success-message">Message sent Successfully!</p>}
                        {showErrorMessage && <p className="error-message">Please fill in all fields before submitting.</p>}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
