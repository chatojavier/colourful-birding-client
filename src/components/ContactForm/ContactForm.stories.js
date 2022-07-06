import ContactForm from './ContactForm';

export default {
  title: 'components/Contact Form',
  component: ContactForm,
};

const Template = (args) => <ContactForm {...args} />;

export const Default = Template.bind({});

// export const Default = () => <ContactForm />;
// export const WithError = () => <ContactForm isError />;
// export const WithSubmitted = () => <ContactForm isSubmitted />;
// export const WithSubmitting = () => <ContactForm isSubmitting />;
// export const WithErrorAndSubmitting = () => <ContactForm isError isSubmitting />;
// export const WithErrorAndSubmitted = () => <ContactForm isError isSubmitted />;
