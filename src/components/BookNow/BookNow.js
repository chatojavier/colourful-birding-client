import Button from 'components/Button';
import DateFromTo from 'components/DateFromTo';
import { DividerV } from 'components/Divider';
import { Checkbox, TextArea, TextInput } from 'components/FormInputs';
import GroupTitle from 'components/GroupTitle';
import { formatCurrency, getTextColorByName } from 'lib/util';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

const BookNow = ({ price = 0, programedDates, color = 'lightblue', className = '' }) => {
  const { register, handleSubmit, formState, watch } = useForm();
  const onSubmit = (data, e) => console.log(data, e);
  const watchPeople = watch('people', 1);

  return (
    <form
      className={`book-now | flex flex-col p-8 md:flex-row md:space-x-8 ${className}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="col-left | flex shrink-0 flex-col justify-between md:w-4/12">
        <div className="block-top | space-y-8">
          {programedDates && (
            <div className="book-now__dates">
              <GroupTitle className={getTextColorByName(color)}>Dates</GroupTitle>
              <DateFromTo from={programedDates.from} to={programedDates.to} />
            </div>
          )}
          <div className="book-now__people">
            <GroupTitle className={getTextColorByName(color)}>People</GroupTitle>
            <TextInput
              id="people"
              type="number"
              min="1"
              color={color}
              errorMessage={formState.errors.people?.message}
              {...register('people', {
                required: 'A number is required',
                value: 1,
              })}
            />
          </div>
          <div className="book-now__price">
            <GroupTitle className={getTextColorByName(color)}>Price</GroupTitle>
            <div className="price | font-bold">
              <span className="currency">USD </span>
              <span className="number">{formatCurrency(price * Number(watchPeople))}</span>
            </div>
          </div>
        </div>
        <div className="block-bottom">
          <div className="book-now__accommodation | mt-8 text-xs uppercase">
            Accommodation details <span className={getTextColorByName(color)}>here</span>
          </div>
        </div>
      </div>
      <DividerV />
      <div className="col-right | w-full space-y-6">
        <div>
          <GroupTitle className={getTextColorByName(color)}>Fullname</GroupTitle>
          <TextInput
            id="fullname"
            errorMessage={formState.errors.fullname?.message}
            {...register('fullname', {
              required: 'Fullname is required',
            })}
            color={color}
          />
        </div>
        <div className="flex space-x-4">
          <div>
            <GroupTitle className={getTextColorByName(color)}>Email</GroupTitle>
            <TextInput
              id="email"
              type="email"
              errorMessage={formState.errors.email?.message}
              {...register('email', {
                required: 'Email is required',
              })}
              color={color}
            />
          </div>
          <div>
            <GroupTitle className={getTextColorByName(color)}>Phone</GroupTitle>
            <TextInput
              id="phone"
              type="tel"
              errorMessage={formState.errors.phone?.message}
              {...register('phone', {
                pattern: {
                  value: /^\d{3}-\d{3}-\d{4}$/,
                  message: 'Phone number must be in the format ###-###-####',
                },
              })}
              color={color}
            />
          </div>
        </div>
        <div>
          <GroupTitle className={getTextColorByName(color)}>Comments</GroupTitle>
          <TextArea
            id="message"
            errorMessage={formState.errors.message?.message}
            {...register('message', {
              required: 'Message is required',
            })}
            color={color}
          />
        </div>
        <div className="flex justify-between space-x-4">
          <Checkbox
            id="policies"
            errorMessage={formState.errors.policies?.message}
            label={
              <>
                I have read and accept
                <br />
                the{' '}
                <Link href="/privacy-policy">
                  <a className={getTextColorByName(color)}>privacy policies</a>
                </Link>
              </>
            }
            {...register('policies', {
              required: 'You should accept the privacy policies',
            })}
          />
          <div>
            <Button
              className="inline-block shadow active:shadow-none"
              type="submit"
              disabled={formState.isSubmitting}
              color={color}
              filled={true}
            >
              {formState.isSubmitting ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default BookNow;
