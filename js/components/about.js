import React from 'react';
import i18next from 'i18next';

module.exports = React.createClass({

  componentDidMount: function componentDidMount() {
    document.title = `${i18next.t('about')} | ${i18next.t('freqAsia')}`;
  },

  render: function render() {
    return (
      <div className="o-content-block">
        <section className="c-content">
          <div className="row">
            <div className="col">
              <h1>FREQUENCY ASIA. NO PREJUDICE.</h1>
              <p>Frequency Asia is a podcast, label and radio frequency. We’re a platform-community focused on artists sculpting sound in the largest, most populous continent in the world.</p>
              <p>We love to connect musical dots, but we thrive on contributions too. We want to get closer to the music in your head – your influences, first loves and lifesavers – we want to help you share the knowledge and passion you have for the music in Asia.</p>
              <p>Frequency Asia’s main goal is to showcase emerging music across the continent, but also provide a context for its evolution. Expect the unexpected with us past, present, and future.</p>
              <p>From Indonesian tropical punk, to the great walls of Beijing’s future bass clubs, grabbing some Japan blues along the way and stretching over to Iran for some Farsi funk and Bosphorus beats from Turkey.</p>
              <p>We are 100% funded by our content creators, who are mostly local experts and scene makers themselves, meaning you get an honest opinion on what we and they believe is the best music flowing out of Asia today.</p>
              <br />
              <h2>CONTRIBUTE:</h2>
              <p>We're always looking for new people to collaborate with. Have an idea for a show or just want to guest host an episode? Send us an email at <a href="mailto:contact@frequency.asia?Subject=Contribute" target="_top">contact@frequency.asia</a>.</p>
              <br />
              <h2>WE ARE:</h2>
              <p>Luke Hansford</p>
              <p>Jonny Brown</p>
              <br />
              <h2>MUCH LOVE TO:</h2>
              <p><a target="_blank" href="http://haikalaziz.com/">Haikal Aziz</a> - Website and logo design</p>
              <p><a target="_blank" href="https://www.instagram.com/isvbelleee/">Isabelle Ee</a> - Show illustrations</p>
            </div>
          </div>
        </section>
      </div>
    );
  },
});
