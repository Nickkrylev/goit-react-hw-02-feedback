import { Component } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions.jsx';
import { Statistics } from './Statistics/Statistics.jsx';
import { Section } from './Section/Section.jsx';
import { Notification } from './Notification/Notification';
import { Div } from './App.styled'; 

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  onFeedBackBtnClick = feedback => {
    this.setState(prevState => ({
      [feedback]: prevState[feedback] + 1,
    })
    )
  };

  countTotalFeedback = () => {
    return Object.values(this.state).reduce((acc, currentVal) => acc + currentVal, 0)
  }

  countPositiveFeedbackPercentage = () => {
    const percentage= Math.round((this.state.good / this.countTotalFeedback()) * 100);
    return `${percentage}%`;
  }

  render() {
    const { good, neutral, bad } = this.state;
    const total = this.countTotalFeedback();
    const options = Object.keys(this.state);
    return (
      <Div>
        <Section title='Please leave feedback'>
          <FeedbackOptions options={options} onLeaveFeedback={this.onFeedBackBtnClick} />
        </Section>
      
        <Section title='Statistics'>
          {total > 0 ? <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={this.countPositiveFeedbackPercentage()}/> : <Notification message="There is no feedback"></Notification>}
        </Section>
      </Div>
    );
  }
}
