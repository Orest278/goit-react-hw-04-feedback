import React, { useState } from 'react';
import s from './Feedback/App.module.css';

export const App = () => {
  const [feedback, setFeedback] = useState({ good: 0, neutral: 0, bad: 0 });

  const handleFeedback = (option) => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [option]: prevFeedback[option] + 1
    }));
  };

  const countTotalFeedback = () => {
    const { good, neutral, bad } = feedback;
    return good + neutral + bad;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    const total = countTotalFeedback();
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  const totalFeedback = countTotalFeedback();
  const positivePercentage = countPositiveFeedbackPercentage();
  // render() {
  //   const { good, neutral, bad } = this.state;
  //   const totalFeedback = this.countTotalFeedback();
  //   const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <div>
        <Section  title="Please leave your feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={handleFeedback}
          />
        </Section>

        <Section title="Statistics">
          {totalFeedback === 0 ? (<Notification message="There is no feedback" />) :
            (<Statistics
              good={feedback.good}
              neutral={feedback.neutral}
              bad={feedback.bad}
              total={totalFeedback}
              positivePercentage={positivePercentage}
            />)}
        </Section>
      </div>
    );
  }
// }

const Section = ({ title, children }) => (
  <div className={s.section}>
    <h2>{title}</h2>
    {children}
  </div>
);

const FeedbackOptions = ({ options, onLeaveFeedback }) => (
  <div className={s.btnFeedback}>
    {options.map(option => (
      <button className={s.btn} key={option} onClick={() => onLeaveFeedback(option)}>
        {option}
      </button>
    ))}
  </div>
);

const Statistics = ({ good, neutral, bad, total, positivePercentage }) => (
  <div>
    <p>Good: {good}</p>
    <p>Neutral: {neutral}</p>
    <p>Bad: {bad}</p>
    <p>Total: {total}</p>
    <p>Positive feedback: {positivePercentage}%</p>
  </div>
);

const Notification = ({ message }) => <p>{message}</p>


export default App;