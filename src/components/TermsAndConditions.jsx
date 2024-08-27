import React from "react";

const TermsAndConditions = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to SplitApp. By signing up and using our services, you agree to
        be bound by the following terms and conditions. Please read them
        carefully.
      </p>

      <h2 className="text-2xl font-semibold mb-2">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By creating an account, you agree to abide by these terms and conditions
        as well as any other policies and guidelines provided by SplitApp. If
        you do not agree to these terms, please do not sign up or use our
        services.
      </p>

      <h2 className="text-2xl font-semibold mb-2">2. User Responsibilities</h2>
      <p className="mb-4">
        You are responsible for maintaining the confidentiality of your account
        information and for all activities that occur under your account. You
        agree to notify us immediately of any unauthorized use of your account
        or any other breach of security.
      </p>

      <h2 className="text-2xl font-semibold mb-2">3. Privacy</h2>
      <p className="mb-4">
        Your privacy is important to us. Please review our{" "}
        <span className="text-blue-500 cursor-pointer hover:underline">
          Privacy Policy
        </span>{" "}
        to understand how we collect, use, and share information about you.
      </p>

      <h2 className="text-2xl font-semibold mb-2">4. Prohibited Activities</h2>
      <p className="mb-4">
        You agree not to use our services for any unlawful purpose or in
        violation of any applicable laws. You also agree not to engage in any
        activity that interferes with or disrupts our services.
      </p>

      <h2 className="text-2xl font-semibold mb-2">5. Termination</h2>
      <p className="mb-4">
        We reserve the right to terminate your account or restrict your access
        to our services at any time, without notice, for any reason, including
        if we believe you have violated these terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
      <p className="mb-4">
        We may update these terms and conditions from time to time. We will
        notify you of any changes by posting the new terms on our website. Your
        continued use of our services after any changes indicates your
        acceptance of the new terms.
      </p>

      <p className="mb-4">
        If you have any questions about these terms, please contact us at{" "}
        <a
          href="mailto:support@splitapp.com"
          className="text-blue-500 hover:underline"
        >
          support@splitapp.com
        </a>
        .
      </p>

      <p className="text-gray-600">Last updated: [Date]</p>
    </div>
  );
};

export default TermsAndConditions;
