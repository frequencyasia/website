import React from 'react';
import { Link } from 'react-router-component';

module.exports = React.createClass({
  render: function render() {
    return (
      <nav className="c-nav" role="navigation">
        <Link href="/" className="js-now-playing-link"><div className="c-nav__item js-nav-item js-now-playing-text">home</div></Link>
        <Link href="/shows"><div className="c-nav__item js-nav-item">shows</div></Link>
        <Link href="/schedule"><div className="c-nav__item js-nav-item">schedule</div></Link>
        <Link href="/wiki"><div className="c-nav__item js-nav-item">wiki</div></Link>
        <Link href="/projects"><div className="c-nav__item js-nav-item">projects</div></Link>
        <Link href="/about"><div className="c-nav__item js-nav-item">about</div></Link>
      </nav>
    );
  },
});
