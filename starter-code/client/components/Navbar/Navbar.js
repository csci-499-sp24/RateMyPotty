import React from 'react';
import { MenuItems } from "./MenuItems";
// components/Navbar/Navbar.js
//import styles from './Navbar.module.css';
// ...rest of your code
import styles from './Navbar.module.css';
import { Button } from "./Button";


class Navbar extends React.Component {
    state = { clicked: false }
    handleClick = () => {
        this.setState({ clicked: !this.state.clicked })
    }

    render() {
        return (
            <nav className={styles.NavbarItems}>
                <h1 className={styles.navbarLogo}>RateMyPotty <i className="fas fa-toilet"></i></h1>
                <div className={styles.menuIcon} onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? styles.navMenuActive : styles.navMenu}>
                    {MenuItems.map((item, index) => {
                        return (
                            <li key={index}>
                                <a className={styles[item.cName]} href={item.url}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })}
                </ul> 
                <Button>Sign Up</Button>
            </nav>
        )
  }
}
export default Navbar