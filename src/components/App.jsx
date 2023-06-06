import React, { Component } from 'react';
import s from './Feedback/App.module.css';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0
  };

  handleFeedback = option => {
    this.setState(prevState => ({
      [option]: prevState[option] + 1
    }));
  };

  countTotalFeedback = () => {
    const { good, neutral, bad } = this.state;
    return good + neutral + bad;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    const total = this.countTotalFeedback();
    return total === 0 ? 0 : Math.round((good / total) * 100);
  };

  render() {
    const { good, neutral, bad } = this.state;
    const totalFeedback = this.countTotalFeedback();
    const positivePercentage = this.countPositiveFeedbackPercentage();

    return (
      <div>
        <Section  title="Please leave your feedback">
          <FeedbackOptions
            options={['good', 'neutral', 'bad']}
            onLeaveFeedback={this.handleFeedback}
          />
        </Section>

        <Section title="Statistics">
          {totalFeedback === 0 ? (<Notification message="There is no feedback" />) :
            (<Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={positivePercentage}
            />)}
        </Section>
      </div>
    );
  }
}

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