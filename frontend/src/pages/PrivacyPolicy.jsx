// PrivacyPolicy.jsx
import React from 'react';
import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
    return (
        <div className="privacy-policy-container">
            <h1 className="privacy-policy-title">Privacy Policy</h1>
            <p className="privacy-policy-text">
                At Caring Nannies, we value your privacy and are dedicated to protecting your personal information. This privacy policy explains how we collect, use, and safeguard your information when you use our nanny management and appointment services.
            </p>
            <h2 className="privacy-policy-heading">Information We Collect</h2>
            <p className="privacy-policy-text">
                We may collect personal information from you when you visit our website, create an account, or schedule an appointment. This information may include:
            </p>
            <ul className="privacy-policy-list">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Address</li>
                <li>Appointment Details</li>
            </ul>
            <h2 className="privacy-policy-heading">How We Use Your Information</h2>
            <p className="privacy-policy-text">
                We use the information we collect to:
            </p>
            <ul className="privacy-policy-list">
                <li>Provide and manage our nanny services</li>
                <li>Facilitate appointment scheduling and management</li>
                <li>Communicate with you about your appointments and inquiries</li>
                <li>Improve our services based on user feedback</li>
            </ul>
            <h2 className="privacy-policy-heading">Data Protection</h2>
            <p className="privacy-policy-text">
                We take appropriate measures to protect your personal information. However, please note that no method of transmission over the internet or electronic storage is entirely secure.
            </p>
            <h2 className="privacy-policy-heading">Your Rights</h2>
            <p className="privacy-policy-text">
                You have the right to access, update, or delete your personal information. If you wish to exercise these rights, please contact us at the email provided below.
            </p>
            <h2 className="privacy-policy-heading">Contact Us</h2>
            <p className="privacy-policy-text">
                If you have any questions about this privacy policy, please contact us at:
            </p>
            <p className="privacy-policy-text">
                Email: <a href="mailto:carringnannies@connect.com" className="privacy-policy-link">carringnannies@connect.com</a>
            </p>
        </div>
    );
};

export default PrivacyPolicy;
