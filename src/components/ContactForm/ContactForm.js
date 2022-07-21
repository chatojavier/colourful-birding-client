import Button from 'components/Button';
import { TextArea, TextInput, PhoneInput } from 'components/FormInputs';
import Modal from 'components/Modal';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

const ContactForm = ({ className }) => {
  const [serverError, setServerError] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const { register, handleSubmit, formState, control, trigger } = useForm();

  const parseDataToNetlify = (data) =>
    Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');

  const onSubmit = (formData, event) => {
    fetch(`/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: parseDataToNetlify({ 'form-name': 'contact-us', ...formData }),
    })
      .then(() => {
        setServerError('');
      })
      .catch((error) => {
        setServerError(error.message);
      });
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`contact-form | space-y-6 p-4 ${className}`}
      name="contact-us"
      method="POST"
      action="contact/?success=true"
      data-netlify="true"
      netlify-honeypot="address"
    >
      <input type="hidden" name="form-name" value="contact-us" />
      <input type="hidden" name="formId" value="contact-us" ref={register()} />
      <TextInput
        id="name"
        label="Name"
        autocomplete="name"
        errorMessage={formState.errors.name?.message}
        {...register('name', {
          required: 'Name is required',
        })}
      />
      <div className="flex w-full flex-col space-y-6 md:flex-row md:space-y-0 md:space-x-4">
        <TextInput
          id="email"
          label="Email"
          type="email"
          autocomplete="email"
          errorMessage={formState.errors.email?.message}
          {...register('email', {
            required: 'Email is required',
          })}
        />
        <PhoneInput
          id="phone"
          label="Phone"
          name="phone"
          useFormMthods={{ control, trigger }}
          errorMessage={formState.errors.phone?.type}
          {...register('phone')}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          overflow: 'hidden',
          clip: 'rect(0 0 0 0)',
          height: '1px',
          width: '1px',
          margin: '-1px',
          padding: '0',
          border: '0',
        }}
      >
        <label htmlFor="address">
          {"Don’t fill this out if you're human:"}
          <input tabIndex="-1" name="address" ref={register()} />
        </label>
      </div>

      <TextArea
        id="message"
        label="Your Comments"
        errorMessage={formState.errors.message?.message}
        {...register('message', {
          required: 'Message is required',
        })}
      />

      <Button className="block shadow active:shadow-none" type="submit" disabled={formState.isSubmitting} color="green">
        {formState.isSubmitting ? 'Sending...' : 'Send'}
      </Button>

      {formState.isSubmitSuccessful && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="contact-form__success | p-8 text-center">
            <div className=" mb-4 font-bebas text-2xl md:text-3xl lg:text-4xl">Thank you for your message.</div>
            <div className="">We will get back to you as soon as possible.</div>
          </div>
        </Modal>
      )}

      {serverError && (
        <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
          <div className="contact-form__success | p-8 text-center">
            <div className=" mb-4 font-bebas text-2xl text-lightblue md:text-3xl lg:text-4xl">
              {"It couldn't be submited."}
            </div>
            <div className="">{serverError}</div>
          </div>
        </Modal>
      )}

      {formState.isValid && <div className="contact-form__error">{formState.errorMessage}</div>}
    </form>
  );
};

export default ContactForm;
