// src/components/TermsAndConditions.jsx
import React from 'react';
import './TermsAndConditions.css';

const TermsAndConditions = () => {
    return (
        <div className="terms-container">
            <h1 className="terms-title">Terms and Conditions</h1>
            <p className="terms-text">
                Welcome to the nanny management and appointment service. By using our website and services, you agree to comply with and be bound by the following terms and conditions.
            </p>

            <h2 className="terms-subtitle">User Agreement</h2>
            <p className="terms-text">
                By accessing our website, you agree to use our services responsibly and abide by the terms. Any violation may result in restriction of your account or legal actions.
            </p>

            <h2 className="terms-subtitle">Booking Policy</h2>
            <p className="terms-text">
                When booking a nanny, ensure that all provided information is accurate. All appointments are subject to availability. Please review our cancellation and refund policies for more details.
            </p>

            <h2 className="terms-subtitle">User Conduct</h2>
            <p className="terms-text">
                Users must conduct themselves respectfully. Harassment, abusive language, or misconduct towards nannies or staff is prohibited.
            </p>

            <h2 className="terms-subtitle">Liability Disclaimer</h2>
            <p className="terms-text">
                We strive to provide reliable services but cannot be held liable for any direct, indirect, or consequential damages arising from the use of our services.
            </p>

            <h2 className="terms-subtitle">Modifications to Terms</h2>
            <p className="terms-text">
                We reserve the right to update these terms at any time. Continued use of our site and services constitutes acceptance of any modified terms.
            </p>

            <h2 className="terms-subtitle">Contact Information</h2>
            <p className="terms-text">
                For questions regarding our Terms and Conditions, please contact us at <a href="mailto:carringnannies@connect.com" className="terms-link">carringnannies@connect.com</a>.
            </p>
        </div>
    );
};

export default TermsAndConditions;
